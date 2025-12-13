import { Router } from 'express';
import { getAllHorses, createHorse, getPedigree } from '../controllers/horse.controller.js';

const router = Router();

router.get('/', getAllHorses);
router.post('/', createHorse);
router.get('/:id/pedigree', getPedigree);

export default router;