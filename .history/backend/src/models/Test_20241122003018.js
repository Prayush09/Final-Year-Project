const  pool = require('../config/db');  // Assuming 'pool' is configured for PostgreSQL
console.log('pool:', pool);  // Log the pool object before the query

class Message {
    static async create({ senderId, receiverId, content}) {
        const { v4: uuidv4 } = require('uuid');

// Assuming senderId and receiverId are integers, but you want to use UUIDs
const senderId = uuidv4();  // Generate a UUID
const receiverId = uuidv4();  // Generate a UUID
const content = "Hello, This thing works!";

// SQL query with UUIDs
const query = `
  INSERT INTO messages (sender_id, receiver_id, content, created_at)
  VALUES ($1, $2, $3, NOW())
  RETURNING *`;

const values = [senderId, receiverId, content];

// Assuming you're using pool.query
pool.query(query, values)
  .then(res => {
    console.log('Message created:', res.rows[0]);
  })
  .catch(err => {
    console.error('Error sending message:', err);
  });

      }
    }      
module.exports = Message;
