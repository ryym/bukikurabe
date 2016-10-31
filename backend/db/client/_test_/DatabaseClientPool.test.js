import test from 'ava';
import pg from 'pg';
import dbConfig from '../../config';
import DatabaseClientPool from '../DatabaseClientPool';

test('execute query', async t => {
  const client = new DatabaseClientPool(new pg.Pool(dbConfig));
  const rows = await client.query('select 1 as value');
  t.deepEqual(rows, [{ value: 1 }]);
});
