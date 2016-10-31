import { createPool } from './client';

let pool;

/**
 * Get a database pool. The pool is created
 * when the first time this function is called.
 */
export default function getPool() {
  pool = pool || createPool();
  return pool;
}
