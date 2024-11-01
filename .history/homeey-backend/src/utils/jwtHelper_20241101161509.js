
const jwt = require('jsonwebtoken');

const jwtHelper = {

    generateToken(userId){
        return jwt.sign({
            id:userId
        }, process.env.JWT_SECRET, {
            expiresIn: '1h' //token expiry time
        });
    }
};

module.exports = jwtHelper;