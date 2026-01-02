import { Router } from 'express';
import { protect, authorize } from '../middleware/auth.middleware.js';
import { getAllHorses, getRealHorses, getHypoHorses, getPedigree, addHorse, updateHorse, deleteHorse } from '../controllers/horse.controller.js';

const router = Router();

router.get('/', getAllHorses);
router.get('/real', getRealHorses);
router.get('/hypo', getHypoHorses);

// PROTECTED ROUTES (Requires valid JWT)
// These routes will now trigger the Login Modal on your frontend if the token is missing/expired
router.get('/:id/pedigree', protect, getPedigree);
router.post('/', protect, addHorse);
router.put('/:id', protect, updateHorse);
router.delete('/:id', protect, authorize('admin'), deleteHorse);

// If you want to protect ALL routes in this file:
// router.use(protect); // Apply to everything below
// router.get('/', getAllHorses);
// router.get('/search', getSearchHorses);

export default router;