const matchService = require('../services/matchService');

const matchController = {
    
    async findMatch(req, res){
        const user_id = req.user.id;

        try{
            const matches = await matchService.findMatchForUser(user_id);
            res.status(200).json(matches);//send the matches to the front end
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

    //TODO: Make sure this works...
    async deleteMatch(req, res){
        const user_id = req.user.id;
        const matched_user_id = req.body.matched_user_id; //expecting matched_user_id in the request body

        try{
            const deletedMatch = await matchService.deleteMatch(user_id, matched_user_id);

            if(deletedMatch.success){
                console.log(deletedMatch.message);
                const match = deletedMatch.deleteMatch;
                res.status(200).json({
                    deletedMatch.del
                    message: deletedMatch.message,

                })
            }
        }catch(error){
            console.error("Could not delete match: ", error);
        }
    }
}