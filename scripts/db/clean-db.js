const co = require('co');
const { createDBClient } = require('./_helper');
const cleanDB = require('../lib/clean-db');

co(function* () {
  const db = createDBClient();
  try {
    yield db.connect();
    yield cleanDB(db);
  }
  finally {
    db.end();
  }
});

