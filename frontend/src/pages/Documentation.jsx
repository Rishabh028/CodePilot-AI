import React, { useState, useEffect, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, Loader2, Copy, Check, BookOpen, FileCode, Server,
  Database, Download, ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import ReactMarkdown from 'react-markdown';
import GlassCard from '@/components/shared/GlassCard.jsx';
import { toast } from 'sonner';

const DOC_TYPES = [
  {
    id: 'readme',
    label: 'README.md',
    icon: BookOpen,
    description: 'Full project README with badges, install, usage',
    prompt: (ctx) => `Generate a production-quality README.md for this project:\n\n${ctx}\n\nInclude: badges (build, license, npm), description, features list, tech stack, prerequisites, installation steps, configuration (.env), usage examples, API reference, contributing guide, license. Use proper Markdown formatting.`,
  },
  {
    id: 'api',
    label: 'API Docs',
    icon: Server,
    description: 'OpenAPI 3.0 specification',
    prompt: (ctx) => `Generate comprehensive API documentation in Markdown format for:\n\n${ctx}\n\nInclude: overview, authentication (JWT/API key), all endpoints with method, path, description, request body schema, response schema, status codes, curl examples, and error codes.`,
  },
  {
    id: 'architecture',
    label: 'Architecture',
    icon: Database,
    description: 'System design & architecture overview',
    prompt: (ctx) => `Generate a comprehensive system architecture document for:\n\n${ctx}\n\nInclude: system overview, component diagram (text-based ASCII), data flow, database schema, API layer, frontend architecture, infrastructure, security architecture, scalability considerations, and technology decisions with rationale.`,
  },
  {
    id: 'onboarding',
    label: 'Onboarding',
    icon: FileCode,
    description: 'Developer onboarding & setup guide',
    prompt: (ctx) => `Generate a comprehensive developer onboarding guide for:\n\n${ctx}\n\nInclude: environment setup (OS-specific), prerequisites, repository setup, local development, environment variables, database setup, running tests, code standards, git workflow, common issues & solutions, and contact information.`,
  },
];

export default function Documentation() {
  const [docType, setDocType] = useState('readme');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [displayedOutput, setDisplayedOutput] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState('preview');
  const animIdx = useRef(0);

  useEffect(() => {
    if (!output || !isAnimating) return;
    setDisplayedOutput('');
    animIdx.current = 0;
  }, [output, isAnimating]);

  useEffect(() => {
    if (!isAnimating || !output || animIdx.current >= output.length) {
      if (animIdx.current >= (output?.length || 0) && isAnimating) setIsAnimating(false);
      return;
    }
    const chunkSize = output.length > 4000 ? 50 : 15;
    const speed = output.length > 4000 ? 5 : 10;
    const timer = setTimeout(() => {
      animIdx.current += chunkSize;
      setDisplayedOutput(output.slice(0, animIdx.current));
    }, speed);
    return () => clearTimeout(timer);
  }, [isAnimating, output, displayedOutput]);

  const generateMutation = useMutation({
    mutationFn: async () => {
      const dt = DOC_TYPES.find(d => d.id === docType);
      const res = await base44.integrations.Core.InvokeLLM({
        prompt: dt.prompt(input),
      });
      setOutput(res);
      setIsAnimating(true);
      return res;
    },
    onSuccess: () => toast.success('Documentation generated!'),
    onError: () => toast.error('Generation failed. Please try again.'),
  });

  const copyOutput = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadDoc = () => {
    const dt = DOC_TYPES.find(d => d.id === docType);
    const ext = docType === 'api' ? 'md' : 'md';
    const blob = new Blob([output], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${dt.label.toLowerCase().replace(/\s+/g, '-').replace('.md', '')}.md`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Downloaded!');
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-heading font-bold">Documentation Center</h1>
        <p className="text-muted-foreground mt-1">AI-generated production-quality documentation</p>
      </motion.div>

      {/* Doc type selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {DOC_TYPES.map((dt, i) => (
          <motion.button
            key={dt.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => { setDocType(dt.id); setOutput(''); setDisplayedOutput(''); }}
            className={`p-4 rounded-xl border text-left transition-all ${
              docType === dt.id
                ? 'border-primary/50 bg-primary/10'
                : 'glass border-border/50 hover:border-primary/30'
            }`}
          >
            <dt.icon className={`w-5 h-5 mb-2 ${docType === dt.id ? 'text-primary' : 'text-muted-foreground'}`} />
            <p className="text-sm font-semibold">{dt.label}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{dt.description}</p>
          </motion.button>
        ))}
      </div>

      {/* Input */}
      <GlassCard className="p-5">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe your project or paste context...\n\nExample: 'A Next.js 14 SaaS dashboard with Prisma ORM, PostgreSQL, Stripe payments, NextAuth.js, deployed on Vercel. Users can manage subscriptions, view analytics, and export data.'"
          className="bg-secondary/30 border-border/50 min-h-[120px] mb-4"
        />
        <Button
          onClick={() => generateMutation.mutate()}
          disabled={!input.trim() || generateMutation.isPending}
          className="bg-gradient-to-r from-neon-blue to-neon-cyan text-white hover:opacity-90"
        >
          {generateMutation.isPending ? (
            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating...</>
          ) : (
            <><FileText className="w-4 h-4 mr-2" /> Generate {DOC_TYPES.find(d => d.id === docType)?.label}</>
          )}
        </Button>
      </GlassCard>

      {/* Loading skeleton */}
      {generateMutation.isPending && (
        <GlassCard className="p-6 animate-pulse space-y-3">
          <div className="h-6 bg-secondary/50 rounded w-1/3" />
          <div className="h-3 bg-secondary/50 rounded w-full" />
          <div className="h-3 bg-secondary/50 rounded w-5/6" />
          <div className="h-3 bg-secondary/50 rounded w-4/5" />
          <div className="h-20 bg-secondary/50 rounded w-full" />
          <div className="h-3 bg-secondary/50 rounded w-2/3" />
          <div className="h-3 bg-secondary/50 rounded w-full" />
        </GlassCard>
      )}

      {/* Output */}
      <AnimatePresence>
        {displayedOutput && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <GlassCard className="overflow-hidden">
              {/* Toolbar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-secondary/10">
                <FileText className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">{DOC_TYPES.find(d => d.id === docType)?.label}</span>
                {isAnimating && <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse ml-1" />}
                <div className="ml-auto flex items-center gap-2">
                  <div className="flex gap-1 bg-secondary/40 rounded-lg p-0.5">
                    <button
                      onClick={() => setViewMode('preview')}
                      className={`px-2.5 py-1 rounded-md text-xs transition-all ${viewMode === 'preview' ? 'bg-secondary/80 text-foreground' : 'text-muted-foreground'}`}
                    >
                      Preview
                    </button>
                    <button
                      onClick={() => setViewMode('raw')}
                      className={`px-2.5 py-1 rounded-md text-xs transition-all ${viewMode === 'raw' ? 'bg-secondary/80 text-foreground' : 'text-muted-foreground'}`}
                    >
                      Markdown
                    </button>
                  </div>
                  <button onClick={copyOutput} className="p-1.5 text-muted-foreground hover:text-foreground">
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                  {output && !isAnimating && (
                    <button onClick={downloadDoc} className="p-1.5 text-muted-foreground hover:text-foreground">
                      <Download className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              <div className="p-6 max-h-[70vh] overflow-y-auto">
                {viewMode === 'preview' ? (
                  <div className="prose prose-invert prose-sm max-w-none">
                    <ReactMarkdown
                      components={{
                        code({ inline, className, children, ...props }) {
                          if (inline) return <code className="bg-secondary/60 text-primary px-1.5 py-0.5 rounded text-xs font-mono">{children}</code>;
                          const lang = /language-(\w+)/.exec(className || '')?.[1] || '';
                          return (
                            <div className="my-3 rounded-lg overflow-hidden border border-border/40">
                              {lang && <div className="px-3 py-1.5 bg-secondary/50 border-b border-border/40 text-xs text-muted-foreground">{lang}</div>}
                              <pre className="p-4 overflow-x-auto text-xs bg-card/40 m-0">
                                <code className="font-mono">{children}</code>
                              </pre>
                            </div>
                          );
                        },
                        h1: ({ children }) => <h1 className="text-2xl font-heading font-bold mt-0 mb-4 pb-2 border-b border-border/40">{children}</h1>,
                        h2: ({ children }) => <h2 className="text-xl font-heading font-bold mt-6 mb-3">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-base font-heading font-semibold mt-4 mb-2">{children}</h3>,
                        p: ({ children }) => <p className="my-2 text-sm text-foreground/85 leading-relaxed">{children}</p>,
                        ul: ({ children }) => <ul className="my-2 ml-4 space-y-1 list-disc">{children}</ul>,
                        ol: ({ children }) => <ol className="my-2 ml-4 space-y-1 list-decimal">{children}</ol>,
                        li: ({ children }) => <li className="text-sm text-foreground/80">{children}</li>,
                        blockquote: ({ children }) => <blockquote className="border-l-2 border-primary/40 pl-4 my-3 text-muted-foreground italic">{children}</blockquote>,
                        a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{children}</a>,
                        table: ({ children }) => <div className="overflow-x-auto my-3"><table className="w-full text-xs border-collapse">{children}</table></div>,
                        th: ({ children }) => <th className="border border-border/40 px-3 py-2 bg-secondary/50 font-semibold text-left">{children}</th>,
                        td: ({ children }) => <td className="border border-border/40 px-3 py-2">{children}</td>,
                      }}
                    >
                      {displayedOutput}
                    </ReactMarkdown>
                    {isAnimating && (
                      <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-0.5 rounded-sm align-middle" />
                    )}
                  </div>
                ) : (
                  <pre className="text-xs font-mono text-foreground/80 whitespace-pre-wrap leading-relaxed">{displayedOutput}</pre>
                )}
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}