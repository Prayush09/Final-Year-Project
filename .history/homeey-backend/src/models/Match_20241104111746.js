const pool = require('../config/db');

const Match = {
    //a new match
    async createMatch(user_id, matched_user_id, score, status){
        const result = await pool.query(
            `INSERT INTO matches (user_id, matched_user_id, match_score, status, matched_at)
            VALUES ($1, $2, $3, $4, NOW())
            RETURNING *`,
            [
                user_id,
                matched_user_id,
                score,
                status
            ]
        )

        return result.row[0];//return the latest match added to the DB
    },

    //getting all matches for a user
    async getMatchesByUserId(user_id){
        const result = await pool.query(
            `SELECT * FROM matches WHERE user_id = $1 OR matched_user_id = $1`,
            [user_id]
        );

        return result.rows; //return all matches found.
    },

    //delete all matches for a user
    async deleteMatchesByUserId(user_id){
        const result = await pool.query(
            `DROP * FROM matches WHERE user_id = $1 OR matched_user_id = $1`,
            [user_id]
        );

        
    }
}