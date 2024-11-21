const { pool } = require('../config/db');

class Message {
  static async create({ senderId, receiverId, content }) {
    if (!senderId || !receiverId || !content) {
      throw new Error('senderId, receiverId, and content are required.');
    }

    try {
      const result = await pool.query(
        `INSERT INTO messages (sender_id, receiver_id, content, created_at)
         VALUES ($1, $2, $3, NOW())
         RETURNING *`,
        [senderId, receiverId, content]
      );
      return result.rows[0]; // Return the newly created message
    } catch (error) {
      console.error('Error in create:', error.message);
      throw new Error('Could not create message, please try again');
    }
  }

  static async getConversation(userId1, userId2, limit = 50) {
    if (!userId1 || !userId2) {
      throw new Error('userId1 and userId2 are required.');
    }

    try {
      const result = await pool.query(
        `SELECT *
         FROM messages
         WHERE (sender_id = $1 AND receiver_id = $2)
            OR (sender_id = $2 AND receiver_id = $1)
         ORDER BY created_at DESC
         LIMIT $3`,
        [userId1, userId2, limit]
      );
      return result.rows; // Return rows, even if empty
    } catch (error) {
      console.error('Error in getConversation:', error.message);
      throw new Error('Error fetching conversation, please try again');
    }
  }

  static async markAsRead(senderId, receiverId) {
    if (!senderId || !receiverId) {
      throw new Error('senderId and receiverId are required.');
    }

    try {
      const result = await pool.query(
        `UPDATE messages
         SET read = true
         WHERE sender_id = $1 AND receiver_id = $2 AND read = false
         RETURNING *`,
        [senderId, receiverId]
      );
      return result.rows; // Return updated messages
    } catch (error) {
      console.error('Error in markAsRead:', error.message);
      throw new Error('Error marking messages as read, please try again');
    }
  }

  static async getUnreadCount(userId) {
    if (!userId) {
      throw new Error('userId is required.');
    }

    try {
      const result = await pool.query(
        `SELECT COUNT(*)::int as count
         FROM messages
         WHERE receiver_id = $1 AND read = false`,
        [userId]
      );
      return result.rows[0].count; // Return unread message count
    } catch (error) {
      console.error('Error in getUnreadCount:', error.message);
      throw new Error('Error fetching unread count, please try again');
    }
  }
}

module.exports = Message;
