const express = require('express');
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/create', authMiddleware, profileController.createProfile);

router.get('/', authMiddleware, profileController.getProfile);

//TODO: MAKE THE UPDATE FUNCTION UPDATE ONLY THOSE FIELDS THAT REQUIRE AN UPD
router.put('/update', authMiddleware, profileController.updateProfile);

router.delete('/delete', authMiddleware, profileController.deleteProfile);

module.exports = router;