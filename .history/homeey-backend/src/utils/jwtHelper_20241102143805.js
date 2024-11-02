const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env; 

const jwtHelper = {

    generateToken(userId){
        return jwt.sign({
            id:userId
        }, JWT_SECRET);
    }
};

module.exports = jwtHelper;