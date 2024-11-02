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
                
            ]
        )
    }
}

