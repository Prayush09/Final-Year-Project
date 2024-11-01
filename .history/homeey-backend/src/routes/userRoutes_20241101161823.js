const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth')

router.post('/register', userController.registerUser);

router.post('/login', userController.login);

//testing route
router.post('/protected', authMiddleware, (req, res) => {
    res.status(200).json({
        message: "THIS IS A PROTECTED ROUTE", user: req.user
    });
})

module.exports = router;