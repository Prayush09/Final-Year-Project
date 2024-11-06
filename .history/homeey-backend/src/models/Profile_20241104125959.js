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
                cleanliness, // BETWEEN 1 AND 5
                noise_tolerance, //BETWEEN 1 AND 5
                sleep_schedule, //[Night Owl, Morning Bird]
                budget,
                location_preferences
            ]
        );

        await pool.query(
            `UPDATE INTO users HAVING user_id = $1
            SET profile_completed `
        )

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
            SET age = $2, gender = $3, bio = $4, cleanliness = $5, noise_tolerance = $6, sleep_schedule = $7, budget = $8, location_preferences = $9, updated_at = NOW()
            WHERE user_id = $1
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

        return update.rows[0];
    },

    async getProfileByUserId(user_id){
        try{
            const result = await pool.query(
                `SELECT * FROM profiles WHERE user_id = $1`,
                [
                    user_id
                ]
            );

            if(result.rows.length === 0) return null;
            
            return result.rows[0];
        } catch(error){
            console.log("DB Error Fetching the profile" + error);
            throw new Error('Database error occurred while fetching profile');
        }   
    },

    async getProfilesExcept(user_id){
        const result = await pool.query(
            `SELECT * FROM profiles WHERE user_id != $1`,
            [user_id]
        );

        if(result.rows.length === 0) throw new Error("No other profile found");

        return result.rows; //return all the rows found...
    },

    //delete profile here will be used to delete the whole user... 
    //this will delete their matches, chats, profile and everything related to the user.
    async deleteProfile(user_id){
        try{
            const result = await pool.query(
                `DELETE FROM users WHERE user_id = $1`,
                [user_id]
            )

            if(result.rowCount === 0) throw new Error("No Profile found with your user_id");

            return {message: "Profile Deleted Successfully"};

        }catch(error){
            throw new Error("Error while deleting profile" + error.message);
        }
    }
}


module.exports = Profile;

