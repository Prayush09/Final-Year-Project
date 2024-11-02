const express = require('express');
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/createProfile', authMiddleware, profileController.createProfile);

router.get('/profile', authMiddleware, profileController.getProfile);

router.put('/updateProfile', authMiddleware, profileController.updateProfile);

router.delete('/', authMiddleware, profileController.deleteProfile);