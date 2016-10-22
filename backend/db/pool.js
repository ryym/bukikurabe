import dbConfig from './config';
import pg from 'pg';

export class DataBasePool {
  constructor(pool) {
    this._pool = pool;
    this._listenToErrorsInPool(pool);
  }

  query(sql) {
    return this.acquireClient(client =>
      client.query(String(sql)).then(result => result.rows)
    );
  }

  acquireClient(promisedAction) {
    return this._pool.connect()
      .then(client => {
        return promisedAction(client)
          .then(result => {
            client.release();
            return result;
          })
          .catch(err => {
            client.release();
            throw err;
          });
      });
  }

  _listenToErrorsInPool() {

    // TODO: Handle errors ocurred while pooled.
    // pool.on('error', () => {});
  }
}

export default function createPool() {
  const pool = new pg.Pool(dbConfig);
  return new DataBasePool(pool);
}

