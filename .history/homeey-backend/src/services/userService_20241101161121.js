const User = require('../models/User');
const hashPassword = require('../utils/hashPassword')
const bcrypt = require('bcryptjs');
const jwtHelper = require('../utils/jwtHelper');

const userService = {
    async register(userDetails){
        userDetails.password = await hashPassword
        return User.createUser(userDetails);
    },

    async login(email, password){
        const user = await User.findByEmail(email);

        if(!user){
            throw new Error('User not found');
        }

        const isMatch = await user.comparePassword(password, user.password);

        if(!isMatch){
            throw new Error('Invalid password');
        }

        //generate JWT token
        const token = jwtHelper.generateToken(user.id);
        return {user, token};
    }
}

module.exports = userService;