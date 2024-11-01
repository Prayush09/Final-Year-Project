const userService = require('../services/userService');

const userController = {
    async registerUser(req, res) {
        try{
            const user = await userService.register()
        }
    }
}