const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');

//Route to find matches for user
router.post('/find', matchController.findMatches);

//Route to get all the matches for a specific user by their ID
router.get('/user/:id', matchController.getUserMatches);

router.delete('/user/')

module.exports = router;