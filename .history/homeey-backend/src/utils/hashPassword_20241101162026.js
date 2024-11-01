const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    try{
        return await bcrypt.hash(password, 10);
    } catch(err)
}

module.exports = hashPassword;