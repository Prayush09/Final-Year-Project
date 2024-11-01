const userService = require('../services/userService');

const userController = {
    async registerUser(req, res) {
        try{
            const user = await userService.register(req.body);
            res.status(201).json(user);
        }catch(error){
            res.status(400).json({error: error.message});
        }
    }
}

