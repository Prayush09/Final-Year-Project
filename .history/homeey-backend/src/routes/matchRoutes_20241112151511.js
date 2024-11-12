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

router.put('/updateMatches')
//DELETE AND GET ARE WORKING FINE!!!
//TODO: Optimize Delete function so that it deletes the user using query parameters, and not request body...

//TODO: Create an update function in which if a user's profile is updated then there match scores are updated.

module.exports = router;