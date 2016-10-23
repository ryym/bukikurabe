import createPool from '../db/pool';
import MainWeaponsRepository from './MainWeaponsRepository';
import SubWeaponsRepository from './SubWeaponsRepository';
import SpecialWeaponsRepository from './SpecialWeaponsRepository';
import WeaponTypesRepository from './WeaponTypesRepository';

const pool = createPool();

export const mainWeaponsR = new MainWeaponsRepository(pool);
export const subWeaponsR = new SubWeaponsRepository(pool);
export const specialWeaponsR = new SpecialWeaponsRepository(pool);
export const weaponTypesR = new WeaponTypesRepository(pool);
