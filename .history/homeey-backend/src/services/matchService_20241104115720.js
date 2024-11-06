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

            const status = 'pending'/
        }
    },

    calculateMatchScore(userProfile, otherProfile){
        //TODO: ADD ML MODEL API CALLS HERE AND ALL LOGIC RELATED TO SCORING GO HERE...
        let score = 0;

        return score;//dummy...
    },

    async getAllMatchesForUser(user_id){
        const matches = 
    }
}

module.exports = matchService;