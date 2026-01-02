import pool from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// --- HELPERS ---
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// --- CONTROLLERS ---

/**
 * Register a new user
 */
export const register = async (req, res, next) => {
    // 1. Destructure and Sanitize values
    let { username, email, password } = req.body;

    // Remove leading/trailing whitespace and lowercase the email
    username = username?.trim();
    email = email?.trim().toLowerCase();

    try {
        // 2. Validation Checks
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Email Format Validation (Regex)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        // 3. Check if user already exists
        const [existing] = await pool.query(
            'SELECT id FROM users WHERE username = ? OR email = ?', 
            [username, email]
        );
        
        if (existing.length > 0) {
            return res.status(400).json({ message: "Username or Email already taken" });
        }

        // 4. Hash and Save
        const hashedPassword = await bcrypt.hash(password, 12);
        
        const [result] = await pool.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)', 
            [username, email, hashedPassword]
        );

        const token = generateToken(result.insertId);

        res.status(201).json({ 
            message: "User created", 
            token,
            user: { id: result.insertId, username, email } 
        });
    } catch (err) { 
        next(err); 
    }
};

/**
 * Login user
 */
export const login = async (req, res, next) => {
    const { loginKey, password } = req.body; // loginKey can be username or email
    
    try {
        const [rows] = await pool.query(
            'SELECT * FROM users WHERE username = ? OR email = ?', 
            [loginKey, loginKey]
        );
        const user = rows[0];

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = generateToken(user.id);
            
            res.json({ 
                token, 
                user: { id: user.id, username: user.username, email: user.email } 
            });
        } else {
            res.status(401).json({ message: "Invalid username/email or password" });
        }
    } catch (err) { 
        next(err); 
    }
};

/**
 * Forgot Password (Request Reset)
 */
export const forgotPassword = async (req, res, next) => {
    const { email } = req.body;
    try {
        const [rows] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
        
        if (rows.length === 0) {
            // Security best practice: don't reveal if email exists or not
            return res.json({ message: "If this email is registered, a reset link has been sent." });
        }

        // Generate a short-lived token (1 hour) for the reset link
        const resetToken = jwt.sign({ id: rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // TODO: Integrate NodeMailer here to send: 
        // `https://yourapp.com/reset-password?token=${resetToken}`
        
        console.log(`Reset Token for ${email}: ${resetToken}`);
        
        res.json({ message: "Reset link sent to your email." });
    } catch (err) {
        next(err);
    }
};

/**
 * Get Me (Verify Token and return user data)
 */
export const getMe = async (req, res, next) => {
    try {
        // req.user.id is populated by your protect middleware
        const [rows] = await pool.query(
            'SELECT id, username, email FROM users WHERE id = ?', 
            [req.user.id]
        );
        res.json({ user: rows[0] });
    } catch (err) {
        next(err);
    }
};

/**
 * Get current user profile data
 * Path: /userprofile
 */
export const getUserProfile = async (req, res, next) => {
    try {
        // req.user.id is populated by the 'protect' middleware after verifying the JWT
        const userId = req.user.id;

        const [rows] = await pool.query(
            'SELECT id, username, email, created_at FROM users WHERE id = ?',
            [userId]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            success: true,
            user: rows[0]
        });
    } catch (err) {
        next(err);
    }
};