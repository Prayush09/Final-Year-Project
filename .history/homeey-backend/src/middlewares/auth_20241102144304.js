const jwt = require('jsonwebtoken');
const {JWT_SECRET} = process.env;

const auth = (req, res, next) => {
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message: "Authorization Token is required"
        })
    }
    try{}
    
}


module.exports = auth;