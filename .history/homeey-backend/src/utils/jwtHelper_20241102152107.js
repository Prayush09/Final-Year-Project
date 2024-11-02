const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env; 

const jwtHelper = {

    generateToken(user_Id){
        return jwt.sign({
            id:userId
        }, JWT_SECRET);
    }
};

module.exports = jwtHelper;