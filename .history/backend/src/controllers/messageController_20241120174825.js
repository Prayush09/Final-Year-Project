const MessagingService = require('../services/messagingService');
const messagingService = new MessagingService();

class MessageController {
  // Send a new message
  async sendMessage(req, res) {
    try {
      const { senderId, receiverId, content } = req.body;
      
      if (!senderId || !receiverId || !content) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const message = await messagingService.saveMessage(senderId, receiverId, content);
      
      // Emit the message through socket.io
      req.app.get('io').to(receiverId).emit('newMessage', message);
      
      res.status(201).json({ message });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get conversation history
  async getConversation(req, res) {
    try {
      const { userId1, userId2 } = req.params;
      const messages = await messagingService.getConversation(userId1, userId2);
      res.json({ messages });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Mark messages as read
  async markAsRead(req, res) {
    try {
      const { senderId, receiverId } = req.body;
      await messagingService.markMessagesAsRead(senderId, receiverId);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get unread message count
  async getUnreadCount(req, res) {
    try {
      const { userId } = req.params;
      const count = await messagingService.getUnreadCount(userId);
      res.json({ count });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
