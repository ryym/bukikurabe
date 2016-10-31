import DatabaseClient from './DatabaseClient';

/**
 * DatabaseClientPool holds a connection pool
 * and acquire a client from the pool in the `query` method.
 */
export default class DatabasePool extends DatabaseClient {
  constructor(pool, onError) {
    super();
    this._pool = pool;

    if (typeof onError === 'function') {
      pool.on('error', onError);
    }
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
}
