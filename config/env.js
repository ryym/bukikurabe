/**
 * Load environment variables.
 * Although we can run processes both on localhost
 * and a Docker container, some processes may not run
 * correctly because there are node module(s) that have
 * a difference build process for platforms (Darwin or Linux).
 */

const process = require('process');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

function loadEnvVars(envVars, isDocker, nodeEnv) {

  // If in a Docker container, all environemnt variables
  // must be already set by docker-compose file.
  if (isDocker) {
    return envVars;
  }

  const envFilePath = path.join(__dirname, 'envs', `${nodeEnv}.env`);
  const envVarsInFile = dotenv.parse(fs.readFileSync(envFilePath));
  return Object.assign(envVarsInFile, envVars);
}

const envVars = loadEnvVars(
  process.env,
  Boolean(process.env.DOCKER),
  process.env.NODE_ENV || 'dev'
);

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

module.exports = env;
