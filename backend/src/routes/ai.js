import express from 'express';
import { invokeLLM, getStatus } from '../controllers/aiController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/status', getStatus); // Expose status before auth for easy checking, or keep it open

router.use(authMiddleware);

router.post('/invoke-llm', invokeLLM);

export default router;
