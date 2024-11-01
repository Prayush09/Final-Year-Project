const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwtHelper

const userService = {
    async register(userDetails){
        userDetails.password = await bcrypt.hash(userDetails.password, 10);
        return User.createUser(userDetails);
    },

    async login(email, password){
        const user = await.findByEmail
    }
}

module.exports = userService;