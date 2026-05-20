import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/api/apiClient';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, Code2, Bot, Shield, TestTube, FileText, Rocket, Gauge,
  History, ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import GlassCard from '@/components/shared/GlassCard.jsx';
import AgentOutputPanel from '@/components/agents/AgentOutputPanel.jsx';
import AgentPromptInput from '@/components/agents/AgentPromptInput.jsx';
import { toast } from 'sonner';

const AGENTS = [
  { type: 'requirements', label: 'Requirements Analyst', description: 'User stories, API specs, DB schema, architecture', icon: Sparkles, gradient: 'from-neon-purple to-neon-blue' },
  { type: 'code_generator', label: 'Code Generator', description: 'Full-stack code, configs, Docker, CI/CD', icon: Code2, gradient: 'from-neon-cyan to-neon-blue' },
  { type: 'code_review', label: 'Code Reviewer', description: 'Quality, performance, and best practice review', icon: Bot, gradient: 'from-yellow-400 to-orange-400' },
  { type: 'security', label: 'Security Scanner', description: 'SQLi, XSS, CSRF, secrets, dependency audits', icon: Shield, gradient: 'from-neon-pink to-neon-purple' },
  { type: 'testing', label: 'Test Generator', description: 'Unit, integration, e2e tests with coverage', icon: TestTube, gradient: 'from-emerald-400 to-neon-cyan' },
  { type: 'documentation', label: 'Documentation Writer', description: 'README, API docs, diagrams, onboarding', icon: FileText, gradient: 'from-neon-blue to-neon-cyan' },
  { type: 'deployment', label: 'Deployment Engineer', description: 'Docker, K8s, CI/CD, deployment scripts', icon: Rocket, gradient: 'from-neon-pink to-red-400' },
  { type: 'performance', label: 'Performance Optimizer', description: 'Caching, DB queries, bundle size, profiling', icon: Gauge, gradient: 'from-neon-purple to-neon-pink' },
];

/** @type {{[key: string]: (p: string) => string}} */
const AGENT_PROMPTS = {
  requirements: (p) => `You are an elite Requirements Analyst AI. Produce comprehensive structured output for this project.

Project/Request: ${p}

Generate:
1. Executive Summary
2. User Stories (with acceptance criteria)
3. System Architecture Overview
4. Database Schema (tables, columns, relationships)
5. API Endpoints specification
6. Tech Stack recommendation with reasoning
7. Project folder structure
8. Implementation phases and milestones
9. Risk assessment
10. Success metrics

Format everything clearly with headers, code blocks for technical content.`,

  code_generator: (p) => `You are an elite Full-Stack Code Generator AI. Generate production-ready code.

Request: ${p}

Generate complete, working code including:
1. Project structure overview
2. Main application files with full implementations
3. Database schema and migrations
4. API routes/controllers
5. Frontend components
6. Configuration files (package.json, tsconfig, etc.)
7. Docker setup
8. Environment variables template (.env.example)
9. README with setup instructions

Use TypeScript, modern patterns, proper error handling. Provide actual code, not placeholders.`,

  code_review: (p) => `You are an expert Code Reviewer AI. Perform a thorough review.

Code/Context: ${p}

Analyze and report:
1. **Summary** — Overall quality assessment (score /10)
2. **Critical Issues** — Bugs, security holes, breaking problems
3. **Performance** — Bottlenecks, inefficient algorithms, N+1 queries
4. **Security** — Vulnerabilities, injection risks, auth issues
5. **Code Quality** — Readability, naming, complexity
6. **Best Practices** — Pattern violations, anti-patterns
7. **Specific Fixes** — Code examples for each issue
8. **Recommendations** — Architecture improvements

For each issue: file path, line number (if applicable), severity, and fix.`,

  security: (p) => `You are a Security Analyst AI. Conduct a thorough security audit.

Code/System: ${p}

Check and report:
1. **Critical Vulnerabilities** (CVSS 9-10)
2. **SQL Injection** risks with exploit examples
3. **XSS** (Stored, Reflected, DOM-based)
4. **CSRF** vulnerabilities
5. **Authentication/Authorization** flaws
6. **Hardcoded Secrets** and sensitive data exposure
7. **Dependency Vulnerabilities** (known CVEs)
8. **Insecure Configurations** (CORS, headers, etc.)
9. **Rate Limiting** and DoS risks
10. **Auto-fix code snippets** for each vulnerability

Format with severity levels: CRITICAL / HIGH / MEDIUM / LOW / INFO`,

  testing: (p) => `You are a Testing Expert AI. Generate comprehensive test suites.

Code/Feature: ${p}

Generate:
1. **Unit Tests** — All functions, edge cases, error paths
2. **Integration Tests** — API endpoints, database operations
3. **E2E Tests** — User workflows (Playwright/Cypress)
4. **Mock/Stub Setup** — External dependencies
5. **Test Data Factories** — Fixtures and seeders
6. **Coverage Configuration** — vitest/jest config for 90%+

Use Vitest syntax. Include:
- Happy path tests
- Error case tests  
- Edge cases (empty, null, overflow)
- Async/await patterns
- Mock implementations`,

  documentation: (p) => `You are a Technical Writer AI. Generate production-quality documentation.

Project/Code: ${p}

Generate:
1. **README.md** — Full project README with badges, installation, usage, API reference
2. **API Documentation** — OpenAPI 3.0 spec with all endpoints, schemas, examples
3. **Architecture Overview** — System design, data flow, component diagram (text-based)
4. **Developer Onboarding Guide** — Local setup, environment, contributing guide
5. **Deployment Guide** — Production deployment steps
6. **Changelog Template** — CHANGELOG.md structure
7. **Code Comments** — JSDoc/TSDoc examples for key functions

Format all docs in proper Markdown.`,

  deployment: (p) => `You are a DevOps Engineer AI. Generate complete deployment infrastructure.

Application: ${p}

Generate all files:
1. **Dockerfile** — Multi-stage, optimized, production-ready
2. **docker-compose.yml** — Full stack with all services
3. **.github/workflows/deploy.yml** — CI/CD pipeline (test, build, deploy)
4. **nginx.conf** — Reverse proxy configuration
5. **kubernetes/** — Deployment, Service, Ingress YAML manifests
6. **scripts/deploy.sh** — Automated deployment script
7. **.env.example** — All environment variables documented
8. **Health check endpoints** — /health, /ready implementations
9. **Monitoring setup** — Prometheus metrics, logging config

Use best practices: non-root user, health checks, secrets management.`,

  performance: (p) => `You are a Performance Engineering AI. Analyze and optimize for maximum performance.

System/Code: ${p}

Analyze and provide:
1. **Performance Audit** — Current bottlenecks identified
2. **Database Optimization** — Slow queries, missing indexes, N+1 fixes
3. **Caching Strategy** — Redis patterns, cache invalidation, CDN
4. **API Optimization** — Response pagination, compression, batch requests
5. **Frontend Performance** — Bundle splitting, lazy loading, Core Web Vitals
6. **Memory Management** — Leak detection, optimization patterns
7. **Concurrency** — Async patterns, worker threads, queue systems
8. **Monitoring** — APM setup, metrics to track
9. **Benchmark Results** — Expected improvements with changes
10. **Implementation Roadmap** — Priority order of optimizations

Provide specific code examples for each optimization.`,
};

export default function Agents() {
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [activeRun, setActiveRun] = useState(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const queryClient = useQueryClient();

  const { data: allRunsData = [] } = useQuery({
    queryKey: ['agentRuns'],
    queryFn: () => base44.entities.AgentRun.list('-created_date', 50),
  });
  const allRuns = Array.isArray(allRunsData) ? allRunsData : [];

  const runMutation = useMutation({
    mutationFn: async (prompt) => {
      const startTime = Date.now();

      // Create run record immediately
      const run = await base44.entities.AgentRun.create({
        agent_type: selectedAgent,
        status: 'running',
        input: prompt,
        tokens_used: 0,
      });

      // Show it immediately in UI
      setActiveRun({ ...run, status: 'running', input: prompt, output: null, output_files: [] });
      setIsStreaming(false);

      await queryClient.invalidateQueries({ queryKey: ['agentRuns'] });

      const promptFn = selectedAgent ? AGENT_PROMPTS[selectedAgent] : undefined;
      const agentName = selectedAgent ? selectedAgent.replace(/_/g, ' ') : 'agent';
      const fullPrompt = promptFn ? promptFn(prompt) : `You are a ${agentName} AI. ${prompt}`;

      const result = await base44.integrations.Core.InvokeLLM({
        prompt: fullPrompt,
        response_json_schema: {
          type: 'object',
          properties: {
            output: { type: 'string', description: 'Full markdown-formatted response' },
            files: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  path: { type: 'string' },
                  content: { type: 'string' },
                  language: { type: 'string' }
                }
              }
            },
            summary: { type: 'string', description: 'One-sentence summary' },
          }
        }
      });

      const duration = Date.now() - startTime;
      const tokensUsed = Math.floor(fullPrompt.length / 4) + Math.floor((result.output?.length || 0) / 4);

      const updatedRun = await base44.entities.AgentRun.update(run.id, {
        status: 'completed',
        output: result.output || result.summary || 'Completed successfully.',
        output_files: result.files || [],
        tokens_used: tokensUsed,
        duration_ms: duration,
      });

      // Show streaming animation
      const finalRun = { ...run, ...updatedRun, status: 'completed', output: result.output || result.summary || 'Completed.', output_files: result.files || [], tokens_used: tokensUsed };
      setIsStreaming(true);
      setActiveRun(finalRun);

      setTimeout(() => setIsStreaming(false), (result.output?.length || 100) * 5 + 500);

      toast.success(`${selectedAgent.replace(/_/g, ' ')} agent completed!`);
      return finalRun;
    },
    onError: async (err) => {
      toast.error('Agent run failed. Please try again.');
      if (activeRun?.id) {
        await base44.entities.AgentRun.update(activeRun.id, {
          status: 'failed',
          error: err?.message || 'Unknown error',
        });
        setActiveRun(r => r ? { ...r, status: 'failed', error: err?.message } : r);
      }
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['agentRuns'] }),
  });

  const recentRuns = allRuns.filter(r => r.agent_type === selectedAgent);
  const selectedAgentConfig = AGENTS.find(a => a.type === selectedAgent);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-heading font-bold">AI Agents</h1>
        <p className="text-muted-foreground mt-1">8 specialized agents for every stage of development</p>
      </motion.div>

      {/* Agent Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {AGENTS.map((agent, i) => (
          <motion.button
            key={agent.type}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            onClick={() => { setSelectedAgent(agent.type); setActiveRun(null); }}
            className={`p-3 rounded-xl border text-left transition-all group ${
              selectedAgent === agent.type
                ? 'border-primary/50 bg-primary/10 glow-purple'
                : 'glass border-border/50 hover:border-primary/30 hover:bg-secondary/50'
            }`}
          >
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${agent.gradient} flex items-center justify-center mb-2`}>
              <agent.icon className="w-4 h-4 text-white" />
            </div>
            <p className="text-xs font-semibold leading-tight">{agent.label}</p>
          </motion.button>
        ))}
      </div>

      {/* Selected Agent Workspace */}
      <AnimatePresence mode="wait">
        {selectedAgent && (
          <motion.div
            key={selectedAgent}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-4"
          >
            {/* Agent header */}
            <div className="flex items-center gap-3">
              {selectedAgentConfig && (
                <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${selectedAgentConfig.gradient} flex items-center justify-center`}>
                  <selectedAgentConfig.icon className="w-5 h-5 text-white" />
                </div>
              )}
              <div>
                <h2 className="font-heading font-bold text-lg">{selectedAgentConfig?.label}</h2>
                <p className="text-xs text-muted-foreground">{selectedAgentConfig?.description}</p>
              </div>
            </div>

            {/* Prompt Input */}
            <AgentPromptInput
              agentType={selectedAgent}
              isLoading={runMutation.isPending}
              onSubmit={(p) => runMutation.mutate(p)}
            />

            {/* Active / Latest Run Output */}
            <AnimatePresence>
              {activeRun && (
                <AgentOutputPanel
                  run={activeRun}
                  isStreaming={isStreaming}
                  onRetry={() => activeRun?.input && runMutation.mutate(activeRun.input)}
                />
              )}
            </AnimatePresence>

            {/* History */}
            {recentRuns.length > 0 && (
              <div className="mt-4">
                <div className="flex items-center gap-2 mb-3">
                  <History className="w-4 h-4 text-muted-foreground" />
                  <h3 className="text-sm font-medium text-muted-foreground">Run History</h3>
                </div>
                <div className="space-y-2">
                  {recentRuns.slice(0, 5).map((run) => (
                    <button
                      key={run.id}
                      onClick={() => { setActiveRun(run); setIsStreaming(false); }}
                      className="w-full text-left glass rounded-lg p-3 hover:border-primary/30 transition-all group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                            run.status === 'completed' ? 'bg-emerald-400' :
                            run.status === 'running' ? 'bg-neon-cyan animate-pulse' :
                            'bg-red-400'
                          }`} />
                          <p className="text-sm truncate text-muted-foreground group-hover:text-foreground">
                            {run.input?.slice(0, 80)}...
                          </p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                          <span className="text-xs text-muted-foreground">
                            {new Date(run.created_date).toLocaleDateString()}
                          </span>
                          <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty state */}
      {!selectedAgent && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
          <Bot className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-heading font-semibold text-lg">Select an Agent</h3>
          <p className="text-muted-foreground text-sm mt-1">Choose one of the 8 specialized agents above to get started</p>
        </motion.div>
      )}
    </div>
  );
}