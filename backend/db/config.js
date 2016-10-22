import env from '../env';

export default {
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  host: env.DB_HOST,
  port: env.DB_PORT,
  max: 10,
  idleTimeoutMillis: 30000,
};
