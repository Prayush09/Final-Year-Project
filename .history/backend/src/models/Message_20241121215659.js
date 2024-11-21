const { pool } = require('../config/database.js');

class Message {
  static async create({ senderId, receiverId, content }) {
    const query = `
      INSERT INTO messages (sender_id, receiver_id, content)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const values = [senderId, receiverId, content];
    
    try {
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      throw new Error(`Error creating message: ${error.message}`);
    }
  }

  static async getConversation(userId1, userId2, limit = 50) {
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
      return rows.reverse();
    } catch (error) {
      throw new Error(`Error fetching conversation: ${error.message}`);
    }
  }

  static async markAsRead(senderId, receiverId) {
    const query = `
      UPDATE messages
      SET read = true
      WHERE sender_id = $1 AND receiver_id = $2 AND read = false
    `;
    const values = [senderId, receiverId];

    try {
      await pool.query(query, values);
    } catch (error) {
      throw new Error(`Error marking messages as read: ${error.message}`);
    }
  }

  static async getUnreadCount(userId) {
    const query = `
      SELECT COUNT(*)
      FROM messages
      WHERE receiver_id = $1 AND read = false
    `;
    const values = [userId];

    try {
      const { rows } = await pool.query(query);
      return parseInt(rows[0].count);
    } catch (error) {
      throw new Error(`Error getting unread count: ${error.message}`);
    }
  }
}

export default Message;