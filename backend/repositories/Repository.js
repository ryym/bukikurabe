
export default class Repository {
  constructor(db) {
    this._db = db;
    this._table = this.getTable();
  }

  getDb() {
    return this._db;
  }

  getTable() {
    throw new Error('Must be implemented');
  }

  find(id) {
    const { _db, _table: table } = this;
    return _db
      .query(table.select(table.star()).where(table.id.equals(id)))
      .then(rows => rows[0]);
  }

  findAll() {
    const { _db, _table: table } = this;
    return _db.query(table.select(table.star()));
  }
}
