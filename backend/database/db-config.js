require('dotenv').config();

const knex = require('knex');

const knexConfig = require('../knexfile.js');

const dbEnvironment = process.env.NODE_ENV || 'development';

module.exports = knex(knexConfig[dbEnvironment]);
