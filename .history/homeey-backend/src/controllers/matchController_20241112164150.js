const { rejectMatch } = require('../models/Match');
const matchService = require('../services/matchService');

const matchController = {
    
    async findMatch(req, res){
        const user_id = req.user.id;

        try{
            const matches = await matchService.findMatchForUser(user_id);
            res.status(200).json({
                message: "Match Found!",
                matches
            });//send the matches to the front end
        }
        catch(error){
            res.status(500).json({
                message:"Error finding matches",
                error: error.message
            })
        }
    },

    async getUserMatches(req, res){
        const user_id = req.user.id;

        try{
            const userMatches = await matchService.getAllMatchesForUser(user_id);
            res.status(200).json(userMatches);
        }
        catch(error){
            res.status(500).json({
                message:"Could not find matches for user",
                error: error.message
            })
        }
    },

    async deleteMatch(req, res){
        const user_id = req.user.id;
        //make sure to send the matched_user_id in the body in front-end
        const matched_user_id = req.body.matched_user_id; //expecting matched_user_id in the request body

        try{
            const deletedMatch = await matchService.deleteMatch(user_id, matched_user_id);

            if(deletedMatch.success){
                console.log(deletedMatch.message);
                const match = deletedMatch.deleteMatch;
                res.status(200).json({
                    match,
                    message: deletedMatch.message,
                })
            }
        }catch(error){
            console.error("Could not delete match: ", error);
            res.status(500).json({
                message: error.message,
                error
            })
        }
    },

    //to update the match when user's accept's one request.
    async acceptMatch(req, res){
        const user_id = req.user.id;
        const matched_user_id = req.body.matched_user_id;
        try{
            const updateMatch = await matchService.acceptMatch(user_id, matched_user_id);

            res.status(201).json({
                message:"Matches updated successfully!",
                updateMatch
            })
        }
        catch(error){
            res.status(500).json({
                message: error.message,
                error
            })
        }
    },

    async rejectMatch(req, res){
        const user_id = req.user.id;
        const matched_user_id = req.body.matched_user_id;
        try{
            const updateMatch = await matchService.rejectMatch(user_id, matched_user_id);

            res.status(201).json({
                message:"Match has been rejected successfully!",
                updateMatch
            })
        }
        catch(error){
            res.status(500).json({
                message: error.message,
                error
            })
        }
    },

    //a function to update the matches when user profile is updates.
    async updateMatches(req, res){
        const user_id = req.user.id;

        try{
            const updateMatch = await matchService.updateMatches(user_id);

            res.status(201).json({
                message:"Matches updated successfully!",
                updateMatch
            })
        }
        catch(error){
            res.status(500).json({
                message: error.message,
                error
            })
        }
    }
}

module.exports = matchController;