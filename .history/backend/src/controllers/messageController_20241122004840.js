const MessagingService = require('../services/messagingService');
const messagingService = new MessagingService();

class MessageController {
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
      console.error('Error in sendMessage:', error);
      res.status(500).json({ error: error.message });
    }
  }

  async getConversation(req, res) {
    try {
      const { userId1, userId2 } = req.params;
  
      if (!userId1 || !userId2) {
        return res.status(400).json({ error: 'Both user IDs are required.' });
      }
  
      // Fetch conversation
      const messages = await messagingService.getConversation(userId1, userId2);
  
      // Respond with an empty array if no messages are found
      if (!messages || messages.length === 0) {
        return res.status(200).json({ messages: [], message: 'No conversation data found yet. Start messaging!' });
      }
      
      res.json({ messages });
    } catch (error) {
      console.error('Error in getConversation:', error);
      res.status(500).json({ error: error.message });
    }
  }
  

  async markAsRead(req, res) {
    try {
      const { senderId, receiverId } = req.body;
      
      if (!senderId || !receiverId) {
        return res.status(400).json({ error: 'Both sender and receiver IDs are required' });
      }

      const updatedMessages = await messagingService.markMessagesAsRead(senderId, receiverId);
      res.json({ messages: updatedMessages });
    } catch (error) {
      console.error('Error in markAsRead:', error);
      res.status(500).json({ error: error.message });
    }
  }

  async getUnreadCount(req, res) {
    try {
      const { userId } = req.params;
      
      if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
      }

      const count = await messagingService.getUnreadCount(userId);
      res.json({ count });
    } catch (error) {
      console.error('Error in getUnreadCount:', error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = MessageController;