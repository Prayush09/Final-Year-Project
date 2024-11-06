const Profile = require('../models/Profile');

const matchService = {
    async findMatchForUser(user_id){
        const user_profile = await Profile.getProfileByUserId(user_id);
        const potentialMatchProfiles = await Profile.
    }
}