import Repository from './Repository';
import tables from '../db/tables';

export default class SpecialWeaponsRepository extends Repository {
  getTable() {
    return tables.specialWeapons;
  }
}

