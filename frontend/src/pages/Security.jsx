import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/api/apiClient';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, AlertTriangle, CheckCircle2, Info, Loader2,
  ChevronDown, ChevronUp, Wand2, XCircle, RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import GlassCard from '@/components/shared/GlassCard.jsx';
import { toast } from 'sonner';

const SEVERITY_CONFIG = {
  critical: { color: 'bg-red-500/10 text-red-400 border border-red-500/20', dot: 'bg-red-400', icon: AlertTriangle, label: 'Critical' },
  high: { color: 'bg-orange-500/10 text-orange-400 border border-orange-500/20', dot: 'bg-orange-400', icon: AlertTriangle, label: 'High' },
  medium: { color: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20', dot: 'bg-yellow-400', icon: Info, label: 'Medium' },
  low: { color: 'bg-blue-500/10 text-blue-400 border border-blue-500/20', dot: 'bg-blue-400', icon: Info, label: 'Low' },
  info: { color: 'bg-muted text-muted-foreground border border-border/50', dot: 'bg-muted-foreground', icon: Info, label: 'Info' },
};

function IssueCard({ issue, onResolve, onDismiss }) {
  const [expanded, setExpanded] = useState(false);
  const config = SEVERITY_CONFIG[issue.severity] || SEVERITY_CONFIG.info;
  const Icon = config.icon;

  return (
    <div className="glass rounded-xl overflow-hidden border border-border/50 hover:border-primary/20 transition-all">
      <div className="flex items-start gap-3 p-4">
        <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${config.dot}`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium text-sm">{issue.title}</span>
              <Badge className={`text-xs ${config.color}`}>{config.label}</Badge>
              {issue.category && (
                <Badge variant="outline" className="text-xs capitalize">{issue.category?.replace(/_/g, ' ')}</Badge>
              )}
              {issue.file_path && (
                <span className="text-xs font-mono text-muted-foreground">{issue.file_path}{issue.line_number ? `:${issue.line_number}` : ''}</span>
              )}
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <button onClick={() => setExpanded(e => !e)} className="text-muted-foreground hover:text-foreground p-1">
                {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{issue.description}</p>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mt-3 space-y-2"
              >
                {issue.recommendation && (
                  <div className="bg-secondary/30 rounded-lg p-3">
                    <p className="text-xs font-semibold text-primary mb-1.5">Recommendation</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{issue.recommendation}</p>
                  </div>
                )}
                {issue.auto_fix && (
                  <div className="bg-secondary/30 rounded-lg p-3">
                    <p className="text-xs font-semibold text-emerald-400 mb-1.5 flex items-center gap-1">
                      <Wand2 className="w-3 h-3" /> Auto-fix
                    </p>
                    <pre className="text-xs text-foreground/80 font-mono whitespace-pre-wrap bg-card/40 p-2 rounded overflow-x-auto">{issue.auto_fix}</pre>
                  </div>
                )}
                <div className="flex items-center gap-2 pt-1">
                  <Button
                    size="sm"
                    className="h-7 text-xs bg-emerald-400/10 text-emerald-400 hover:bg-emerald-400/20 border border-emerald-400/20"
                    onClick={() => onResolve(issue.id)}
                  >
                    <CheckCircle2 className="w-3 h-3 mr-1" /> Mark Resolved
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 text-xs text-muted-foreground"
                    onClick={() => onDismiss(issue.id)}
                  >
                    <XCircle className="w-3 h-3 mr-1" /> Dismiss
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default function Security() {
  const [code, setCode] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const queryClient = useQueryClient();

  const { data: issuesData = [] } = useQuery({
    queryKey: ['securityIssues'],
    queryFn: () => apiClient.securityIssues.list(),
  });
  const issues = Array.isArray(issuesData) ? issuesData : [];

  const scanMutation = useMutation({
    mutationFn: async () => {
      setScanResult('scanning');
      const prompt = `You are a security expert. Perform a comprehensive security audit on this code.\n\nCode:\n${code}\n\nFind ALL security vulnerabilities including:\n- SQL Injection (show exact vulnerable lines)\n- XSS (stored, reflected, DOM)\n- CSRF vulnerabilities\n- Authentication/Authorization issues\n- Hardcoded secrets or credentials\n- Insecure configurations (CORS, headers, etc.)\n- Rate limiting missing\n- Input validation issues\n- Dependency vulnerabilities\n\nFor each issue provide: severity (critical/high/medium/low/info), category, description, file_path (if determinable), line_number (if determinable), recommendation, and auto_fix code.\n\nPlease return JSON in the format: { "summary": "...", "issues": [ { "title": "...", "severity": "...", "category": "...", "description": "...", "recommendation": "...", "auto_fix": "..." } ] }`;
      
      const resResponse = await apiClient.ai.invokeLLM(prompt);
      const resultOutput = resResponse.output;
      
      let res = { issues: [] };
      try {
        const jsonMatch = resultOutput.match(/```json\s*(\{[\s\S]*?\})\s*```/);
        if (jsonMatch) res = JSON.parse(jsonMatch[1]);
        else res = JSON.parse(resultOutput);
      } catch (e) {
        // Fallback or empty issues
      }

      const issuesList = res?.issues || [];
      for (const issue of issuesList) {
        await apiClient.securityIssues.create({ ...issue, status: 'open' });
      }
      setScanResult(res);
      return res;
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['securityIssues'] });
      const count = res.issues?.length || 0;
      if (count === 0) {
        toast.success('No vulnerabilities found! Code looks clean.');
      } else {
        const critical = res.issues?.filter(i => i.severity === 'critical').length || 0;
        toast.warning(`Found ${count} issue${count !== 1 ? 's' : ''}${critical > 0 ? ` (${critical} critical)` : ''}`);
      }
    },
    onError: () => {
      setScanResult(null);
      toast.error('Scan failed. Please try again.');
    },
  });

  const resolveMutation = useMutation({
    mutationFn: (id) => apiClient.securityIssues.update(id, { status: 'resolved' }),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['securityIssues'] }); toast.success('Issue marked as resolved'); },
  });

  const dismissMutation = useMutation({
    mutationFn: (id) => apiClient.securityIssues.update(id, { status: 'dismissed' }),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['securityIssues'] }); },
  });

  const openIssues = issues.filter(i => i.status === 'open');
  const resolvedCount = issues.filter(i => i.status === 'resolved').length;
  const criticalCount = openIssues.filter(i => i.severity === 'critical').length;
  const highCount = openIssues.filter(i => i.severity === 'high').length;

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-heading font-bold">Security Center</h1>
        <p className="text-muted-foreground mt-1">AI-powered vulnerability detection and remediation</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Open Issues', value: openIssues.length, color: 'text-yellow-400' },
          { label: 'Critical', value: criticalCount, color: 'text-red-400' },
          { label: 'High', value: highCount, color: 'text-orange-400' },
          { label: 'Resolved', value: resolvedCount, color: 'text-emerald-400' },
        ].map((stat, i) => (
          <GlassCard key={stat.label} className="p-4" delay={i * 0.05}>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
            <p className={`text-3xl font-heading font-bold mt-0.5 ${stat.color}`}>{stat.value}</p>
          </GlassCard>
        ))}
      </div>

      {/* Scanner */}
      <GlassCard className="p-5">
        <h3 className="font-heading font-semibold mb-3 flex items-center gap-2">
          <Shield className="w-4 h-4 text-primary" /> Security Scanner
        </h3>
        <Textarea
          placeholder="Paste your code here for a comprehensive security audit...\n\nExample: paste a Node.js route handler, Express middleware, authentication logic, or any code you want scanned"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="bg-secondary/30 border-border/50 min-h-[140px] font-mono text-sm mb-4"
        />
        <div className="flex items-center gap-3">
          <Button
            onClick={() => scanMutation.mutate()}
            disabled={!code.trim() || scanMutation.isPending}
            className="bg-gradient-to-r from-neon-pink to-neon-purple text-white hover:opacity-90"
          >
            {scanMutation.isPending ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Scanning...</>
            ) : (
              <><Shield className="w-4 h-4 mr-2" /> Run Security Scan</>
            )}
          </Button>
          {scanResult && scanResult !== 'scanning' && (
            <p className="text-sm text-muted-foreground">
              Found <span className="text-foreground font-medium">{scanResult.issues?.length || 0}</span> issue{scanResult.issues?.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* Scan running skeleton */}
        {scanMutation.isPending && (
          <div className="mt-4 space-y-2.5 animate-pulse">
            {[1, 2, 3].map(i => (
              <div key={i} className="glass rounded-lg p-3 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-neon-purple/40" />
                <div className="h-3 bg-secondary/50 rounded flex-1" />
                <div className="h-5 w-16 bg-secondary/50 rounded-full" />
              </div>
            ))}
          </div>
        )}
      </GlassCard>

      {/* Issues List */}
      {openIssues.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-semibold text-lg">Open Issues ({openIssues.length})</h3>
            {criticalCount > 0 && (
              <Badge className="bg-red-500/10 text-red-400 border border-red-500/20">
                {criticalCount} critical
              </Badge>
            )}
          </div>
          <AnimatePresence>
            {openIssues.map((issue, i) => (
              <motion.div
                key={issue.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: i * 0.04 }}
              >
                <IssueCard
                  issue={issue}
                  onResolve={(id) => resolveMutation.mutate(id)}
                  onDismiss={(id) => dismissMutation.mutate(id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {openIssues.length === 0 && !scanMutation.isPending && (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-full bg-emerald-400/10 flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-emerald-400" />
          </div>
          <h3 className="font-heading font-semibold">All Clear</h3>
          <p className="text-muted-foreground text-sm mt-1">No open security issues. Paste code above to run a scan.</p>
        </div>
      )}
    </div>
  );
}