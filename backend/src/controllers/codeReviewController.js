import { getPrismaClient } from '../config/database.js';

const prisma = getPrismaClient();

export const getCodeReviews = async (req, res) => {
  try {
    const reviews = await prisma.codeReview.findMany({
      where: { userId: req.user.userId },
      orderBy: { createdAt: 'desc' }
    });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch code reviews' });
  }
};

export const createCodeReview = async (req, res) => {
  try {
    const { pullRequestUrl, title, description, code, project_id } = req.body;
    const review = await prisma.codeReview.create({
      data: {
        pullRequestUrl: pullRequestUrl || '',
        title,
        description,
        code,
        review: '',
        status: 'pending',
        projectId: project_id,
        userId: req.user.userId
      }
    });
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create code review' });
  }
};

export const updateCodeReview = async (req, res) => {
  try {
    const { status, review_output, suggestions, approved } = req.body;
    const review = await prisma.codeReview.updateMany({
      where: { id: req.params.id, userId: req.user.userId },
      data: { status, review: review_output, suggestions, approved }
    });
    if (review.count === 0) return res.status(404).json({ error: 'Code review not found' });
    const updated = await prisma.codeReview.findUnique({ where: { id: req.params.id }});
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update code review' });
  }
};
