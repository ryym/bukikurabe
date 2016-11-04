const pg = require('pg');
const env = require('../../config/env');

function createDBClient() {
  const client = new pg.Client({
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
    host: env.DB_HOST,
    port: env.DB_PORT,
  });

  return {
    query: client.query.bind(client),
    end: client.end.bind(client),

    // Wrap the original function by Promise.
    connect: () => new Promise((resolve, reject) => {
      client.connect(err => err ? reject(err) : resolve(client));
    }),
  };
}

function selectCurrentSchemaVersion(db) {
  return db
    .query(`
      SELECT version FROM schema_migrations
      ORDER BY version desc LIMIT 1
    `)
    .then(({ rows }) => Number(rows.length > 0 ? rows[0].version : null));
}

module.exports = {
  createDBClient,
  selectCurrentSchemaVersion,
};
