const Message = require('../models/Message');

class MessagingService {
  // Save a new message to the database
  async saveMessage(senderId, receiverId, content) {
    try {
      const message = new Message({
        senderId,
        receiverId,
        content
      });
      await message.save();
      return message;
    } catch (error) {
      throw new Error('Error saving message: ' + error.message);
    }
  }

  // Get conversation history between two users
  async getConversation(userId1, userId2, limit = 50) {
    try {
      const messages = await Message.find({
        $or: [
          { senderId: userId1, receiverId: userId2 },
          { senderId: userId2, receiverId: userId1 }
        ]
      })
      .sort({ timestamp: -1 })
      .limit(limit)
      .lean();
      
      return messages.reverse();
    } catch (error) {
      throw new Error('Error fetching conversation: ' + error.message);
    }
  }

  // Mark messages as read
  async markMessagesAsRead(senderId, receiverId) {
    try {
      await Message.updateMany(
        { senderId, receiverId, read: false },
        { $set: { read: true } }
      );
    } catch (error) {
      throw new Error('Error marking messages as read: ' + error.message);
    }
  }

  // Get unread message count
  async getUnreadCount(userId) {
    try {
      return await Message.countDocuments({
        receiverId: userId,
        read: false
      });
    } catch (error) {
      throw new Error('Error getting unread count: ' + error.message);
    }
  }
}