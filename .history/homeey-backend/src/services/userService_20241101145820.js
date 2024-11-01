const User = require('../models/User');
const bcrypt = require('bcryptjs');

const userService = {
    async register(userDetails){
        userDetails.password = await bcrypt.hash(userDetails.password, 10);
        return User.crea
    }
}