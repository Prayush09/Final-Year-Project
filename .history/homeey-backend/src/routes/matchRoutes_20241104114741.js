const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');

//Route to find matches for user
router.post('/find', matchController.findMatches);

//Route to get all the matches for a specific user by their ID
router.get('/getMatches', matchController.getUserMatches);

//whenever the user wants to unmatch, we can use the front-end query params to send the id to the route...
router.delete('/deleteMatch/:id', matchController.)

module.exports = router;