import express from 'express';
import { getTestSuites, createTestSuite, updateTestSuite } from '../controllers/testingController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getTestSuites);
router.post('/', createTestSuite);
router.put('/:id', updateTestSuite);

export default router;
