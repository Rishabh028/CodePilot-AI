import { getPrismaClient } from '../config/database.js';

const prisma = getPrismaClient();

export const getSecurityIssues = async (req, res) => {
  try {
    const issues = await prisma.securityIssue.findMany({
      where: { userId: req.user.userId },
      orderBy: { createdAt: 'desc' }
    });
    res.json(issues);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch security issues' });
  }
};

export const createSecurityIssue = async (req, res) => {
  try {
    const { title, severity, description, code, remediation, recommendation, status, project_id, category, file_path, line_number } = req.body;
    
    if (!title || !severity || !description) {
      console.error('Missing required fields in security issue payload:', req.body);
      // fallback values so it doesn't crash Prisma
    }

    const issue = await prisma.securityIssue.create({
      data: {
        title: title || 'Unknown Security Issue',
        severity: severity || 'info',
        description: description || 'No description provided.',
        code,
        remediation: remediation || recommendation,
        status: status || 'open',
        projectId: project_id || null,
        userId: req.user.userId,
        cveBucket: category // Reusing existing field
      }
    });
    res.status(201).json(issue);
  } catch (error) {
    console.error('Failed to create security issue:', error);
    res.status(500).json({ error: 'Failed to create security issue' });
  }
};

export const updateSecurityIssue = async (req, res) => {
  try {
    const { status } = req.body;
    const issue = await prisma.securityIssue.updateMany({
      where: { id: req.params.id, userId: req.user.userId },
      data: { status }
    });
    if (issue.count === 0) return res.status(404).json({ error: 'Security issue not found' });
    const updated = await prisma.securityIssue.findUnique({ where: { id: req.params.id }});
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update security issue' });
  }
};
