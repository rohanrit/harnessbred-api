import { Router } from 'express';
import {getSearchHorses} from '../controllers/horse.controller.js';

const router = Router();

router.get('/', getSearchHorses);

export default router;