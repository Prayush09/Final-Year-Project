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
            res.status(500).json({error:""+error.message});
        }
    },


}