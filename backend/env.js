/**
 * Export environment variables.
 */

import dotenv from 'dotenv';
import process from 'process';

// Load environment variables from the env file.
dotenv.config();

const envVars = process.env;
const env = {
  DB_PASSWORD: envVars.POSTGRES_PASSWORD,
  DB_USER: envVars.POSTGRES_USER,
  DB_DATABASE: envVars.POSTGRES_DATABASE,
  DB_HOST: envVars.POSTGRES_HOST,
  DB_PORT: envVars.POSTGRES_PORT,
};

Object.keys(env).forEach(name => {
  if (env[name] === undefined) {
    throw new Error(`Envrionment property '${name}' is not specified.`);
  }
});

export default env;
