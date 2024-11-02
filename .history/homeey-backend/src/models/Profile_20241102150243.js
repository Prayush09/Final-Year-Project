const pool = require('../config/db')

const Profile = {
    async createProfile(profileDetails){
        const{
            user_id,
            age,
            gender,
            bio,
            cleanliness,
            noise_tolerance,
            sleep_schedule,
            budget,
            location_preferences
        } = profileDetails;

        const result = await pool.query(
            `INSERT INTO profiles (user_id, age, gender, bio, cleanliness, noise_tolerance, sleep_schedule, budget, location_preferences, updated_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())
            RETURNING *`,
            [
                user_id,
                age,
                gender,
                bio,
                cleanliness,
                noise_tolerance,
                sleep_schedule,
                budget,
                location_preferences
            ]
        );

        return result.rows[0];//return the newly created row in the table.
    },

    //function to update the profile:
    async updateProfile(user_id, profileDetails){
        const{
           age,
           gender,
           bio,
           cleanliness,
           noise_tolerance,
           sleep_schedule,
           budget,
           location_preferences
        } = profileDetails

        const update = await pool.query(
            `UPDATE profiles
            SET age = $2, gender = $3, bio = 
            `
        )
    }
}

