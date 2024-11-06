const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');
const authMiddleware = require('../middlewares/auth')

//Route to find matches for user
router.post('/find', authMiddleware, matchController.findMatch);

//Route to get all the matches for a specific user by their ID
router.get('/getMatches', authMiddleware, matchController.getUserMatches);

//whenever the user wants to un-match, we can use the front-end query params to send the id to the route...
router.delete('/deleteMatch', authMiddleware, matchController.deleteMatch);

//TODO: FIND FUNCTION NEEDS TO BE OPTIMIZED FOR THE FIRST 20 People only...
//TODO: ADD ML, RIGHT NOW IT's RANDOM()
//DELETE AND GET ARE WORKING FINE!!!
//

module.exports = router;