const userService = require('../services/userService');
const User = require('../models/User')

const userController = {

    async getUserId(req, res){
        try{
            const user = await User.findByEmail(req.body.email);
            res.status(201).json(user.user_id)
        }
    },


    async registerUser(req, res) {
        try{
            const user = await userService.register(req.body);
            res.status(201).json(user);
        }catch(error){
            res.status(400).json({error: error.message});
        }
    },

    async login(req, res) {
        const { email, password } = req.body;
        try {
            console.log("Login request body:", req.body); // Log request body to ensure email and password are correct
            const result = await userService.login(email, password);
    
            // Log result from login service
            console.log("Login result:", result);
    
            // Check if token is returned
            if (!result.token) {
                return res.status(400).json({ message: "Token generation failed" });
            }
    
            // Return the user-details
            const userDetails = await User.findByEmail(email);
            if (!userDetails) {
                return res.status(404).json({ message: "User not found" });
            }
    
            res.cookie('token', result.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 3600000,
                path: '/' // Root path ensures cookie is sent for all routes
            });
            
    
            res.status(200).json({
                message: "Login successful",
                user: userDetails,
                token: result.token
            });
    
        } catch (error) {
            console.error("Login error:", error); // Log the error for debugging
            res.status(400).json({
                message: error.message || "An error occurred during login"
            });
        }
    }
    ,

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
                message: "User not found and " + error.message
            });
        }
    }
}

module.exports = userController;