const { tables } = require('../../db/schema/schema.json');
const sql = require('sql');

function snakeToCamel(word) {
  return word.replace(/_([a-z])/gi, (m, char) => char.toUpperCase());
}

const commonConfig = {
  snakeToCamel: true
};

const tableObjects = {};
Object.keys(tables).forEach(tableName => {
  const camelTableName = snakeToCamel(tableName);
  tableObjects[camelTableName] = sql.define(
    Object.assign({}, tables[tableName], commonConfig)
  );
});

export default tableObjects;
