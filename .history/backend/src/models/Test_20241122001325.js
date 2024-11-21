const { pool } = require('../config/db');  // Assuming 'pool' is configured for PostgreSQL
console.log('pool:', pool);  // Log the pool object before the query

class Message {
    static async create({ senderId, receiverId, content}) {
        if (!senderId || !receiverId || !content) {
          throw new Error('senderId, receiverId, and content are required.');
        }
      
        const query = `
          INSERT INTO messages (sender_id, receiver_id, content, created_at, read)
          VALUES ($1, $2, $3, NOW())  -- Pass read as a parameter
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
    }      
module.exports = Message;
