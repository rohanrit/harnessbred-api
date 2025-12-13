import pool from '../config/db.js';

export const getAllMembers = async (req, res, next) => {
    try {
        const [rows] = await pool.query('SELECT * FROM members ORDER BY ID ASC LiMIT 100');
        res.json(rows);
    } catch (err) {
        next(err); // Passes error to the global handler
    }
};

