import express from 'express';
import apiRoutes from './routes/index.js';
import { errorHandler } from './middleware/error.handler.js';

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

export default app;
