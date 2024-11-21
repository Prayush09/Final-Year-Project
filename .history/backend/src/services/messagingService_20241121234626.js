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
            return messages; // Return all messages
        } catch (error) {
            console.error(`Error fetching conversation: ${error.message}`);
            throw error;
        }
    }

    async markMessagesAsRead(senderId, receiverId) {
        try {
            const updatedMessages = await Message.markAsRead(senderId, receiverId);
            return updatedMessages;
        } catch (error) {
            console.error(`Error marking messages as read: ${error.message}`);
            throw error;
        }
    }
    
    async getUnreadCount(userId) {
        try {
            const count = await Message.getUnreadCount(userId);
            return count;
        } catch (error) {
            console.error(`Error getting unread count: ${error.message}`);
            throw error;
        }
    }
}

module.exports = MessagingService;