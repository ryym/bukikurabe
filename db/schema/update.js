const co = require('co');
const fs = require('fs');
const path = require('path');
const db = require('../client');

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
  const jsonPath = path.join(__dirname, 'schema.json');
  fs.writeFileSync(jsonPath, JSON.stringify(schemaData, null, 2));
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
