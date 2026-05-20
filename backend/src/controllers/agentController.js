import { invokeAgent } from '../services/agentService.js';
import { logInfo, logError } from '../utils/logger.js';

const VALID_AGENTS = [
  'requirements',
  'code_generator',
  'code_review',
  'security',
  'testing',
  'documentation',
  'deployment',
  'performance',
];

export async function runAgent(req, res) {
  try {
    const { agentType, input } = req.body;

    if (!agentType || !input) {
      return res.status(400).json({
        error: 'Missing required fields: agentType and input',
      });
    }

    if (!VALID_AGENTS.includes(agentType)) {
      return res.status(400).json({
        error: `Invalid agent type. Valid agents: ${VALID_AGENTS.join(', ')}`,
      });
    }

    logInfo('Running agent', { agentType, inputLength: input.length });

    const result = await invokeAgent(agentType, input);

    return res.json({
      success: true,
      agentType,
      output: result.output,
      tokens_used: result.tokens_used,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logError('Agent error', error);
    return res.status(500).json({
      error: error.message || 'Agent execution failed',
      agentType: req.body.agentType,
    });
  }
}

export async function getAgents(req, res) {
  return res.json({
    agents: [
      {
        type: 'requirements',
        label: 'Requirements Analyst',
        description: 'Generate user stories, API specs, DB schema, architecture',
      },
      {
        type: 'code_generator',
        label: 'Code Generator',
        description: 'Generate full-stack code, configs, Docker, CI/CD',
      },
      {
        type: 'code_review',
        label: 'Code Reviewer',
        description: 'Quality, performance, and best practice review',
      },
      {
        type: 'security',
        label: 'Security Scanner',
        description: 'SQLi, XSS, CSRF, secrets, dependency audits',
      },
      {
        type: 'testing',
        label: 'Test Generator',
        description: 'Unit, integration, e2e tests with coverage',
      },
      {
        type: 'documentation',
        label: 'Documentation Writer',
        description: 'README, API docs, diagrams, onboarding',
      },
      {
        type: 'deployment',
        label: 'Deployment Engineer',
        description: 'Docker, K8s, CI/CD, deployment scripts',
      },
      {
        type: 'performance',
        label: 'Performance Optimizer',
        description: 'Caching, DB queries, bundle size, profiling',
      },
    ],
  });
}
