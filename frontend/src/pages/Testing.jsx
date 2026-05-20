import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TestTube, Loader2, CheckCircle2, XCircle, Copy, Check,
  ChevronDown, ChevronUp, BarChart2, Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import GlassCard from '@/components/shared/GlassCard.jsx';
import { toast } from 'sonner';

function TestSuiteCard({ suite }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(suite.code || '');
    setCopied(true);
    toast.success('Test code copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const download = () => {
    const ext = suite.framework === 'playwright' ? 'spec.ts' : 'test.ts';
    const blob = new Blob([suite.code || ''], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${suite.name?.toLowerCase().replace(/\s+/g, '-')}.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const statusConfig = {
    generated: { color: 'bg-primary/10 text-primary', label: 'Generated' },
    running: { color: 'bg-neon-cyan/10 text-neon-cyan', label: 'Running' },
    passed: { color: 'bg-emerald-400/10 text-emerald-400', label: 'Passed' },
    failed: { color: 'bg-red-400/10 text-red-400', label: 'Failed' },
  };
  const sc = statusConfig[suite.status] || statusConfig.generated;

  return (
    <div className="glass rounded-xl border border-border/50 overflow-hidden">
      <div className="flex items-center gap-3 p-4">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <TestTube className="w-5 h-5 text-accent flex-shrink-0" />
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-medium text-sm">{suite.name}</h4>
              <Badge className={`text-xs ${sc.color}`}>{sc.label}</Badge>
              <Badge variant="outline" className="text-xs capitalize">{suite.test_type}</Badge>
              <Badge variant="outline" className="text-xs">{suite.framework}</Badge>
            </div>
            {suite.tests_total > 0 && (
              <p className="text-xs text-muted-foreground mt-0.5">
                {suite.tests_passed}/{suite.tests_total} passing
                {suite.coverage_percent > 0 && ` • ${suite.coverage_percent}% coverage`}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {suite.coverage_percent > 0 && (
            <div className="hidden sm:flex items-center gap-2">
              <Progress value={suite.coverage_percent} className="w-16 h-1.5" />
              <span className="text-xs text-muted-foreground">{suite.coverage_percent}%</span>
            </div>
          )}
          <button onClick={copy} className="text-muted-foreground hover:text-foreground p-1">
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
          <button onClick={download} className="text-muted-foreground hover:text-foreground p-1">
            <Download className="w-4 h-4" />
          </button>
          <button onClick={() => setOpen(o => !o)} className="text-muted-foreground hover:text-foreground p-1">
            {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && suite.code && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
            <div className="border-t border-border/40">
              <div className="flex items-center justify-between px-4 py-2 bg-secondary/20">
                <span className="text-xs font-mono text-muted-foreground">{suite.name}.test.ts</span>
              </div>
              <pre className="p-4 text-xs font-mono text-foreground/80 whitespace-pre-wrap max-h-80 overflow-y-auto bg-card/30">
                {suite.code}
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Testing() {
  const [code, setCode] = useState('');
  const [framework, setFramework] = useState('vitest');
  const [testType, setTestType] = useState('unit');
  const queryClient = useQueryClient();

  const { data: suitesData = [] } = useQuery({
    queryKey: ['testSuites'],
    queryFn: () => base44.entities.TestSuite.list('-created_date'),
  });
  const suites = Array.isArray(suitesData) ? suitesData : [];

  const generateMutation = useMutation({
    mutationFn: async () => {
      const res = await base44.integrations.Core.InvokeLLM({
        prompt: `You are a testing expert. Generate a comprehensive ${testType} test suite using ${framework}.\n\nCode to test:\n${code}\n\nGenerate:\n1. Complete test file with ALL tests\n2. Happy path tests\n3. Error/edge case tests (null, undefined, empty, overflow)\n4. Mock implementations for dependencies\n5. Test data factories/fixtures\n6. Setup and teardown\n7. Async tests with proper await\n8. ${testType === 'e2e' ? 'Full user workflow scenarios' : 'Isolated unit tests'}\n\nAim for 90%+ coverage. Use ${framework} syntax exclusively. Return working, copy-paste ready code.`,
        response_json_schema: {
          type: 'object',
          properties: {
            test_name: { type: 'string' },
            test_code: { type: 'string' },
            tests_total: { type: 'number' },
            coverage_estimate: { type: 'number' },
            description: { type: 'string' },
          }
        }
      });

      await base44.entities.TestSuite.create({
        name: res.test_name || `${testType} tests — ${new Date().toLocaleDateString()}`,
        test_type: testType,
        framework,
        code: res.test_code,
        status: 'generated',
        tests_total: res.tests_total || 0,
        tests_passed: 0,
        tests_failed: 0,
        coverage_percent: res.coverage_estimate || 0,
      });
      return res;
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['testSuites'] });
      toast.success(`Generated ${res.tests_total || 'multiple'} tests with ~${res.coverage_estimate || 0}% coverage!`);
    },
    onError: () => toast.error('Test generation failed. Please try again.'),
  });

  const totalTests = suites.reduce((s, r) => s + (r.tests_total || 0), 0);
  const avgCoverage = suites.length > 0
    ? Math.round(suites.reduce((s, r) => s + (r.coverage_percent || 0), 0) / suites.length)
    : 0;

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-heading font-bold">Testing Center</h1>
        <p className="text-muted-foreground mt-1">AI-generated comprehensive test suites</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Test Suites', value: suites.length, color: 'text-foreground' },
          { label: 'Total Tests', value: totalTests, color: 'text-neon-cyan' },
          { label: 'Avg Coverage', value: `${avgCoverage}%`, color: 'text-emerald-400' },
          { label: 'Passed', value: suites.filter(s => s.status === 'passed').length, color: 'text-emerald-400' },
        ].map((stat, i) => (
          <GlassCard key={stat.label} className="p-4" delay={i * 0.05}>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
            <p className={`text-3xl font-heading font-bold mt-0.5 ${stat.color}`}>{stat.value}</p>
          </GlassCard>
        ))}
      </div>

      {/* Generator */}
      <GlassCard className="p-5">
        <h3 className="font-heading font-semibold mb-4 flex items-center gap-2">
          <TestTube className="w-4 h-4 text-accent" /> Test Generator
        </h3>
        <div className="flex gap-3 mb-4 flex-wrap">
          <Select value={testType} onValueChange={setTestType}>
            <SelectTrigger className="w-40 bg-secondary/30 border-border/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="glass-strong border-border/50">
              <SelectItem value="unit">Unit Tests</SelectItem>
              <SelectItem value="integration">Integration</SelectItem>
              <SelectItem value="e2e">E2E Tests</SelectItem>
              <SelectItem value="api">API Tests</SelectItem>
            </SelectContent>
          </Select>
          <Select value={framework} onValueChange={setFramework}>
            <SelectTrigger className="w-40 bg-secondary/30 border-border/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="glass-strong border-border/50">
              <SelectItem value="vitest">Vitest</SelectItem>
              <SelectItem value="jest">Jest</SelectItem>
              <SelectItem value="playwright">Playwright</SelectItem>
              <SelectItem value="supertest">Supertest</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Paste the code you want to test...\n\nExample: paste a function, class, API route, React component, or service and get comprehensive tests generated automatically."
          className="bg-secondary/30 border-border/50 min-h-[140px] font-mono text-sm mb-4"
        />
        <Button
          onClick={() => generateMutation.mutate()}
          disabled={!code.trim() || generateMutation.isPending}
          className="bg-gradient-to-r from-emerald-500 to-neon-cyan text-white hover:opacity-90"
        >
          {generateMutation.isPending ? (
            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating Tests...</>
          ) : (
            <><TestTube className="w-4 h-4 mr-2" /> Generate {testType} Tests</>
          )}
        </Button>

        {generateMutation.isPending && (
          <div className="mt-4 space-y-2 animate-pulse">
            <div className="h-3 bg-secondary/50 rounded w-3/4" />
            <div className="h-3 bg-secondary/50 rounded w-full" />
            <div className="h-3 bg-secondary/50 rounded w-2/3" />
          </div>
        )}
      </GlassCard>

      {/* Suites */}
      <div className="space-y-3">
        <h3 className="font-heading font-semibold text-lg">
          Test Suites ({suites.length})
        </h3>
        {suites.length === 0 ? (
          <div className="text-center py-16">
            <TestTube className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No test suites generated yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {suites.map((suite, i) => (
                <motion.div key={suite.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                  <TestSuiteCard suite={suite} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}