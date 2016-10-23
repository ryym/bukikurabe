/* eslint-disable no-console */

const db = require('../client');
const metaData = require('./data/meta-data');
const weaponTypes = require('./data/weapon-types');
const mainWeapons = require('./data/main-weapons');
const subWeapons = require('./data/sub-weapons');
const specialWeapons = require('./data/special-weapons');

function waterfall(asyncs) {
  return asyncs.reduce((p, next) => p.then(next), Promise.resolve());
}

function recordToValues(record, columns) {
  return columns.map(c => {
    const value = record[c];
    if (typeof value === 'string') {
      return `'${value}'`;
    }
    return value;
  });
}

function makeInsertSql(table, records) {
  const columns = Object.keys(records[0]);
  const rows = records.map(r => `(${recordToValues(r, columns).join(',')})`);
  return `INSERT INTO ${table} (${columns.join(',')}) VALUES ${rows.join(',')}`;
}

function makeInserter(table, records) {
  return () => db.query(makeInsertSql(table, records));
}

function makeIDMap(records, valueCol = 'name') {
  return records.reduce((ids, record) => {
    ids[record[valueCol]] = record.id;
    return ids;
  }, {});
}

function insertMainWeapons() {
  return waterfall([
    () => Promise.all([
      db.query('SELECT id, name FROM sub_weapons'),
      db.query('SELECT id, name FROM special_weapons'),
      db.query('SELECT id, name FROM weapon_types'),
    ]),
    (results) => {
      const subWeaponIDs = makeIDMap(results[0].rows);
      const specialWeaponIDs = makeIDMap(results[1].rows);
      const weaponTypeIDs = makeIDMap(results[2].rows);

      const replaceWithID = (weapon, table, ids) => {
        weapon[`${table}_id`] = ids[weapon[table]];
        delete weapon[table];
      };

      const normalizedMainWeapons = mainWeapons.map(weapon => {
        const w = Object.assign({}, weapon);
        replaceWithID(w, 'sub_weapon', subWeaponIDs);
        replaceWithID(w, 'special_weapon', specialWeaponIDs);
        replaceWithID(w, 'weapon_type', weaponTypeIDs);
        return w;
      });

      db.query(makeInsertSql('main_weapons', normalizedMainWeapons));
    }
  ]);
}

/** * Execute insertions ***/

waterfall([
  () => db.connect(),
  makeInserter('meta_data', metaData),
  makeInserter('sub_weapons', subWeapons),
  makeInserter('special_weapons', specialWeapons),
  makeInserter('weapon_types', weaponTypes),
  insertMainWeapons
])
.catch((err) => console.error(err))
.then(() => db.end());
