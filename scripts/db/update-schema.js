const co = require('co');
const fs = require('fs');
const path = require('path');
const db = require('./_client');

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

function makeScemaData(groups) {
  const tables = {};
  Object.keys(groups).forEach(tableName => {
    tables[tableName] = {
      name: tableName,
      columns: groups[tableName].map(r => r.column_name),
    };
  });
  return {
    createdAt: new Date().toLocaleString(),
    tables
  };
}

function storeSchemaData({ rows }) {
  const groups = groupBy('table_name', rows);
  const schemaData = makeScemaData(groups);
  fs.writeFileSync(SCHEMA_JSON_PATH, JSON.stringify(schemaData, null, 2));
}

co(function* () {
  try {
    yield db.connect();
    const result = yield db.query(selectSchemaInfoSQL);
    storeSchemaData(result);
  }
  catch (err) {
    console.error(err);
  }
  finally {
    db.end();
  }
});
