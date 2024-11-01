const pool = require('../config/db');
const bcrypt = require('bcrypt');

const User = {
    async createUser(userDetails){
        const { name, password, email } = userDetails;
        const result = await pool.query(
            'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
            [name, email, password]
        );
        return result.rows[0];
    },

    async findByEmail(email){
        
    }

    async comparePassword(inputPassword, storedPassword){
        return await bcrypt.compare(inputPassword, storedPassword);
    }
}

module.exports = User;