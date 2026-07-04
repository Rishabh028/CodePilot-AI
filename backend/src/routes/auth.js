import express from 'express';
import { register, login, getMe, logout, forgotPassword, googleAuth, updateProfile } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/google', googleAuth);
router.get('/me', authMiddleware, getMe);
router.put('/me', authMiddleware, updateProfile);
router.post('/logout', logout);
router.post('/forgot-password', forgotPassword);

export default router;
