/**
 * A simple auto migration script inspired by Ruby on Rails.
 * Note that this can't run a specific migration nor rollback migrations.
 */

const co = require('co');
const fs = require('fs');
const path = require('path');
const {
  createDBClient,
  selectCurrentSchemaVersion
} = require('./_helper');

const db = createDBClient();

const MIGRATION_DIR = path.resolve(
  __dirname, '../../db/migrations'
);

function* migrate() {
  try {
    yield db.connect();

    if (yield isFirstMigration()) {
      yield createSchemaVersionTable();
      console.log('Created schema_migrations table.');
    }

    const currentVersion = yield selectCurrentSchemaVersion(db);
    if (Number.isNaN(currentVersion)) {
      console.error('Invalid schema version: ', currentVersion);
      return;
    }

    const newMigrations = yield selectPendingMigrations(
      currentVersion, MIGRATION_DIR
    );

    for (const { version, fileName, filePath } of newMigrations) {
      const sql = fs.readFileSync(filePath).toString();
      yield db.query(sql);
      yield insertMigrationVersion(version);
      console.log('Applied migration of', fileName);
    }
  }
  catch (err) {
    console.error(err);
  }
  finally {
    db.end();
  }
}

function isFirstMigration() {
  return co(function* () {
    const { rows } = yield db.query(`
      SELECT
        table_name
      FROM
        information_schema.columns
      WHERE
        table_schema = 'public'
    `);
    return rows.length === 0;
  });
}

function createSchemaVersionTable() {
  return co(function* () {
    yield db.query(`
      CREATE TABLE schema_migrations (
        version varchar(12) NOT NULL
      )
    `);
    yield insertMigrationVersion(0);
  });
}

function insertMigrationVersion(version) {
  return db.query(`
    INSERT INTO schema_migrations values ('${version}')
  `);
}

function selectPendingMigrations(currentVersion, migrationDir) {
  return fs.readdirSync(migrationDir)
    .map(fileName => ({
      fileName,
      version: getVersionOf(fileName),
      filePath: path.join(migrationDir, fileName)
    }))
    .filter(({ version }) => version > currentVersion);
}

function getVersionOf(fileName) {
  const version = fileName.match(/^\d+/);
  return version && Number(version);
}

co(migrate);
