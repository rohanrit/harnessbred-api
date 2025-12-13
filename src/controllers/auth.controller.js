import pool from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
        res.status(201).json({ message: "User created" });
    } catch (err) { next(err); }
};

export const login = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        const user = rows[0];

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
            res.json({ token });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (err) { next(err); }
};