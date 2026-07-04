import { getPrismaClient } from '../config/database.js';

const prisma = getPrismaClient();

export const getAgentRuns = async (req, res) => {
  try {
    const { project_id } = req.query;
    const where = { userId: req.user.userId };
    if (project_id) {
      where.projectId = project_id;
    }

    const runs = await prisma.agentRun.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: { agent: true }
    });
    res.json(runs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch agent runs' });
  }
};

export const createAgentRun = async (req, res) => {
  try {
    const { project_id, agent_type, status, input } = req.body;
    
    // Default agent resolution (assuming agents exist in DB or mapping type)
    let agent = await prisma.agent.findFirst({ where: { type: agent_type } });
    if (!agent) {
       // Create a stub agent if it doesn't exist to satisfy relation
       agent = await prisma.agent.create({
         data: {
           name: agent_type,
           type: agent_type,
           userId: req.user.userId,
           systemPrompt: 'Default',
           version: '1.0'
         }
       });
    }

    const run = await prisma.agentRun.create({
      data: {
        projectId: project_id,
        agentId: agent.id,
        status: status || 'pending',
        input,
        userId: req.user.userId,
        tokens: 0
      }
    });
    res.status(201).json(run);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create agent run' });
  }
};

export const updateAgentRun = async (req, res) => {
  try {
    const { status, output, error_msg, executionTime, tokens } = req.body;
    const run = await prisma.agentRun.updateMany({
      where: { id: req.params.id, userId: req.user.userId },
      data: { 
        status, 
        output, 
        error: error_msg,
        executionTime,
        tokens,
        completedAt: status === 'completed' || status === 'failed' ? new Date() : undefined
      }
    });
    if (run.count === 0) return res.status(404).json({ error: 'Agent run not found' });
    const updated = await prisma.agentRun.findUnique({ where: { id: req.params.id }});
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update agent run' });
  }
};
