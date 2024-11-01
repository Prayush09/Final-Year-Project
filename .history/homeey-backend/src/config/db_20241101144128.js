const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.postgresql
})



module.exports = pool;

