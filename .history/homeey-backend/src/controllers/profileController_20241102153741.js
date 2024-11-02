const Profile = require('../models/Profile');

const profileController = {
    async createProfile(req, res) {
        try{
            const profileData = {...req.body, user_id: req.user.id };

            const profile = await Profile.createProfile(profileData);

            res.status(201).json({
                message: "Profile Created Successfully"
            });
        }catch(error){
            res.status(500).json({error:"Some error occurred during profile creation: "+error.message});
        }
    },

    async getProfile(req, res){
        try{
            const profile = await Profile.getProfileByUserId(req.user.id);

            if(!profile){
                return res.status(404).json({message: "Profile not found!"});
            }

            res.status(200).json(profile)
        }
    }

}