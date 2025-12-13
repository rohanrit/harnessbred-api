import { Router } from 'express';
import { getAllHorses, createHorse, getPedigree } from '../controllers/horse.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', getAllHorses);
router.post('/', protect, createHorse);
router.get('/:id/pedigree', getPedigree);

export default router;