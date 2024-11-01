const userService = require('../services/userService');

const userController = {
    async registerUser(req, res) {
        try{
            const user = await userService.register(req.body);
            res.status(201).json(user);
        }catch(error){
            res.status(400).json({error: error.message});
        }
    },

    async login(req, res){
        const { email, password } = req.body;
        TODO: COOKE
        try{
            const result = await userService.login(email, password);
            res.status(200).json({
                message: "login successful",
                user: result.user,
                token: result.token
            });


        }catch(err){
            res.status(400).json({
                message: error.message
            })
        }
    }
}

module.exports = userController;