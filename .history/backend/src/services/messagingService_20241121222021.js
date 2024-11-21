const Message = require('../models/Message.js');

class MessagingService {
    async saveMessage(senderId, receiverId, content) {
        try {
            if (!senderId || !receiverId || !content) {
                throw new Error('All fields (senderId, receiverId, content) are required');
            }

            const message = await Message.create({ senderId, receiverId, content });

            if (!message) {
                throw new Error('Failed to save message');
            }

            return message;
        } catch (error) {
            console.error(`Error saving message: ${error.message}`);
            throw error;
        }
    }

    async getConversation(userId1, userId2, limit = 50) {
        try {
            const messages = await Message.getConversation(userId1, userId2, limit);
            if (!messages.length) {
                console.warn(`No conversation found between userId1: ${userId1} and userId2: ${userId2}`);
            }
            return messages;
        } catch (error) {
            console.error(`Error fetching conversation: ${error.message}`);
            throw error;
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

module.exports = MessagingService;