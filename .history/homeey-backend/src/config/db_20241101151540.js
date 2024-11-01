const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.postgresql, 

    sync
})

// //Testing the connection

// const test_connection = async () => {
//     try{
//         const res = await pool.query('SELECT NOW() AS current_time');
//         console.log("db connected", res.rows[0]);
//     }catch(err){
//         console.error("db connection error", err.stack);
//     } finally{
//         await pool.end(); //close connection after testing
//     }
// }

// test_connection(); //DB WORKS

module.exports = pool;

