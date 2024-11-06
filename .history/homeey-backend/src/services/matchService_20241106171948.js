const Profile = require('../models/Profile');
const Match = require('../models/Match')

const matchService = {

    //TODO: Create an Update function that updates the status of a match, from pending to rejected or selected...

    async findMatchForUser(user_id) {
        // Fetch user profile
        const user_profile = await Profile.getProfileByUserId(user_id);
        console.log("User Profile:", user_profile); // Debugging log

        // Fetch potential matches excluding the current user
        const potentialMatchProfiles = await Profile.getProfilesExcept(user_id);
        console.log("Potential Match Profiles:", potentialMatchProfiles); // Debugging log

        // Check if potential matches exist
        if (!potentialMatchProfiles || potentialMatchProfiles.length === 0) {
            throw new Error("No potential matches found.");
        }

        // Calculate match scores for potential profiles
        const matches = potentialMatchProfiles.map(profile => {
            const score = this.calculateMatchScore(user_profile, profile);
            return { user_id, matched_user_id: profile.user_id, score };
        });

        // Sort matches by score in descending order
        matches.sort((a, b) => b.score - a.score);
        console.log("Sorted Matches:", matches); // Debugging log

        // Create matches in the database
        for (let match of matches) {
            const { matched_user_id, score } = match;
            const status = 'pending'; // default state for status
            try {
                const createdMatch = await Match.createMatch(match.user_id, matched_user_id, score, status);
                console.log("Created Match:", createdMatch); // Debugging log
            } catch (error) {
                console.error("Error creating match:", error);
                throw new Error("Some Error Occurred in matchmaking: " + error.message);
            }
        }
    },

    calculateMatchScore(userProfile, otherProfile){
        try{
            const requestData = {
                userProfile:{
                    age: userProfile.age,
                    cleanliness: userProfile.cleanliness,
                    noise_tolerance: userProfile.noise_tolerance,
                    sleep_schedule: userProfile.sleep_schedule,
                    budget: userProfile.budget,
                    location_preferences: userProfile.location_preferences,
                    gender: userProfile.gender
                ],

                
                //data from the other user:
                age_2: otherProfile.age,
                cleanliness_2: otherProfile.cleanliness,
                noise_tolerance_2: otherProfile.noise_tolerance,
                sleep_schedule_2: otherProfile.sleep_schedule,
                budget_2: otherProfile.budget,
                location_preferences_2: otherProfile.location_preferences,
                gender_2: otherProfile.gender
            };

            //sending data to Flask API for score prediction
            const response = await fetch("http://localhost:5000/predict", {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(requestData);
            });

            if(!response.ok){
                throw new Error("Failed to get match score from API");
            }

            //parse the response from the FLASK API
            const data = await response.json();

            //return the match score
            return data.match_score;
        } catch(error){
            console.log("Error occurred during calculation of match score", error);
            return Math.floor(Math.random() * 100 < 100 ? + 1 : + 0); //fall back on dummy score if error occurs 
        }
    },
    
    async getAllMatchesForUser(user_id){
        try{
            const matches = await Match.getMatchesByUserId(user_id);

            if(matches.length === 0) throw new Error("No matches found for User!");

            return matches;//return all matches found for user.
        }catch(error){
            return error.message;
        }
    },


    async deleteMatch(user_id, matched_user_id){
        try{
            const deleteMatch = await Match.deleteMatchesByUserId(user_id, matched_user_id);
            return{
                success: true,
                message: "Match Deleted Successfully",
                deleteMatch
            }
        }catch(error){
            console.error("Error deleting match:", error);

            return {
                success: false,
                message: error.message || "An error occurred while deleting the match"
            }
        }
    }
}

module.exports = matchService;