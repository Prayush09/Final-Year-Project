const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.registerUser);

router.post('/login', userController.login);

//testing route
router.post('/protected', auth, (req, res) => {
    res.status(200).json({
        message: "THIS IS A PROTECTED ROUTE", user: user.
    })
})

module.exports = router;