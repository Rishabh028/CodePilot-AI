import { getPrismaClient } from '../config/database.js';

const prisma = getPrismaClient();

export const getDeployments = async (req, res) => {
  try {
    const deployments = await prisma.deployment.findMany({
      where: { userId: req.user.userId },
      orderBy: { createdAt: 'desc' }
    });
    res.json(deployments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch deployments' });
  }
};

export const createDeployment = async (req, res) => {
  try {
    const { name, environment, status, project_id, target, url } = req.body;
    const deployment = await prisma.deployment.create({
      data: {
        name: name || target || 'Deployment',
        environment: environment || 'prod',
        status: status || 'deploying',
        deploymentUrl: url,
        projectId: project_id,
        userId: req.user.userId,
        startedAt: new Date()
      }
    });
    res.status(201).json(deployment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create deployment' });
  }
};

export const updateDeployment = async (req, res) => {
  try {
    const { status, url } = req.body;
    const deployment = await prisma.deployment.updateMany({
      where: { id: req.params.id, userId: req.user.userId },
      data: { 
        status, 
        deploymentUrl: url,
        completedAt: status === 'deployed' || status === 'failed' ? new Date() : undefined
      }
    });
    if (deployment.count === 0) return res.status(404).json({ error: 'Deployment not found' });
    const updated = await prisma.deployment.findUnique({ where: { id: req.params.id }});
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update deployment' });
  }
};
