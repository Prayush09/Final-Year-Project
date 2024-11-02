// jwtHelper.js
const jwtHelper = {
    generateToken(user_Id){
        return jwt.sign({ user_id: user_Id }, JWT_SECRET); // set as user_id
    }
};
