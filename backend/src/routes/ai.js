import express from 'express';
import { invokeLLM } from '../controllers/aiController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/invoke-llm', invokeLLM);

export default router;
