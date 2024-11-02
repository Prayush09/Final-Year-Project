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

            res.status(200).json(profile);
        } catch(error){
            res.status(500).json({error: "Error Occurred : "+ error.message});
        }
    },

    async updateProfile(req, res){
        try{
            const profileData = req.body;
            const updateProfile = await Profile.updateProfile(req.user.id, profileData);

            res.status(200).json({
                message: "Profile updated successfully!"
            });
        } catch(error){
            res.status(500).json({error:"Error while updating profile" + error.message});
        }
    }

}