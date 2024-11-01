const pool = require('../config/db');

const User = {
    async createUser(userDetails){
        const { name, password, email } = userDetails;
        const result = await pool.query(
            'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
            [name, email, password]
        );
        return result.rows[0];
    },

    async comparePassword(inputPassword, storedPassword){
        return await bcrypt
    }
}

module.exports = User;