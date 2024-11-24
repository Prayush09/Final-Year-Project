const pool = require('../config/db');

const Match = {
    
    async createMatch(user_id, matched_user_id, score, status) {
        // Start a transaction to ensure atomicity
        const client = await pool.connect();
    
        try {
            await client.query('BEGIN');
    
            // Check if the match already exists in either direction
            const existingMatch = await client.query(
                `SELECT * FROM matches 
                 WHERE (user_id = $1 AND matched_user_id = $2)
                    OR (user_id = $2 AND matched_user_id = $1)`,
                [user_id, matched_user_id]
            );
    
            if (existingMatch.rows.length > 0) {
                throw new Error("Match already exists.");
            }
    
            // Insert the match from user_id to matched_user_id
            await client.query(
                `INSERT INTO matches (user_id, matched_user_id, match_score, status, matched_at)
                 VALUES ($1, $2, $3, $4, NOW())`,
                [user_id, matched_user_id, score, status]
            );
    
            // Insert the reciprocal match from matched_user_id to user_id
            await client.query(
                `INSERT INTO matches (user_id, matched_user_id, match_score, status, matched_at)
                 VALUES ($1, $2, $3, $4, NOW())`,
                [matched_user_id, user_id, score, status]
            );
    
            // Commit the transaction
            await client.query('COMMIT');
    
            return { success: true, message: "Match created successfully." };
    
        } catch (error) {
            // Rollback the transaction in case of any error
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    },

    // Get all matches for a user
    async getMatchesByUserId(user_id) {
        const result = await pool.query(
            `SELECT * FROM matches WHERE user_id = $1`,
            [user_id]
        );
        return result.rows; // Return all matches found.
    },

    // Delete a match for a user
    async deleteMatchesByUserId(user_id, matched_user_id) {
        const result = await pool.query(
            `DELETE FROM matches 
            WHERE (user_id = $1 AND matched_user_id = $2)
            OR (user_id = $2 AND matched_user_id = $1)
            RETURNING *`,
            [user_id, matched_user_id]
        );

        if (result.rows.length === 0) throw new Error('No match found to delete');

        return result.rows[0];
    },

    // Accept a match
    async acceptMatch(user_id, matched_user_id) {
        try {
            const matchResult = await pool.query(
                `SELECT * FROM matches WHERE user_id = $1 AND matched_user_id = $2`,
                [user_id, matched_user_id]
            );

            const match = matchResult.rows[0];

            if (match && match.status === 'pending') {
                const updateMatchResult = await pool.query(
                    `UPDATE matches
                    SET status = $1
                    WHERE user_id = $2 AND matched_user_id = $3
                    RETURNING *`,
                    ['accepted', user_id, matched_user_id]
                );

                return updateMatchResult.rows[0];
            } else {
                console.log("Match is either not found or already accepted or rejected");
            }
        } catch (error) {
            console.error("Error occurred during match update", error);
        }
    },

    // Reject a match
    async rejectMatch(user_id, matched_user_id) {
        try {
            const matchResult = await pool.query(
                `SELECT * FROM matches WHERE user_id = $1 AND matched_user_id = $2`,
                [user_id, matched_user_id]
            );

            const match = matchResult.rows[0];

            if (match && match.status === 'pending') {
                const updateMatchResult = await pool.query(
                    `UPDATE matches
                    SET status = $1
                    WHERE user_id = $2 AND matched_user_id = $3
                    RETURNING *`,
                    ['rejected', user_id, matched_user_id]
                );

                return updateMatchResult.rows[0];
            } else {
                console.log("Match is either not found or already rejected");
            }
        } catch (error) {
            console.error("Error occurred during match update", error);
        }
    },

    // Update all matches for a user (delete)
    async updateMatches(user_id) {
        try {
            const result = await pool.query(
                `DELETE FROM matches WHERE user_id = $1 RETURNING *`,
                [user_id]
            );

            if (result.rowCount > 0) {
                return true;
            }

            return false;
        } catch (error) {
            console.error("Error occurred while deleting all matches:", error);
            throw error; 
        }
    }
}

module.exports = Match;
