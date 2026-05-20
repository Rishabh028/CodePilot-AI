import express from 'express';
import { runAgent, getAgents } from '../controllers/agentController.js';

const router = express.Router();

// List all available agents
router.get('/', getAgents);

// Run an agent
router.post('/run', runAgent);

export default router;
