import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

// Create the connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

/**
 * Utility function to close the database pool
 */
export const disconnectDB = async () => {
    try {
        await pool.end();
        console.log('Database pool closed.');
    } catch (err) {
        console.error('Error closing database pool:', err);
    }
};

export default pool;