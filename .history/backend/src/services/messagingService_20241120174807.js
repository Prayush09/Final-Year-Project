import Message from '../models/Message.js';

class MessagingService {
  async saveMessage(senderId, receiverId, content) {
    try {
      return await Message.create({ senderId, receiverId, content });
    } catch (error) {
      throw new Error('Error saving message: ' + error.message);
    }
  }

  async getConversation(userId1, userId2, limit = 50) {
    try {
      return await Message.getConversation(userId1, userId2, limit);
    } catch (error) {
      throw new Error('Error fetching conversation: ' + error.message);
    }
  }

  async markMessagesAsRead(senderId, receiverId) {
    try {
      await Message.markAsRead(senderId, receiverId);
    } catch (error) {
      throw new Error('Error marking messages as read: ' + error.message);
    }
  }

  async getUnreadCount(userId) {
    try {
      return await Message.getUnreadCount(userId);
    } catch (error) {
      throw new Error('Error getting unread count: ' + error.message);
    }
  }
}

export default MessagingService;