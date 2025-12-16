import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { errorHandler } from './middleware/error.handler.js';
import horseSearchRoutes from './routes/horseSearchRoutes.routes.js';
import horseRoutes from './routes/horse.routes.js';
import memberRoutes from './routes/member.routes.js';

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

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith('Bearer ')
    ? authHeader.split(' ')[1]
    : null;

  if (!token) {
    return res.status(401).json({ message: 'Access denied: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    return res.status(403).json({ message: 'Invalid token' });
  }
};

app.get('/', (req, res) => {
  res.json({ 
    message: 'API is running successfully',
    timestamp: new Date().toISOString()
  });
});

app.post('/login', (req, res) => {
  const { username, role, domain } = req.body;

  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }

  const payload = {
    sub: username,
    role: role || 'user',
    domain: domain || 'general'
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ 
    message: 'Login successful',
    token,
    user: { username, role: payload.role, domain: payload.domain }
  });
});

app.use('/api/v1/horsesearh', horseSearchRoutes);
app.use('/api/v1/horses', authenticateToken, horseRoutes);
app.use('/api/v1/members', authenticateToken, memberRoutes);

app.use((req, res) => {
  res.status(404).json({ 
    message: 'Route not found',
    path: req.originalUrl 
  });
});

app.use(errorHandler);

export default app;