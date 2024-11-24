const pool = require('../config/db');
const bcrypt = require('bcrypt');
const zod = require('zod');


const userSchema = zod.object({
    name: zod.string().min(1, "Name is required"),
    email: zod.string().regex(
        /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com|icloud\.com|aol\.com)$/,
        "Email must be from Gmail, Yahoo, HotMail, Outlook, iCloud, or AOL"
    ),
    password: zod.string().min(6, "Password must be at least 6 characters long")
});

const User = {
    async createUser(userDetails){
        try{
            const validatedUserDetails = userSchema.parse(userDetails);
        
        const {name, password, email} = validatedUserDetails;

        const result = await pool.query(
            'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
            [name, email, password]
        );
        return result.rows[0];
        }
        catch(err){
            //if any zod related error occurs
            if(err instanceof zod.ZodError){
                throw new Error (err.errors.map(e=>e.message).join(", "));
            }

            throw new Error("Unexpected Error Occurred");
        }
    },


    
    async findByEmail(email){
        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        return result.rows[0];
    },

    async deleteUser(user_id){
        try{
            const result = await pool.query(
                `DELETE FROM users WHERE user_id = $1 RETURNING *`,
                [user_id]
            );

            return result.rows[0];
        }catch(error){
            throw new Error("Error occurred while deleting the user", error.message);
        }
    },

    async comparePassword(inputPassword, storedPassword){
        return await bcrypt.compare(inputPassword, storedPassword);
    }
}

module.exports = User;