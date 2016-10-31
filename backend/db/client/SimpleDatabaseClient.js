import DatabaseClient from './DatabaseClient';

/**
 * SimpleDatabaseClient creates a connection to DB everytime
 * when the `query` method is used.
 */
export default class SimpleDatabaseClient extends DatabaseClient {
  constructor(Client, config) {
    super();
    this._Client = Client;
    this._config = config;
  }

  query(sql) {
    return new Promise((resolve, reject) => {
      const client = this.createClient();

      client.connect(err => {
        if (err) {
          reject(err);
          return;
        }
        client.query(String(sql), (err, result) => {
          if (err) {
            reject(err);
            return;
          }
          client.end();
          resolve(result.rows);
        });
      });
    });
  }

  createClient() {
    return new this._Client(this._config);
  }
}
