const Profile = require('../models/Profile');
const Match = require('../models/Match')

const matchService = {

    async findMatchForUser(user_id){
        const user_profile = await Profile.getProfileByUserId(user_id);
        const potentialMatchProfiles = await Profile.getProfilesExcept(user_id);

        const matches = potentialMatchProfiles.map(profile => {
            const score = calculateMatchScore(user_profile, profile);
            return {user_id, matched_user_id: profile.user_id, score};
        });

        matches.sort((a,b) => b.score - a.score);//scoring matches in descending order...

        for(match of matches){
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
        let score = 0;

        return score;//dummy...
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
            return await Match.deleteMatchesByUserId(user_id, matched_user_id);
        }catch(error){
            console.error("Error deleting match:", error);

            return {
                
            }
        }
    }
}

module.exports = matchService;