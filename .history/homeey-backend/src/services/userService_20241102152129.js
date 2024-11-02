const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwtHelper = require('../utils/jwtHelper');

const userService = {
    async register(userDetails){
        userDetails.password = await bcrypt.hash(userDetails.password, 10);
        return User.createUser(userDetails);
    },

    async login(email, password){
        const user = await User.findByEmail(email);



        if(!user){
            throw new Error('User not found');
        }

        const isMatch = await User.comparePassword(password, user.password_hash);

        if(!isMatch){
            throw new Error('Invalid password');
        }
        console.log(user);
        //generate JWT token
        const token = jwtHelper.generateToken(user.id);

        return {user, token};
    }
}

module.exports = userService;