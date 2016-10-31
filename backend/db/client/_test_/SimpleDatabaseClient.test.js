import test from 'ava';
import pg from 'pg';
import dbConfig from '../../config';
import SimpleDatabaseClient from '../SimpleDatabaseClient';

test('execute query', async t => {
  const client = new SimpleDatabaseClient(pg.Client, dbConfig);
  const rows = await client.query('select 1 as value');
  t.deepEqual(rows, [{ value: 1 }]);
});
