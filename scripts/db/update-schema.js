const co = require('co');
const fs = require('fs');
const path = require('path');
const {
  createDBClient,
  selectCurrentSchemaVersion
} = require('./_helper');

const db = createDBClient();

const SCHEMA_JSON_PATH = path.resolve(__dirname, '../../db/schema.json');

const selectSchemaInfoSQL = `
  SELECT
      table_name
    , column_name
  FROM
    information_schema.columns
  WHERE
    table_schema = 'public'
  ORDER BY
      table_name
    , ordinal_position
`;

function groupBy(column, allRows) {
  return allRows.reduce((groups, row) => {
    const key = row[column];
    groups[key] = (groups[key] || []).concat(row);
    return groups;
  }, {});
}

function storeSchemaData(filePath, schemaData) {
  fs.writeFileSync(filePath, JSON.stringify(schemaData, null, 2));
}

function makeTableData(columns) {
  const groups = groupBy('table_name', columns);
  return Object.keys(groups).reduce((tables, tableName) => Object.assign(tables, {
    [tableName]: {
      name: tableName,
      columns: groups[tableName].map(r => r.column_name),
    }
  }), {});
}

co(function* () {
  try {
    yield db.connect();

    const currentVersion = yield selectCurrentSchemaVersion(db);
    const { rows } = yield db.query(selectSchemaInfoSQL);
    const tables = makeTableData(rows);

    storeSchemaData(SCHEMA_JSON_PATH, {
      version: currentVersion,
      tables,
    });
  }
  catch (err) {
    console.error(err);
  }
  finally {
    db.end();
  }
});
