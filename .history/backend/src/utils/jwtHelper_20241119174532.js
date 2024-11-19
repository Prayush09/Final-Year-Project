const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
    return jwt.sign({ user_id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};
