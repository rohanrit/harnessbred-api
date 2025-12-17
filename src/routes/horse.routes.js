import { Router } from 'express';
import {getAllHorses, getRealHorses, getHypoHorses, getPedigree} from '../controllers/horse.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', getAllHorses);
router.get('/real', getRealHorses);
router.get('/hypo', getHypoHorses);
router.get('/:id/pedigree', protect, getPedigree);

// If you want to protect ALL routes in this file:
// router.use(protect); // Apply to everything below
// router.get('/', getAllHorses);
// router.get('/search', getSearchHorses);

export default router;