const express = require('express');
const router = express.Router();
const userController = require('./controllers/userContoller');

router.post('/register', userController.registerUser);

