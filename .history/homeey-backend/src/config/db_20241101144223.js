const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.postgresql
})

//Testing the connection

const testconnection = async () => {
    try{
        const res = await pool.query('SELECT NOW() AS current_time');
        console.log("db connected", res.rows[0])
    }
}

module.exports = pool;

