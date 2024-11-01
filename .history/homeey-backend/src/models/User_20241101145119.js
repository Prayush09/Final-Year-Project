const pool = require('../config/db');

const User = {
    async createUser(userDetails){
        const { userName, password, email } = userDetails;
        const result = await pool.query(
            'INSERT INTO users (username, '
        )
    }
}