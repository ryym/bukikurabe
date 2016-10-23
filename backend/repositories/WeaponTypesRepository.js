import Repository from './Repository';
import tables from '../db/tables';

export default class WeaponTypesRepository extends Repository {
  getTable() {
    return tables.weaponTypes;
  }
}
