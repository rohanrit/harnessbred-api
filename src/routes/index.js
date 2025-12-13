import { Router } from 'express';
import horseRoutes from './horse.routes.js';
import memberRoutes from './member.routes.js';

const router = Router();

router.use('/horses', horseRoutes);
router.use('/members', memberRoutes);
// You can add more routes here later, e.g., router.use('/users', userRoutes);

export default router;