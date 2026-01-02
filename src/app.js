import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/error.handler.js';
import horseSearchRoutes from './routes/horseSearchRoutes.routes.js';
import horseRoutes from './routes/horse.routes.js';
import plansRoutes from './routes/plans.routes.js';
import memberRoutes from './routes/member.routes.js';
import authRoutes from './routes/auth.routes.js';
import { protect } from './middleware/auth.middleware.js';

const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim())
  : ['http://localhost:8001'];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked: ${origin}`);
      callback(new Error('Not allowed by CORS policy'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'API is running successfully', timestamp: new Date().toISOString() });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/horsesearch', horseSearchRoutes);
app.use('/api/v1/horses', horseRoutes);
app.use('/api/v1/plans', plansRoutes);
app.use('/api/v1/members', protect, memberRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found', path: req.originalUrl });
});

app.use(errorHandler);

export default app;