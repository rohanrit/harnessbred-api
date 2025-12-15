import { Router } from 'express';
import { getAllMembers } from '../controllers/member.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', getAllMembers);

export default router;