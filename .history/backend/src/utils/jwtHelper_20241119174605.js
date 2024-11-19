const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env; 

const jwtHelper = {
    generateToken(userId){
        return jwt.sign({ user_id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    }
};

module.exports = jwtHelper;