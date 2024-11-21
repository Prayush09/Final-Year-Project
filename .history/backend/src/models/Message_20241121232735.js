const { pool } = require('../config/db');

class Message {
  static async create({ senderId, receiverId, content }) {
    if (!senderId || !receiverId || !content) {
      throw new Error('senderId, receiverId, and content are required.');
    }
  
    const query = `
      INSERT INTO messages (sender_id, receiver_id, content, created_at)
      VALUES ($1, $2, $3, NOW())
      RETURNING *
    `;
    const values = [senderId, receiverId, content];
    
    try {
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      console.error(`Error in create: ${error.message} | Query: ${query} | Values: ${JSON.stringify(values)}`);
      throw new Error(`Error creating message: ${error.message}`);
    }
  }

  static async getConversation(userId1, userId2, limit = 50) {
    if (!userId1 || !userId2) {
      throw new Error('userId1 and userId2 are required.');
    }
  
    const query = `
      SELECT *
      FROM messages
      WHERE (sender_id = $1 AND receiver_id = $2)
         OR (sender_id = $2 AND receiver_id = $1)
      ORDER BY created_at DESC
      LIMIT $3
    `;
    const values = [userId1, userId2, limit];
  
    try {
      const { rows } = await pool.query(query, values);
      return rows; // Return rows, even if empty
    } catch (error) {
      console.error(`Error in getConversation: ${error.message}`);
      throw new Error(`Error fetching conversation: ${error.message}`);
    }
  }
  

  static async markAsRead(senderId, receiverId) {
    if (!senderId || !receiverId) {
      throw new Error('senderId and receiverId are required.');
    }
  
    const query = `
      UPDATE messages
      SET read = true
      WHERE sender_id = $1 AND receiver_id = $2 AND read = false
      RETURNING *
    `;
    const values = [senderId, receiverId];

    try {
      const { rows } = await pool.query(query, values);
      return rows;
    } catch (error) {
      console.error(`Error in markAsRead: ${error.message} | Query: ${query} | Values: ${JSON.stringify(values)}`);
      throw new Error(`Error marking messages as read: ${error.message}`);
    }
  }

  static async getUnreadCount(userId) {
    if (!userId) {
      throw new Error('userId is required to get unread count');
    }

    const query = `
      SELECT COUNT(*)::int as count
      FROM messages
      WHERE receiver_id = $1 AND read = false
    `;
    const values = [userId];

    try {
      const { rows } = await pool.query(query, values);
      return rows[0].count;
    } catch (error) {
      console.error(`Error in getUnreadCount: ${error.message} | Query: ${query} | Values: ${JSON.stringify(values)}`);
      throw new Error(`Error getting unread count: ${error.message}`);
    }
  }
}

module.exports = Message;