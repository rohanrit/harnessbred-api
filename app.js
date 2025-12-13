import express from 'express';
import pool, { disconnectDB } from './db.js';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/test-db', async (req, res) => {
    try {
        // This query runs purely on the MySQL server
        const [rows] = await pool.query('SELECT NOW() as currentTime');
        res.json({
            message: "Database connection successful!",
            mysqlTime: rows[0].currentTime,
            dbUsed: process.env.DB_NAME
        });
    } catch (err) {
        res.status(500).json({
            message: "Database connection failed",
            error: err.message
        });
    }
});

// Example Route: Get all horses
app.get('/horses', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM horses');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start the server
const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

/**
 * Handle Shutdown (Disconnecting the DB)
 */
const gracefulShutdown = async () => {
    console.log('\nShutting down gracefully...');
    server.close(async () => {
        await disconnectDB(); // Properly close the MySQL pool
        process.exit(0);
    });
};

// Listen for termination signals
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);