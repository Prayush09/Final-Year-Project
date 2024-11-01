const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.registerUser);

router.post('/login', userController.login);

//testing route
router.post('/protected', auth, (req, res) => {
    
})

module.exports = router;