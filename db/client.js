const pg = require('pg');

function createClient() {
  return new pg.Client({
    user: 'ika',
    password: 'ika',
    database: 'ika',
    host: 'localhost',
    port: 5433
  });
}

module.exports = {
  createClient
};

