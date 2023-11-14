import knex from 'knex';
import { development as knexConfig } from './knexfile.js';

export default knex(knexConfig);
