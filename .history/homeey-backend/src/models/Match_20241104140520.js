const pool = require('../config/db');

const Match = {
    //a new match
    async createMatch(user_id, matched_user_id, score, status) {
        const existingMatch = await o.query(
            'SELECT * FROM matches WHERE user_id = $1 AND matched_user_id = $2',
            [user_id, matched_user_id]
        );
    
        if (existingMatch.rows.length > 0) {
            throw new Error("Match already exists.");
        }
    
        const result = await db.query(
            'INSERT INTO matches (user_id, matched_user_id, score, status) VALUES ($1, $2, $3, $4) RETURNING *',
            [user_id, matched_user_id, score, status]
        );
    
        if (!result || !result.rows || result.rows.length === 0) {
            throw new Error("Failed to create match.");
        }
    
        return result.rows[0];
    }
    ,

    //getting all matches for a user
    async getMatchesByUserId(user_id){
        const result = await pool.query(
            `SELECT * FROM matches WHERE user_id = $1 OR matched_user_id = $1`,
            [user_id]
        );

        return result.rows; //return all matches found.
    },

    //delete a match for a user
    async deleteMatchesByUserId(user_id, matched_user_id){
        const result = await pool.query(
            `DELETE FROM matches 
            WHERE (user_id = $1 AND matched_user_id = $2)
            OR (user_id = $2 AND matched_user_id = $1)
            RETURNING *`,
            [user_id, matched_user_id]
        );

        if(result.rows[0] === 0) throw new Error('No match found to delete');

        return result.rows[0];
    }
}

module.exports = Match;