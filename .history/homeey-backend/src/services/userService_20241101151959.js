const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwtHelper = require('../utils/jwtHelper');

const userService = {
    async register(userDetails){
        userDetails.password = await bcrypt.hash(userDetails.password, 10);
        return User.createUser(userDetails);
    },

    async login(email, password){
        const user = await.findByEmail(email);

        if(!user){
            throw new Error('User not found');
        }

        const isMatch = await user.comparePassword(password, user.password);

        if(!isMatch){
            throw new Error('Invalid password');
        }

        //generate JWT token
        const token = jwtHelper.generateToken()
    }
}

module.exports = userService;