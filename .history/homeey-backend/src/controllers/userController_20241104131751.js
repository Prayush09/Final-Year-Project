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
        try{
            const result = await userService.login(email, password);

            res.cookie('token', result.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 3600000
            })

            res.status(200).json({
                message: "login successful",
                user: result.user,
                token: result.token
            });


        }catch(error){
            res.status(400).json({
                message: error.message
            })
        }
    },

    async delete(req, res){
        const user_id = req.user.id;

        try{
            const result = await userService.deleteUser(user_id);
            
            if(result.rows[0] === 0) throw new Error("Error occurred while deleting user!");

            res.status(200).json({
                result,
                message: "User Deleted Successfully!"
            });
        }catch(error){
            res.status(404).json({
                message: "User not found and ", error.message
            })
        }
    }
}

module.exports = userController;