import { getPrismaClient } from '../config/database.js';

const prisma = getPrismaClient();

export const getTestSuites = async (req, res) => {
  try {
    const tests = await prisma.testSuite.findMany({
      where: { userId: req.user.userId },
      orderBy: { createdAt: 'desc' }
    });
    res.json(tests);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch test suites' });
  }
};

export const createTestSuite = async (req, res) => {
  try {
    const { name, description, status, project_id, framework, code } = req.body;
    const test = await prisma.testSuite.create({
      data: {
        name: name || 'Test Suite',
        description,
        status: status || 'pending',
        projectId: project_id,
        userId: req.user.userId,
        testCode: code
      }
    });
    res.status(201).json(test);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create test suite' });
  }
};

export const updateTestSuite = async (req, res) => {
  try {
    const { status, testOutput, passed, failed, coverage } = req.body;
    const test = await prisma.testSuite.updateMany({
      where: { id: req.params.id, userId: req.user.userId },
      data: { status, testOutput, passed, failed, coverage }
    });
    if (test.count === 0) return res.status(404).json({ error: 'Test suite not found' });
    const updated = await prisma.testSuite.findUnique({ where: { id: req.params.id }});
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update test suite' });
  }
};
