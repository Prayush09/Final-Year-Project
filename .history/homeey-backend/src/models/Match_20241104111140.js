const pool = require('../config/db');

const Match = {
    async createMatch(user_id, matched_user_id, score, status){
        const result = await pool.query(
            `INSERT INTO matches (user_id, matched_user_id, match_score, status, matched_at)
            VALUES ($1, $2, $3, $4, NOW())
            RETURNING *`
        )
    }
}