import { Router } from 'express';
import { getAllPlans } from '../controllers/plans.controller.js';

const router = Router();

router.get('/', getAllPlans);

export default router;