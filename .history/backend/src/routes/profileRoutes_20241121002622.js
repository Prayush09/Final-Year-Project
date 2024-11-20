const express = require('express');
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/create', authMiddleware, profileController.createProfile);

router.get('/', profileController.getProfile);

// TODO: Refine the update function to only modify fields that have been provided for update.
// Currently, if any field is omitted, it is set to NULL, which is not desired.
// Ensure that only specified fields are updated while retaining existing values for fields not included in the update request.

router.put('/update', authMiddleware, profileController.updateProfile);

router.delete('/delete', authMiddleware, profileController.deleteProfile);

module.exports = router;