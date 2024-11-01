const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    return bcrypt.hash(password, 10);
}