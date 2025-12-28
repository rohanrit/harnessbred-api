import pool from '../config/db.js';

export const getAllPlans = async (req, res, next) => {
    try {
        const [rows] = await pool.query('SELECT * FROM plans ORDER BY plan_id ASC');
        res.json(rows);
    } catch (err) {
        next(err);
    }
};

