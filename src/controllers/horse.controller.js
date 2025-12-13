import pool from '../config/db.js';

export const getAllHorses = async (req, res, next) => {
    try {
        const [rows] = await pool.query('SELECT * FROM horses');
        res.json(rows);
    } catch (err) {
        next(err); // Passes error to the global handler
    }
};

export const createHorse = async (req, res, next) => {
    const { name, sex, sire_id, dam_id } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO horses (name, sex, sire_id, dam_id) VALUES (?, ?, ?, ?)',
            [name, sex, sire_id || null, dam_id || null]
        );
        res.status(201).json({ id: result.insertId, name });
    } catch (err) {
        next(err);
    }
};

export const getPedigree = async (req, res, next) => {
    const { id } = req.params;
    const sql = `
        SELECT h.id, h.name, h.sex,
               s.name AS sire_name, d.name AS dam_name
        FROM horses h
        LEFT JOIN horses s ON h.sire_id = s.id
        LEFT JOIN horses d ON h.dam_id = d.id
        WHERE h.id = ?`;
    try {
        const [rows] = await pool.query(sql, [id]);
        if (rows.length === 0) return res.status(404).json({ message: "Horse not found" });
        res.json(rows[0]);
    } catch (err) {
        next(err);
    }
};