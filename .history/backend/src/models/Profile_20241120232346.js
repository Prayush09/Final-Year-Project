const pool = require('../config/db')

const Profile = {
    async createProfile(profileDetails){
        const{
            user_id,
            name, // Added the name field
            age,
            gender,
            bio,
            cleanliness,
            noise_tolerance,
            sleep_schedule,
            budget,
            location_preferences
        } = profileDetails;

        try{
            const result = await pool.query(
                `INSERT INTO profiles (user_id, name, age, gender, bio, cleanliness, noise_tolerance, sleep_schedule, budget, location_preferences, updated_at)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW())
                RETURNING *`,
                [
                    user_id,
                    name, // Passing name to the query
                    age,
                    gender,
                    bio,
                    cleanliness, // BETWEEN 1 AND 5
                    noise_tolerance, // BETWEEN 1 AND 5
                    sleep_schedule, // [Night Owl, Morning Bird]
                    budget,
                    location_preferences
                ]
            );

            // Mark profile completed as True for this user, in userDB
            await pool.query(
                `UPDATE users 
                SET profile_completed = TRUE
                WHERE user_id = $1`,
                [user_id]
            );

            return result.rows[0]; // Return the newly created row in the table.
        }
        catch(error){
            console.error("Some error occurred while creating profile: ", error);
            throw new Error("Could not create profile, please try again");
        }
    },

    // Function to update the profile:
    async updateProfile(user_id, profileDetails){
        const{
           name, // Added the name field
           age,
           gender,
           bio,
           cleanliness,
           noise_tolerance,
           sleep_schedule,
           budget,
           location_preferences
        } = profileDetails;

        try{
            const update = await pool.query(
                `UPDATE profiles
                SET name = $2, age = $3, gender = $4, bio = $5, cleanliness = $6, noise_tolerance = $7, sleep_schedule = $8, budget = $9, location_preferences = $10, updated_at = NOW()
                WHERE user_id = $1
                RETURNING *`,
                [
                    user_id,
                    name, // Adding name to the update query
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
            await pool.query('COMMIT');
            return update.rows[0];
        }catch(error){
            console.error("Could not update profile: ", error);
            throw new Error("Could not update profile, please try again later...");
        }
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

        return result.rows; // Return all the rows found...
    },

    // Delete profile here will be used to delete the whole user... 
    // This will delete their matches, chats, profile and everything related to the user.
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
