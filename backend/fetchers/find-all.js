import t from '../db/tables';

const findAll = (table) => (db) => {
  return db.query(table.select());
};

export const findAllMainWeapons = findAll(t.mainWeapons);
export const findAllSubWeapons = findAll(t.subWeapons);
export const findAllSpecialWeapons = findAll(t.specialWeapons);
export const findAllWeaponTypes = findAll(t.weaponTypes);
