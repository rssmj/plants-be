// Importing the 'knex' library
import knex from 'knex';

// Importing the 'development' configuration from a 'knexfile.js' file
import { development as knexConfig } from './knexfile.js';

// Creating a Knex instance with the provided configuration
// The 'knex' function initializes Knex with the configuration provided
const db = knex(knexConfig);

// Exporting the configured Knex instance as a default export
export default db;
