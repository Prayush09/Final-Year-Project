const pool = require('../config/db');
const bcrypt = require('bcrypt');
const zod = require('zod');


const userSchema = zod.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long")
});

const User = {
    async createUser(userDetails){
        try{}
        
    },

    async findByEmail(email){
        const result = await pool.query(
            'SEARCH * IN users WHERE email = $1',
            [email]
        );

        return result.rows[0];
    },

    async comparePassword(inputPassword, storedPassword){
        return await bcrypt.compare(inputPassword, storedPassword);
    }
}

module.exports = User;