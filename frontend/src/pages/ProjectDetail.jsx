import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { apiClient } from '@/api/apiClient';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Bot, Code2, Shield, TestTube, FileText, Rocket, Sparkles,
  Gauge, FolderKanban, Plus, History, Zap, CheckCircle2, Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import GlassCard from '@/components/shared/GlassCard.jsx';
import AgentOutputPanel from '@/components/agents/AgentOutputPanel.jsx';
import AgentPromptInput from '@/components/agents/AgentPromptInput.jsx';
import { toast } from 'sonner';

const AGENT_TYPES = [
  { type: 'requirements', label: 'Requirements', icon: Sparkles, gradient: 'from-neon-purple to-neon-blue' },
  { type: 'code_generator', label: 'Code Gen', icon: Code2, gradient: 'from-neon-cyan to-neon-blue' },
  { type: 'code_review', label: 'Code Review', icon: Bot, gradient: 'from-yellow-400 to-orange-400' },
  { type: 'security', label: 'Security', icon: Shield, gradient: 'from-neon-pink to-neon-purple' },
  { type: 'testing', label: 'Testing', icon: TestTube, gradient: 'from-emerald-400 to-neon-cyan' },
  { type: 'documentation', label: 'Docs', icon: FileText, gradient: 'from-neon-blue to-neon-cyan' },
  { type: 'deployment', label: 'Deploy', icon: Rocket, gradient: 'from-neon-pink to-red-400' },
  { type: 'performance', label: 'Performance', icon: Gauge, gradient: 'from-neon-purple to-neon-pink' },
];

const STATUS_COLORS = {
  planning: 'bg-muted text-muted-foreground',
  in_progress: 'bg-neon-cyan/10 text-neon-cyan',
  review: 'bg-neon-purple/10 text-neon-purple',
  testing: 'bg-yellow-400/10 text-yellow-400',
  deployed: 'bg-emerald-400/10 text-emerald-400',
  archived: 'bg-muted text-muted-foreground',
};

function buildPrompt(agentType, project) {
  const base = `Project: ${project.name}\nFramework: ${project.framework || 'not specified'}\nDescription: ${project.description || ''}\nRequirements: ${project.requirements || ''}`;
  const prompts = {
    requirements: `Analyze these project requirements and produce comprehensive documentation:\n\n${base}\n\nGenerate: executive summary, user stories with acceptance criteria, system architecture, database schema, API endpoints, tech stack recommendation, folder structure, implementation phases, and success metrics.`,
    code_generator: `Generate complete production-ready code for this project:\n\n${base}\n\nGenerate: full file structure, main application files, API routes, database schema, frontend components, configuration files (package.json, tsconfig, env), Docker setup, and README. Use TypeScript with modern patterns.`,
    code_review: `Perform a thorough code review of this project:\n\n${base}\n\nAnalyze: code quality (score/10), critical issues, performance bottlenecks, security vulnerabilities, naming conventions, complexity, best practice violations, and provide specific code fixes for each issue found.`,
    security: `Conduct a comprehensive security audit of this project:\n\n${base}\n\nCheck: SQL injection, XSS, CSRF, authentication/authorization flaws, hardcoded secrets, dependency vulnerabilities, insecure configurations, rate limiting, CORS, and provide auto-fix code for each vulnerability.`,
    testing: `Generate a comprehensive test suite for this project:\n\n${base}\n\nGenerate: unit tests (all functions, edge cases, errors), integration tests (API, DB), E2E tests (user workflows), mock setup, test data factories, and coverage configuration targeting 90%+. Use Vitest.`,
    documentation: `Generate complete technical documentation for this project:\n\n${base}\n\nGenerate: full README.md, OpenAPI 3.0 spec, architecture overview with diagrams (text-based), developer onboarding guide, deployment guide, and CHANGELOG template.`,
    deployment: `Generate complete deployment infrastructure for this project:\n\n${base}\n\nGenerate: Dockerfile (multi-stage), docker-compose.yml, GitHub Actions CI/CD, nginx.conf, Kubernetes manifests (Deployment, Service, Ingress), deployment script, .env.example, and health check endpoints.`,
    performance: `Conduct a performance audit and optimization plan for this project:\n\n${base}\n\nAnalyze: database query performance, caching strategy (Redis), API optimization, frontend bundle size, memory management, concurrency, monitoring setup, and provide a prioritized optimization roadmap with code examples.`,
  };
  return prompts[agentType] || `You are a ${agentType.replace(/_/g, ' ')} agent. Analyze and provide comprehensive output for:\n\n${base}`;
}

export default function ProjectDetail() {
  const { id: projectId } = useParams();
  const queryClient = useQueryClient();
  const [activeAgentType, setActiveAgentType] = useState('code_generator');
  const [activeRun, setActiveRun] = useState(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [autoRunning, setAutoRunning] = useState(false);
  const [autoRunProgress, setAutoRunProgress] = useState({ current: 0, total: 0, currentLabel: '' });

  const { data: project, isLoading: loadingProject } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => apiClient.projects.get(projectId),
    enabled: !!projectId,
  });

  const { data: agentRunsData = [] } = useQuery({
    queryKey: ['agentRuns', projectId],
    queryFn: () => apiClient.agentRuns.list(projectId),
    enabled: !!projectId,
    refetchInterval: activeRun?.status === 'running' ? 2000 : false,
  });
  const agentRuns = Array.isArray(agentRunsData) ? agentRunsData : [];

  const runAgentMutation = useMutation({
    mutationFn: async (prompt) => {
      const startTime = Date.now();

      const run = await apiClient.agentRuns.create({
        project_id: projectId,
        agent_type: activeAgentType,
        status: 'running',
        input: prompt,
        tokens_used: 0,
      });

      setActiveRun({ ...run, status: 'running', input: prompt, output: null, output_files: [] });
      setIsStreaming(false);
      await queryClient.invalidateQueries({ queryKey: ['agentRuns', projectId] });

      const fullPrompt = buildPrompt(activeAgentType, { ...project, requirements: project?.requirements || prompt });

      const resultResponse = await apiClient.ai.invokeLLM(fullPrompt);
      const result = resultResponse; // Or adjust depending on how backend sends it, backend just sends text output currently or json. Wait, our aiService.js sends `{ output: text, tokens_used: 0, provider: '...' }`. So result.output contains JSON string if we asked for JSON. Actually, `InvokeLLM` backend just sends whatever Claude/Gemini generated. We need to parse it. Let's just use it as is for now and assume the prompt is well-formed.
      
        let parsedResult = { output: result.output, files: [] };
        try {
          const jsonMatch = result.output.match(/```json\s*(\{[\s\S]*?\})\s*```/);
          let rawJsonStr = jsonMatch ? jsonMatch[1] : result.output;
          // try to parse even if no markdown block
          if (!rawJsonStr.trim().startsWith('{')) {
            const startIdx = rawJsonStr.indexOf('{');
            const endIdx = rawJsonStr.lastIndexOf('}');
            if (startIdx !== -1 && endIdx !== -1) {
              rawJsonStr = rawJsonStr.substring(startIdx, endIdx + 1);
            }
          }
          parsedResult = JSON.parse(rawJsonStr);
        } catch (e) {
          parsedResult.output = result.output;
        }
        
        let markdownOutput = parsedResult.summary || parsedResult.output || 'Completed.';
        
        // Append other fields (like issues, vulnerabilities, requirements) to the markdown output
        const ignoreKeys = ['summary', 'output', 'files'];
        for (const [key, value] of Object.entries(parsedResult)) {
          if (!ignoreKeys.includes(key)) {
            markdownOutput += `\n\n### ${key.charAt(0).toUpperCase() + key.slice(1)}\n`;
            if (Array.isArray(value)) {
              value.forEach(item => {
                if (typeof item === 'object') {
                  markdownOutput += `- **${item.title || item.type || item.issue || item.severity || 'Item'}**:\n`;
                  for (const [k, v] of Object.entries(item)) {
                     if (k !== 'title' && k !== 'type' && k !== 'issue' && k !== 'severity') {
                       markdownOutput += `  - **${k}**: ${v}\n`;
                     }
                  }
                } else {
                  markdownOutput += `- ${item}\n`;
                }
              });
            } else if (typeof value === 'object') {
              markdownOutput += "```json\n" + JSON.stringify(value, null, 2) + "\n```";
            } else {
              markdownOutput += `${value}`;
            }
          }
        }
        
        const actualResult = { ...parsedResult, output: markdownOutput };

      const duration = Date.now() - startTime;
      const tokensUsed = Math.floor(fullPrompt.length / 4) + Math.floor((actualResult.output?.length || 0) / 4);

      await apiClient.agentRuns.update(run.id, {
        status: 'completed',
        output: actualResult.output,
        output_files: actualResult.files || [],
        tokens_used: tokensUsed,
        duration_ms: duration,
      });

      // If code generator, save files to project too
      if (activeAgentType === 'code_generator' && actualResult.files?.length > 0) {
        await apiClient.projects.update(projectId, {
          generated_files: actualResult.files,
          status: 'in_progress',
        });
      }

      const finalRun = {
        ...run,
        status: 'completed',
        output: actualResult.output,
        output_files: actualResult.files || [],
        tokens_used: tokensUsed,
        duration_ms: duration,
      };

      setIsStreaming(true);
      setActiveRun(finalRun);
      setTimeout(() => setIsStreaming(false), Math.min((actualResult.output?.length || 100) * 5 + 500, 8000));

      toast.success(`${activeAgentType.replace(/_/g, ' ')} agent completed!`);
      return finalRun;
    },
    onError: async (err) => {
      toast.error('Agent run failed. Please try again.');
      if (activeRun?.id) {
        await apiClient.agentRuns.update(activeRun.id, { status: 'failed', error: err?.message });
        setActiveRun(r => r ? { ...r, status: 'failed', error: err?.message } : r);
      }
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['agentRuns', projectId] }),
  });

  const autoRunAllMutation = useMutation({
    mutationFn: async () => {
      setAutoRunning(true);
      const agentsToRun = AGENT_TYPES;
      setAutoRunProgress({ current: 0, total: agentsToRun.length, currentLabel: '' });

      for (let i = 0; i < agentsToRun.length; i++) {
        const agent = agentsToRun[i];
        setAutoRunProgress({ current: i + 1, total: agentsToRun.length, currentLabel: agent.label });
        setActiveAgentType(agent.type);

        const startTime = Date.now();
        const run = await apiClient.agentRuns.create({
          project_id: projectId,
          agent_type: agent.type,
          status: 'running',
          input: buildPrompt(agent.type, project),
          tokens_used: 0,
        });

        setActiveRun({ ...run, status: 'running', input: buildPrompt(agent.type, project), output: null, output_files: [] });

        const fullPrompt = buildPrompt(agent.type, project);
        const resultResponse = await apiClient.ai.invokeLLM(fullPrompt);
        const result = resultResponse;
        
        let parsedResult = { output: result.output, files: [] };
        try {
          const jsonMatch = result.output.match(/```json\s*(\{[\s\S]*?\})\s*```/);
          let rawJsonStr = jsonMatch ? jsonMatch[1] : result.output;
          if (!rawJsonStr.trim().startsWith('{')) {
            const startIdx = rawJsonStr.indexOf('{');
            const endIdx = rawJsonStr.lastIndexOf('}');
            if (startIdx !== -1 && endIdx !== -1) {
              rawJsonStr = rawJsonStr.substring(startIdx, endIdx + 1);
            }
          }
          parsedResult = JSON.parse(rawJsonStr);
        } catch (e) {
          parsedResult.output = result.output;
        }
        
        let markdownOutput = parsedResult.summary || parsedResult.output || 'Completed.';
        const ignoreKeys = ['summary', 'output', 'files'];
        for (const [key, value] of Object.entries(parsedResult)) {
          if (!ignoreKeys.includes(key)) {
            markdownOutput += `\n\n### ${key.charAt(0).toUpperCase() + key.slice(1)}\n`;
            if (Array.isArray(value)) {
              value.forEach(item => {
                if (typeof item === 'object') {
                  markdownOutput += `- **${item.title || item.type || item.issue || item.severity || 'Item'}**:\n`;
                  for (const [k, v] of Object.entries(item)) {
                     if (k !== 'title' && k !== 'type' && k !== 'issue' && k !== 'severity') {
                       markdownOutput += `  - **${k}**: ${v}\n`;
                     }
                  }
                } else {
                  markdownOutput += `- ${item}\n`;
                }
              });
            } else if (typeof value === 'object') {
              markdownOutput += "```json\n" + JSON.stringify(value, null, 2) + "\n```";
            } else {
              markdownOutput += `${value}`;
            }
          }
        }
        
        const actualResult = { ...parsedResult, output: markdownOutput };

        const duration = Date.now() - startTime;
        const tokensUsed = Math.floor(fullPrompt.length / 4) + Math.floor((actualResult.output?.length || 0) / 4);

        await apiClient.agentRuns.update(run.id, {
          status: 'completed',
          output: actualResult.output,
          output_files: actualResult.files || [],
          tokens_used: tokensUsed,
          duration_ms: duration,
        });

        if (agent.type === 'code_generator' && actualResult.files?.length > 0) {
          await apiClient.projects.update(projectId, { generated_files: actualResult.files, status: 'in_progress' });
        }

        const finalRun = { ...run, status: 'completed', output: actualResult.output, output_files: actualResult.files || [], tokens_used: tokensUsed };
        setActiveRun(finalRun);
        await queryClient.invalidateQueries({ queryKey: ['agentRuns', projectId] });
      }

      setAutoRunning(false);
      toast.success('All agents completed successfully!');
    },
    onError: () => {
      setAutoRunning(false);
      toast.error('Auto-run failed. Please try again.');
    },
  });

  if (loadingProject) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-24">
        <FolderKanban className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
        <p className="text-muted-foreground">Project not found</p>
        <Link to="/projects"><Button variant="outline" className="mt-4">Back to Projects</Button></Link>
      </div>
    );
  }

  const activeAgentConfig = AGENT_TYPES.find(a => a.type === activeAgentType);
  const allFiles = project.generated_files || [];

  return (
    <div className="space-y-5">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </Link>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold">{project.name}</h1>
            <p className="text-muted-foreground mt-1 text-sm">{project.description || 'No description'}</p>
            {project.tech_stack?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {project.tech_stack.map(t => (
                  <Badge key={t} variant="outline" className="text-xs">{t}</Badge>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <Badge className={`${STATUS_COLORS[project.status] || STATUS_COLORS.planning} capitalize`}>
              {project.status?.replace(/_/g, ' ')}
            </Badge>
            <Button
              onClick={() => autoRunAllMutation.mutate()}
              disabled={autoRunning}
              className="bg-gradient-to-r from-neon-purple to-neon-cyan text-white hover:opacity-90 h-9 gap-2"
            >
              {autoRunning ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> {autoRunProgress.currentLabel} ({autoRunProgress.current}/{autoRunProgress.total})</>
              ) : (
                <><Zap className="w-4 h-4" /> Auto-Run All Agents</>
              )}
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Auto-run progress bar */}
      {autoRunning && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-xl p-4 border border-primary/20">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Running all agents automatically...</span>
            <span className="text-xs text-muted-foreground ml-auto">{autoRunProgress.current} / {autoRunProgress.total}</span>
          </div>
          <div className="w-full h-2 bg-secondary/50 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-neon-purple to-neon-cyan rounded-full"
              animate={{ width: `${(autoRunProgress.current / autoRunProgress.total) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
          <div className="flex gap-2 mt-3 flex-wrap">
            {AGENT_TYPES.map((a, i) => (
              <div key={a.type} className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border ${
                i < autoRunProgress.current - 1 ? 'bg-emerald-400/10 border-emerald-400/30 text-emerald-400' :
                i === autoRunProgress.current - 1 ? 'bg-primary/10 border-primary/30 text-primary' :
                'bg-secondary/30 border-border/30 text-muted-foreground'
              }`}>
                {i < autoRunProgress.current - 1 ? <CheckCircle2 className="w-3 h-3" /> : i === autoRunProgress.current - 1 ? <Loader2 className="w-3 h-3 animate-spin" /> : null}
                {a.label}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      <Tabs defaultValue="agents" className="space-y-5">
        <TabsList className="glass border border-border/50">
          <TabsTrigger value="agents">AI Agents</TabsTrigger>
          <TabsTrigger value="history">
            Run History
            {agentRuns.length > 0 && (
              <span className="ml-1.5 bg-primary/20 text-primary rounded-full px-1.5 text-[10px]">{agentRuns.length}</span>
            )}
          </TabsTrigger>
          <TabsTrigger value="files">
            Files
            {allFiles.length > 0 && (
              <span className="ml-1.5 bg-primary/20 text-primary rounded-full px-1.5 text-[10px]">{allFiles.length}</span>
            )}
          </TabsTrigger>
        </TabsList>

        {/* AI AGENTS TAB */}
        <TabsContent value="agents" className="space-y-4">
          {/* Agent selector */}
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {AGENT_TYPES.map((agent) => (
              <button
                key={agent.type}
                onClick={() => { setActiveAgentType(agent.type); setActiveRun(null); }}
                className={`p-2.5 rounded-lg border text-center transition-all group text-xs ${
                  activeAgentType === agent.type
                    ? 'border-primary/50 bg-primary/10'
                    : 'glass border-border/50 hover:border-primary/30'
                }`}
              >
                <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${agent.gradient} flex items-center justify-center mx-auto mb-1`}>
                  <agent.icon className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="font-medium leading-tight">{agent.label}</span>
              </button>
            ))}
          </div>

          {/* Active agent workspace */}
          <GlassCard className="p-5">
            <div className="flex items-center gap-2 mb-4">
              {activeAgentConfig && (
                <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${activeAgentConfig.gradient} flex items-center justify-center`}>
                  <activeAgentConfig.icon className="w-3.5 h-3.5 text-white" />
                </div>
              )}
              <div>
                <h3 className="font-heading font-semibold text-sm">{activeAgentConfig?.label} Agent</h3>
                <p className="text-xs text-muted-foreground">Running on: {project.name}</p>
              </div>
            </div>

            <AgentPromptInput
              agentType={activeAgentType}
              isLoading={runAgentMutation.isPending}
              onSubmit={(p) => runAgentMutation.mutate(p)}
            />
          </GlassCard>

          {/* Output */}
          <AnimatePresence>
            {activeRun && (
              <AgentOutputPanel
                run={activeRun}
                isStreaming={isStreaming}
                onRetry={() => activeRun?.input && runAgentMutation.mutate(activeRun.input)}
              />
            )}
          </AnimatePresence>
        </TabsContent>

        {/* HISTORY TAB */}
        <TabsContent value="history" className="space-y-3">
          {agentRuns.length === 0 ? (
            <div className="text-center py-16">
              <History className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No agent runs yet. Use the AI Agents tab above!</p>
            </div>
          ) : (
            agentRuns.map((run, i) => (
              <motion.div key={run.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                <AgentOutputPanel
                  run={run}
                  isStreaming={false}
                  onRetry={() => { setActiveAgentType(run.agent_type); setActiveRun(run); }}
                />
              </motion.div>
            ))
          )}
        </TabsContent>

        {/* FILES TAB */}
        <TabsContent value="files">
          <GlassCard className="p-6">
            {allFiles.length === 0 ? (
              <div className="text-center py-12">
                <FolderKanban className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground text-sm mb-4">No files generated yet</p>
                <Button
                  onClick={() => document.querySelector('[data-value="agents"]')?.click()}
                  className="bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20"
                >
                  <Plus className="w-4 h-4 mr-2" /> Run Code Generator
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground mb-4">{allFiles.length} generated file{allFiles.length !== 1 ? 's' : ''}</p>
                {allFiles.map((file, idx) => (
                  <div key={idx} className="border border-border/40 rounded-lg overflow-hidden">
                    <div className="flex items-center gap-2 px-3 py-2 bg-secondary/30">
                      <FileText className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm font-mono flex-1 truncate">{file.path || file.name}</span>
                      {file.language && <Badge variant="outline" className="text-xs">{file.language}</Badge>}
                    </div>
                    <pre className="p-4 text-xs font-mono text-foreground/75 whitespace-pre-wrap max-h-60 overflow-y-auto bg-card/30">
                      {file.content}
                    </pre>
                  </div>
                ))}
              </div>
            )}
          </GlassCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}