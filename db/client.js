const pg = require('pg');
const env = require('../config/env')

function createClient() {
  return new pg.Client({
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
    host: env.DB_HOST,
    port: env.DB_PORT,
  });
}

module.exports = {
  createClient
};

