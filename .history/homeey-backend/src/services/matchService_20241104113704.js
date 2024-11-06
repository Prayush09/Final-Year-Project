const Profile = require('../models/Profile');

const matchService = {
    async findMatchForUser(user_id){
        const user_profile = await Profile.getProfileByUserId(user_id);
        const potentialMatchProfiles = await Profile.getProfilesExcept(user_id);

        const matches = potentialMatchProfiles.map(profile => {
            const score = calculateMatchScore(user_profile, profile);
            return {user_id, matched_user_id: profile.user_id, score};
        });

        matches.sort((a,b) => b.score - a.score);//scoring matches in descending order...
    },

    calculateMatchScore(userProfile, otherProfile)
}