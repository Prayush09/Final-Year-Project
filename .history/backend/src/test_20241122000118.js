const express = require('express');
const router = express.Router();
const Message = require('./models');  // Assuming your message model is in 'models/message.js'

// POST route to create a message
router.post('/send-message', async (req, res) => {
    const { senderId, receiverId, content } = req.body;

    try {
        // Call the static method to create a message
        const newMessage = await Message.create({ senderId, receiverId, content });
        res.status(200).json({ success: true, message: newMessage });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ success: false, message: 'Failed to send message' });
    }
});

module.exports = router;
