import express from 'express';
<<<<<<< HEAD
=======
import cors from 'cors';
import dotenv from 'dotenv';
>>>>>>> 01c6bc694fc0a552dd09a4e4ae0fdf11445e7f87
import apiRoutes from './routes/index.js';
import { errorHandler } from './middleware/error.handler.js';

const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [];
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.error(`Blocked by CORS: ${origin}`);
            callback(new Error('Not allowed by CORS security policy'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};
app.use(cors(corsOptions));

app.use(express.json());

app.use('/api/v1', apiRoutes);

app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.use(errorHandler);

export default app;
