import { Router } from 'express';
import horseRoutes from './horse.routes.js';

const router = Router();

router.use('/horses', horseRoutes);
// You can add more routes here later, e.g., router.use('/users', userRoutes);

export default router;