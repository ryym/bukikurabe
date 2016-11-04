import test from 'ava';
import tables from '../../db/tables';
import { createClient } from '../../db/client';
import { setupDBCleaner } from './_helper';
import {
  findAllMainWeapons,
  findAllSubWeapons,
  findAllSpecialWeapons,
  findAllWeaponTypes,
} from '../find-all';

const {
  mainWeapons,
  subWeapons,
  specialWeapons,
  weaponTypes,
} = tables;

const samples = {
  subWeapons: [
    { id: 1, name: 'sub1' },
    { id: 2, name: 'sub2' },
    { id: 3, name: 'sub3' },
  ],
  specialWeapons: [
    { id: 1, name: 'special1' },
    { id: 2, name: 'special2' },
  ],
  weaponTypes: [
    { id: 1, name: 'type1' },
  ],
  mainWeapons: [{
    name: 'main1',
    subWeaponId: 1,
    specialWeaponId: 1,
    weaponTypeId: 1,
  }],
};

const db = createClient();

const testS = test.serial;

setupDBCleaner(test, db);

testS('findAllSubWeapons', async t => {
  await db.query(subWeapons.insert(samples.subWeapons));
  const rows = await findAllSubWeapons(db);
  t.is(rows.length, 3);
});

testS('findAllSpecialWeapons', async t => {
  await db.query(specialWeapons.insert(samples.specialWeapons));
  const rows = await findAllSpecialWeapons(db);
  t.is(rows.length, 2);
});

testS('findAllWeaponTypes', async t => {
  await db.query(weaponTypes.insert(samples.weaponTypes));
  const rows = await findAllWeaponTypes(db);
  t.deepEqual(rows.map(r => r.name), ['type1']);
});

testS('findAllMainWeapons', async t => {
  await Promise.all([
    db.query(subWeapons.insert(samples.subWeapons)),
    db.query(specialWeapons.insert(samples.specialWeapons)),
    db.query(weaponTypes.insert(samples.weaponTypes)),
  ]);
  await db.query(mainWeapons.insert(samples.mainWeapons));
  const rows = await findAllMainWeapons(db);
  t.deepEqual(rows.map(r => r.name), ['main1']);
});
