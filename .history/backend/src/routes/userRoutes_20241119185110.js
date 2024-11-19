const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth')

router.post('/register', userController.registerUser);

router.post('/login', userController.login);

router.get('/userId', userController.getUserId);

//testing route
router.delete('/delete', authMiddleware, userController.delete)

module.exports = router;