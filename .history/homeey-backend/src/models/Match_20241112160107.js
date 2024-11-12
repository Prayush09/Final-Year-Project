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
    

        if (existingMatch.rows.length > 0) {
            throw new Error("Match already exists.");
        }
    
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
    },

    async updateMatch(user_id, matched_user_id){
       try{
        const matchResult = await pool.query(
            `SELECT * FROM matches WHERE user_id = $1 AND matched_user_id = $2`,
            [user_id, matched_user_id]
        );

        const match = matchResult.rows[0];

        if(match && match.status === 'pending'){
            const updateMatchResult = await pool.query(
                `UPDATE matches
                SET status = $1
                WHERE user_id = $2 AND matched_user_id = $3
                RETURNING *`,
                ['accepted', user_id, matched_user_id]
            );

            return updateMatchResult.rows[0];
        }
        else{
            console.log("Match is either not found or already accepted");
        }
       }catch(error){
        console.error("Error occurred during match update", error);
       }
    },


    async updateMatches(user_id) {
        try {
            const result = await pool.query(
                `DELETE FROM matches WHERE user_id = $1 RETURNING *`,
                [user_id]
            );
    
            // Check if any matches were deleted by confirming the result has rows
            if (result.rowCount > 0) {
                return true;
            }
    
            return false;
        } catch (error) {
            console.error("Error occurred while deleting all matches:", error);
            throw error; // Rethrow to handle it in the calling function
        }
    }
    
}

module.exports = Match;