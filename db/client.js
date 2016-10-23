const pg = require('pg');
const env = require('../config/env');

const client = new pg.Client({
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  host: env.DB_HOST,
  port: env.DB_PORT,
});

module.exports = {
  query: client.query.bind(client),
  end: client.end.bind(client),

  // Wrap the original function by Promise.
  connect: () => new Promise((resolve, reject) => {
    client.connect(err => err ? reject(err) : resolve(client));
  }),
};

