import express from 'express';
import { getAgentRuns, createAgentRun, updateAgentRun } from '../controllers/agentRunController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getAgentRuns);
router.post('/', createAgentRun);
router.put('/:id', updateAgentRun);

export default router;
