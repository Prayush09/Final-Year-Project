const pool = require('../config/db');

const Match = {
    //a new match
    async createMatch(user_id, matched_user_id, score, status) {
        // Check if the match already exists
        const existingMatch = await pool.query(
            `SELECT * FROM matches 
             WHERE user_id = $1 AND matched_user_id = $2`,
            [user_id, matched_user_id]
        );
    
        // If the match already exists, throw an error
        if (existingMatch.rows.length > 0) {
            throw new Error("Match already exists.");
        }
    
        // Insert the new match into the database
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
        );
    
        // Ensure that the result contains the expected row
        if (!result || !result.rows || result.rows.length === 0) {
            throw new Error("Failed to create match.");
        }
    
        // Return the latest match added to the database
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