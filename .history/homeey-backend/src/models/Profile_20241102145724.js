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
            
        )
    }
}

