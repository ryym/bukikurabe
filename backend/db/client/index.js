import pg from 'pg';
import SimpleDatabaseClient from './SimpleDatabaseClient';
import DatabaseClientPool from './DatabaseClientPool';
import dbConfig from '../config';

export function createClient() {
  return new SimpleDatabaseClient(pg.Client, dbConfig);
}

export function createPool() {
  return new DatabaseClientPool(new pg.Pool(dbConfig));
}
