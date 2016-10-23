import Repository from './Repository';
import tables from '../db/tables';

export default class MainWeaponsRepository extends Repository {
  getTable() {
    return tables.mainWeapons;
  }
}
