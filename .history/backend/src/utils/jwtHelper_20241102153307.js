const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env; 

const jwtHelper = {

    generateToken(user_Id){
        return jwt.sign({
            id: user_Id
        }, JWT_SECRET);
    }
};

module.exports = jwtHelper;