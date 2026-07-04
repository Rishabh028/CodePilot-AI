import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/api/apiClient';
import { motion } from 'framer-motion';
import {
  FolderKanban, Zap, Bot, Shield, TrendingUp, ArrowRight,
  CheckCircle2, Clock, XCircle, Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import StatCard from '@/components/shared/StatCard.jsx';
import GlassCard from '@/components/shared/GlassCard.jsx';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const USAGE_DATA = [
  { date: 'Mon', tokens: 1200 }, { date: 'Tue', tokens: 1800 },
  { date: 'Wed', tokens: 2400 }, { date: 'Thu', tokens: 1600 },
  { date: 'Fri', tokens: 3200 }, { date: 'Sat', tokens: 2800 }, { date: 'Sun', tokens: 2100 },
];

const AGENT_DATA = [
  { name: 'Code Gen', runs: 8 }, { name: 'Security', runs: 5 },
  { name: 'Testing', runs: 12 }, { name: 'Docs', runs: 3 },
];

const STATUS_COLORS = {
  planning: 'bg-muted text-muted-foreground',
  in_progress: 'bg-neon-cyan/10 text-neon-cyan',
  review: 'bg-neon-purple/10 text-neon-purple',
  testing: 'bg-yellow-400/10 text-yellow-400',
  deployed: 'bg-emerald-400/10 text-emerald-400',
  archived: 'bg-muted text-muted-foreground',
};

const RUN_STATUS_CONFIG = {
  completed: { icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
  running: { icon: Loader2, color: 'text-neon-cyan', bg: 'bg-neon-cyan/10' },
  failed: { icon: XCircle, color: 'text-red-400', bg: 'bg-red-400/10' },
  queued: { icon: Clock, color: 'text-muted-foreground', bg: 'bg-muted' },
};

export default function Dashboard() {
  const { data: user } = useQuery({ queryKey: ['me'], queryFn: () => apiClient.auth.me() });
  const { data: projectsData = [] } = useQuery({ queryKey: ['projects'], queryFn: () => apiClient.projects.list() });
  const { data: agentRunsData = [] } = useQuery({ queryKey: ['agentRuns'], queryFn: () => apiClient.agentRuns.list() });
  const { data: securityIssuesData = [] } = useQuery({ queryKey: ['securityIssues'], queryFn: () => apiClient.securityIssues.list() });

  const projects = Array.isArray(projectsData) ? projectsData : [];
  const agentRuns = Array.isArray(agentRunsData) ? agentRunsData : [];
  const securityIssues = Array.isArray(securityIssuesData) ? securityIssuesData : [];

  const totalTokens = agentRuns.reduce((sum, r) => sum + (r.tokens_used || 0), 0);
  const completedRuns = agentRuns.filter(r => r.status === 'completed').length;
  const runningAgents = agentRuns.filter(r => r.status === 'running').length;

  const hourOfDay = new Date().getHours();
  const greeting = hourOfDay < 12 ? 'Good morning' : hourOfDay < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-heading font-bold">
          {greeting}{user?.full_name ? `, ${user.full_name.split(' ')[0]}` : ''} 👋
        </h1>
        <p className="text-muted-foreground mt-1 font-body">Here's your CodePilot AI overview</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={FolderKanban} label="Projects" value={projects.length} change="+3" delay={0} accentColor="from-neon-purple to-neon-blue" />
        <StatCard icon={Zap} label="Tokens Used" value={totalTokens > 1000 ? `${(totalTokens / 1000).toFixed(1)}k` : totalTokens} change="+12%" delay={0.1} accentColor="from-neon-cyan to-neon-blue" />
        <StatCard icon={Bot} label="Agent Runs" value={completedRuns} delay={0.2} accentColor="from-neon-pink to-neon-purple" />
        <StatCard icon={Shield} label="Open Issues" value={securityIssues.length} delay={0.3} accentColor="from-red-400 to-neon-pink" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Token usage chart */}
        <GlassCard className="lg:col-span-2 p-5" delay={0.2}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-heading font-semibold">Token Usage</h3>
              <p className="text-xs text-muted-foreground mt-0.5">This week</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400">
              <TrendingUp className="w-3.5 h-3.5" /> +18% vs last week
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={USAGE_DATA}>
              <defs>
                <linearGradient id="tokenGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 11 }} />
              <Tooltip
                contentStyle={{ background: 'hsl(260 50% 6%)', border: '1px solid hsl(260 20% 16%)', borderRadius: '8px', color: '#F8FAFC', fontSize: 12 }}
              />
              <Area type="monotone" dataKey="tokens" stroke="#8B5CF6" strokeWidth={2} fill="url(#tokenGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* Recent Projects */}
        <GlassCard className="p-5" delay={0.3}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold">Recent Projects</h3>
            <Link to="/projects" className="text-xs text-primary hover:underline flex items-center gap-1">
              All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {projects.length === 0 ? (
            <div className="text-center py-6">
              <FolderKanban className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">No projects yet</p>
              <Link to="/projects/new">
                <Button size="sm" className="mt-3 h-7 text-xs bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20">
                  Create First Project
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              {projects.slice(0, 5).map(project => (
                <Link key={project.id} to={`/projects/${project.id}`}>
                  <div className="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-secondary/50 transition-colors">
                    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <FolderKanban className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{project.name}</p>
                      <Badge className={`text-[10px] px-1.5 py-0 ${STATUS_COLORS[project.status] || STATUS_COLORS.planning}`}>
                        {project.status?.replace(/_/g, ' ')}
                      </Badge>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </GlassCard>
      </div>

      {/* Agent Runs Table */}
      <GlassCard className="p-5" delay={0.4}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold">Recent Agent Runs</h3>
          <Link to="/agents" className="text-xs text-primary hover:underline flex items-center gap-1">
            View all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        {agentRuns.length === 0 ? (
          <div className="text-center py-8">
            <Bot className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No agent runs yet</p>
            <Link to="/agents">
              <Button size="sm" className="mt-3 h-7 text-xs bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20">
                Launch an Agent
              </Button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/40">
                  <th className="text-left text-xs text-muted-foreground font-medium pb-3">Agent</th>
                  <th className="text-left text-xs text-muted-foreground font-medium pb-3">Input</th>
                  <th className="text-left text-xs text-muted-foreground font-medium pb-3">Status</th>
                  <th className="text-right text-xs text-muted-foreground font-medium pb-3">Tokens</th>
                  <th className="text-right text-xs text-muted-foreground font-medium pb-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {agentRuns.slice(0, 8).map(run => {
                  const sc = RUN_STATUS_CONFIG[run.status] || RUN_STATUS_CONFIG.queued;
                  const Icon = sc.icon;
                  return (
                    <tr key={run.id} className="hover:bg-secondary/20 transition-colors">
                      <td className="py-3 pr-4">
                        <span className="capitalize text-sm">{run.agent_type?.replace(/_/g, ' ')}</span>
                      </td>
                      <td className="py-3 pr-4 max-w-xs">
                        <span className="text-xs text-muted-foreground truncate block">{run.input?.slice(0, 60)}{run.input?.length > 60 ? '…' : ''}</span>
                      </td>
                      <td className="py-3 pr-4">
                        <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${sc.bg} ${sc.color}`}>
                          <Icon className={`w-3 h-3 ${run.status === 'running' ? 'animate-spin' : ''}`} />
                          {run.status}
                        </span>
                      </td>
                      <td className="py-3 text-right text-xs text-muted-foreground">{(run.tokens_used || 0).toLocaleString()}</td>
                      <td className="py-3 text-right text-xs text-muted-foreground">{new Date(run.created_date).toLocaleDateString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </GlassCard>
    </div>
  );
}