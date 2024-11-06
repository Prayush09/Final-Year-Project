const Profile = require('../models/Profile');
const Match = require('../models/Match')

const matchService = {

    //TODO: Create an Update function that updates the status of a match, from pending to rejected or selected...

    async findMatchForUser(user_id){
        const user_profile = await Profile.getProfileByUserId(user_id);
        const potentialMatchProfiles = await Profile.getProfilesExcept(user_id);

        const matches = potentialMatchProfiles.map(profile => {
            const score = this.calculateMatchScore(user_profile, profile);
            return {user_id, matched_user_id: profile.user_id, score};
        });

        matches.sort((a,b) => b.score - a.score);//scoring matches in descending order...

        for(let match of matches){
            const {matched_user_id, score } = match;
            const status = 'pending';//default state for status
            try{
                await Match.createMatch(match.user_id, matched_user_id, score, status);
            }
            catch(error){
                throw new Error("Some Error Occurred in matchmaking" + error.message);
            }
        }
    },

    calculateMatchScore(userProfile, otherProfile){
        //TODO: ADD ML MODEL API CALLS HERE AND ALL LOGIC RELATED TO SCORING GO HERE...
        //dummy implementation for testing...
        let score = Math.floor(Math.random()*100) === 100 ? Math.floor(Math.random()*100) : Math.floor(Math.random()*100) + 1;
        return score;
    },

    async getAllMatchesForUser(user_id){
        try{
            const matches = await Match.getAllMatchesForUser(user_id);

            if(matches.rows.length === 0) throw new Error("No matches found for User!");

            return matches.rows;//return all matches found for user.
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