const Profile = require('../models/Profile');
const Match = require('../models/Match')

const matchService = {

    //TODO: Create an update function that updates the matches score if profile of the user is updated...
    async updateMatches(user_id){
        try{
            const updateMatches = await Match.updateMatches(user_id);

            if(updatedMatch){
                console.log("All matches have been updated: ", updateMatches);
            }else{
                
            }
        }
    },

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
    
        // Calculate match scores for potential profiles using Promise.all
        const matches = await Promise.all(potentialMatchProfiles.map(async (profile) => {
            const score = await this.calculateMatchScore(user_profile, profile);
            return { user_id, matched_user_id: profile.user_id, score };
        }));
    
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
    }
    ,

    async calculateMatchScore(userProfile, otherProfile){
        try{
            const requestData = {
                userProfile:{
                    age: userProfile.age,
                    cleanliness: userProfile.cleanliness,
                    bio: userProfile.bio,
                    noise_tolerance: userProfile.noise_tolerance,
                    sleep_schedule: userProfile.sleep_schedule,
                    budget: userProfile.budget,
                    location_preferences: userProfile.location_preferences,
                    gender: userProfile.gender
                },

                otherProfile: {
                //data from the other user:
                    age: otherProfile.age,
                    cleanliness: otherProfile.cleanliness,
                    bio: otherProfile.bio,
                    noise_tolerance: otherProfile.noise_tolerance,
                    sleep_schedule: otherProfile.sleep_schedule,
                    budget: otherProfile.budget,
                    location_preferences: otherProfile.location_preferences,
                    gender: otherProfile.gender
                }
                
            };

            //sending data to Flask API for score prediction
            const response = await fetch("https://13f1-34-172-94-37.ngrok-free.app/predict", {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(requestData)
            });

            if(!response.ok){
                throw new Error("Failed to get match score from API");
            }

            //parse the response from the FLASK API
            const data = await response.json();
            console.log("If the match is 0, that is because location is not same", data);
            //return the match score
            //convert the score into integer...
            return Math.floor(data.match_score);
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

    async updateMatch(user_id, matched_user_id){
        try{
            const updatedMatch = await Match.updateMatch(user_id, matched_user_id);

            if(updatedMatch){
                console.log("User match request accepted successfully! ", updatedMatch);
            }
            else{
                console.log("No update performed, match might be accepted or does not exist!");
            }
        }catch(error){
            console.error("Error occurred during match update: ", error);
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