const { pool } = require('../config/db');

class Message {
  static async create({ senderId, receiverId, content }) {
    if (!senderId || !receiverId || !content) {
      throw new Error('senderId, receiverId, and content are required.');
  }
  
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
      console.error(`Error in create: ${error.message} | Query: ${query} | Values: ${JSON.stringify(values)}`);
      throw new Error(`Error creating message: ${error.message}`);
  }
  
  }

  static async getConversation(userId1, userId2, limit = 50) {
    if (!userId1 || !userId2) {
      throw new Error('senderId, receiverId are required.');
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
      return rows[0];
  } catch (error) {
      console.error(`Error in create: ${error.message} | Query: ${query} | Values: ${JSON.stringify(values)}`);
      throw new Error(`Error creating message: ${error.message}`);
  }
  
  }

  static async markAsRead(senderId, receiverId) {
    if (!senderId || !receiverId ) {
      throw new Error('senderId, receiverId, and content are required.');
  }
  
    const query = `
      UPDATE messages
      SET read = true
      WHERE sender_id = $1 AND receiver_id = $2 AND read = false
    `;
    const values = [senderId, receiverId];

    try {
      const { rows } = await pool.query(query, values);
      return rows[0];
  } catch (error) {
      console.error(`Error in create: ${error.message} | Query: ${query} | Values: ${JSON.stringify(values)}`);
      throw new Error(`Error creating message: ${error.message}`);
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
      const { rows } = await pool.query(query, values);
      return rows[0];
  } catch (error) {
      console.error(`Error in create: ${error.message} | Query: ${query} | Values: ${JSON.stringify(values)}`);
      throw new Error(`Error creating message: ${error.message}`);
  }
  
  }
}

module.exports = Message;