import express from 'express';
import { 
  register, 
  login, 
  forgotPassword, 
  getUserProfile 
} from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/signup', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);

router.get('/userprofile', protect, getUserProfile);

export default router;