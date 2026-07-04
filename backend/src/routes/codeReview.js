import express from 'express';
import { getCodeReviews, createCodeReview, updateCodeReview } from '../controllers/codeReviewController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getCodeReviews);
router.post('/', createCodeReview);
router.put('/:id', updateCodeReview);

export default router;
