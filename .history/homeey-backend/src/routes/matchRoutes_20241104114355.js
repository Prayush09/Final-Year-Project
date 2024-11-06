const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');

//Route to find matches for user
router.post('/find', match)