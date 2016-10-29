const co = require('co');
const db = require('./_client');
const metaData = require('../../db/seed/meta-data.json');
const weaponTypes = require('../../db/seed/weapon-types.json');
const mainWeapons = require('../../db/seed/main-weapons.json');
const subWeapons = require('../../db/seed/sub-weapons.json');
const specialWeapons = require('../../db/seed/special-weapons.json');

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

function insert(table, records) {
  return db.query(makeInsertSql(table, records));
}

function makeIDMap(records, valueCol = 'name') {
  return records.reduce((ids, record) => {
    ids[record[valueCol]] = record.id;
    return ids;
  }, {});
}

function insertMainWeapons() {
  return co(function* () {
    const results = yield [
      db.query('SELECT id, name FROM sub_weapons'),
      db.query('SELECT id, name FROM special_weapons'),
      db.query('SELECT id, name FROM weapon_types'),
    ];
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

    yield insert('main_weapons', normalizedMainWeapons);
  });
}

/** * Execute insertions ***/

co(function* () {
  try {
    yield db.connect();
    yield [
      insert('meta_data', metaData),
      insert('sub_weapons', subWeapons),
      insert('special_weapons', specialWeapons),
      insert('weapon_types', weaponTypes),
    ];
    yield insertMainWeapons();
  }
  catch (err) {
    console.error(err);
  }
  finally {
    db.end();
  }
});
