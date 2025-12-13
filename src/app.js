import express from 'express';
import dotenv from 'dotenv';
import apiRoutes from './routes/index.js';
import { errorHandler } from './middleware/error.handler.js';

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use('/api/v1', apiRoutes);

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

// Global Error Handler (Must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Production server running on http://localhost:${PORT}/api/v1`);
});