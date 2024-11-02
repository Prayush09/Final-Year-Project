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
        // TODO: COOKIE BASED AUTHENTICATION
        try{
            const result = await userService.login(email, password);
            

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 3600000
            })


        }catch(error){
            res.status(400).json({
                message: error.message
            })
        }
    }
}

module.exports = userController;