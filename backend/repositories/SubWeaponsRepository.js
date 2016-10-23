import Repository from './Repository';
import tables from '../db/tables';

export default class SubWeaponsRepository extends Repository {
  getTable() {
    return tables.subWeapons;
  }
}
