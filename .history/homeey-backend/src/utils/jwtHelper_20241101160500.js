const { generateKey } = require('crypto');
const jwt = require('jsonwebtoken');

const jwtHelper = {
    generateToken(userId){
        return jwt.sign({
            id:
        }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        })
    }
}