import { Router } from 'express';
import { getAllHorses, getSearchHorses, getPedigree } from '../controllers/horse.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', getAllHorses);
router.get('/search', getSearchHorses);
router.get('/:id/pedigree', getPedigree);

export default router;