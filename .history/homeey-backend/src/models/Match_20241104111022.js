const pool = require('../config/db');

const Match = {
    async createMatch(user_id, matched_user_id, score, status){
        const result = await pool.query(
            `INSERT INTO matches (user_id, matched_user_id)`
        )
    }
}