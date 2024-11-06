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
    }
}