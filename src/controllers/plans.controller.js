import pool from '../config/db.js';

export const getAllPlans = async (req, res, next) => {
    try {
        const [rows] = await pool.query('SELECT p.plan_id, p.name, p.features, p.overview, p.status, p.`order`, p.modified_on, p.created_on, pr.pricing_id, pr.currency, pr.tenure, pr.price, pr.created_on AS pricing_created_on FROM plans p LEFT JOIN plan_pricing pr ON p.plan_id = pr.plan_id ORDER BY plan_id DESC LiMIT 100');
        res.json(rows);
    } catch (err) {
        next(err);
    }
};

