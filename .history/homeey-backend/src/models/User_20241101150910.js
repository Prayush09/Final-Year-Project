const pool = require('../config/db');

const User = {
    async createUser(userDetails){
        const { username, password, email } = userDetails;
        const result = await pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
            [username, email, password]
        );
        return result.rows[0];
    }
}

module.exports = User;