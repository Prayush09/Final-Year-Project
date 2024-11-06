const matchService = require('../services/matchService');

const matchController = {
    async findMatch(req, res){
        const user_id = req.user.id;

        try{
            const matches = await matchService.findMatchForUser(user_id);
        }
    }
}