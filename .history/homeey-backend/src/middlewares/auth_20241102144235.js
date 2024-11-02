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
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if(err){
            return res.status(403).json({
                message: "Invalid Token"
            })
        }

        req.user = decoded; //storing decoded info in request body
        next();
    })
}


module.exports = auth;