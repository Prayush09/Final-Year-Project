const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.postgresql
})

//Testing the connection

const testconnection = 

module.exports = pool;

