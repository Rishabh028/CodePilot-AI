import express from 'express';
import { getSecurityIssues, createSecurityIssue, updateSecurityIssue } from '../controllers/securityController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getSecurityIssues);
router.post('/', createSecurityIssue);
router.put('/:id', updateSecurityIssue);

export default router;
