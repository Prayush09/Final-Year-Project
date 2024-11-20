const express = require('express');
const router = express.Router();
const MessageController = require('../controllers/messageController');
const auth = require('../middleware/auth');

const messageController = new MessageController();

// Send a new message
router.post('/send', auth, (req, res) => messageController.sendMessage(req, res));

// Get conversation history between two users
router.get('/conversation/:userId1/:userId2', auth, (req, res) => 
  messageController.getConversation(req, res)
);

// Mark messages as read
router.post('/mark-read', auth, (req, res) => messageController.markAsRead(req, res));

// Get unread message count
router.get('/unread/:userId', auth, (req, res) => 
  messageController.getUnreadCount(req, res)
);

module.exports = router;