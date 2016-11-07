import express from 'express';
import co from 'co';
import {
  findAllMainWeapons,
  findAllSubWeapons,
  findAllSpecialWeapons,
  findAllWeaponTypes,
} from './fetchers/find-all';
import getPool from './db/pool';

// eslint-disable-next-line new-cap
const router = express.Router();

const db = getPool();

router.get('/all-data', (req, res) => {
  co(function* () {
    const data = yield {
      mainWeapons: findAllMainWeapons(db),
      subWeapons: findAllSubWeapons(db),
      specialWeapons: findAllSpecialWeapons(db),
      weaponTypes: findAllWeaponTypes(db),
    };
    res.json(data);
  });
});

export default router;
