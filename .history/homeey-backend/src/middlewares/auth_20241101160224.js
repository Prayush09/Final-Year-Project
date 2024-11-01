const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(401).json({
            message: "Authorization Token is required"
        })
    }

    
}