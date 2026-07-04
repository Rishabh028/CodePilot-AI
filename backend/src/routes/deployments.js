import express from 'express';
import { getDeployments, createDeployment, updateDeployment } from '../controllers/deploymentController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getDeployments);
router.post('/', createDeployment);
router.put('/:id', updateDeployment);

export default router;
