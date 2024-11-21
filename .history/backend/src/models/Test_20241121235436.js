const { pool } = require('../config/db');  // Assuming 'pool' is configured for PostgreSQL

class Message {
  static async create({ senderId, receiverId, content }) {
    if (!senderId || !receiverId || !content) {
      throw new Error('senderId, receiverId, and content are required.');
    }

    const query = `
      INSERT INTO messages (sender_id, receiver_id, content, created_at)
      VALUES ($1, $2, $3, NOW())
      RETURNING *`;
    const values = [senderId, receiverId, content];

    try {
      const { rows } = await pool.query(query, values);
      return rows[0]; // Return the newly created message
    } catch (error) {
      console.error('Error in create:', error.message);
      throw new Error('Could not create message, please try again');
    }
  }

  // Other methods like getConversation, markAsRead, etc., go here

}

module.exports = Message;
