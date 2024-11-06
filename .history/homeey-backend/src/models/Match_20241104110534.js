const pool = require('../config/db');

const Match = {
    async createMatch(user_id, matched_user_id, score){
        const result = await pool.query(
            `INSERT INTO matches`
        )
    }
}