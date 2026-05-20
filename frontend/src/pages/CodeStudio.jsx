import React, { useState, useEffect, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2, Play, Sparkles, Copy, Check, FileCode, Wand2,
  TestTube, Shield, MessageSquare, Loader2, RotateCcw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import ReactMarkdown from 'react-markdown';
import GlassCard from '@/components/shared/GlassCard.jsx';

const ACTIONS = [
  { id: 'generate', label: 'Generate', icon: Sparkles },
  { id: 'refactor', label: 'Refactor', icon: Wand2 },
  { id: 'explain', label: 'Explain', icon: MessageSquare },
  { id: 'test', label: 'Test', icon: TestTube },
  { id: 'secure', label: 'Secure', icon: Shield },
];

const LANGUAGES = [
  'typescript', 'javascript', 'python', 'c', 'c++', 'c#', 'java',
  'rust', 'go', 'kotlin', 'swift', 'ruby', 'php', 'dart',
  'r', 'scala', 'haskell', 'lua', 'perl', 'sql', 'bash', 'yaml', 'html', 'css'
];

const buildPrompt = (action, language, code) => {
  const base = `Language: ${language}\n\n${code}`;
  const p = {
    generate: `You are an expert ${language} developer. Generate production-ready code based on this description:\n\n${code}\n\nOutput complete, working code with proper error handling, TypeScript types (if applicable), comments, and best practices. Format with proper code blocks.`,
    refactor: `You are an expert code refactoring specialist. Refactor this ${language} code for maximum quality:\n\n${base}\n\nImprove: readability, performance, naming, structure, error handling, and patterns. Show the refactored code with explanations of each change.`,
    explain: `You are a code educator. Explain this ${language} code in depth:\n\n${base}\n\nCover: purpose, how it works step-by-step, key concepts, design patterns used, potential issues, and improvement suggestions. Use clear language with examples.`,
    test: `You are a testing expert. Write comprehensive tests for this ${language} code:\n\n${base}\n\nGenerate: unit tests for all functions/methods, edge cases, error scenarios, mock implementations, and a test runner config. Aim for 90%+ coverage.`,
    secure: `You are a security expert. Audit this ${language} code for vulnerabilities:\n\n${base}\n\nFind and explain: injection vulnerabilities, authentication issues, data exposure risks, insecure patterns, and provide secure fix examples for each issue found.`,
  };
  return p[action] || p.generate;
};

export default function CodeStudio() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('typescript');
  const [action, setAction] = useState('generate');
  const [output, setOutput] = useState('');
  const [displayedOutput, setDisplayedOutput] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [copied, setCopied] = useState(false);
  const animIdx = useRef(0);

  // Streaming animation
  useEffect(() => {
    if (!output || !isAnimating) return;
    setDisplayedOutput('');
    animIdx.current = 0;
  }, [output, isAnimating]);

  useEffect(() => {
    if (!isAnimating || !output || animIdx.current >= (output?.length || 0)) {
      if (animIdx.current >= (output?.length || 0) && isAnimating) setIsAnimating(false);
      return;
    }
    const chunkSize = output.length > 3000 ? 30 : 8;
    const speed = output.length > 3000 ? 10 : 15;
    const timer = setTimeout(() => {
      animIdx.current += chunkSize;
      setDisplayedOutput((output || '').slice(0, animIdx.current));
    }, speed);
    return () => clearTimeout(timer);
  }, [isAnimating, output, displayedOutput]);

  const generateMutation = useMutation({
    mutationFn: async () => {
      const res = await base44.integrations.Core.InvokeLLM({
        prompt: buildPrompt(action, language, code),
        response_json_schema: {
          type: 'object',
          properties: {
            output: { type: 'string', description: 'Generated code or response' },
            explanation: { type: 'string', description: 'Explanation of what was generated' },
          }
        }
      });
      const outputText = res?.output || res?.explanation || (typeof res === 'string' ? res : '');
      setOutput(outputText);
      setIsAnimating(true);
      return outputText;
    },
    onSuccess: () => toast.success('Code generated successfully!'),
    onError: () => toast.error('Generation failed. Please try again.'),
  });

  const copyOutput = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => {
    setCode('');
    setOutput('');
    setDisplayedOutput('');
    setIsAnimating(false);
  };

  const currentAction = ACTIONS.find(a => a.id === action);

  return (
    <div className="space-y-5 h-full">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-heading font-bold">Code Studio</h1>
        <p className="text-muted-foreground mt-1">AI-powered code generation and editing</p>
      </motion.div>

      {/* Action bar */}
      <GlassCard className="p-3">
        <div className="flex flex-wrap items-center gap-3">
          {/* Action tabs */}
          <div className="flex gap-1.5 bg-secondary/30 p-1 rounded-lg">
            {ACTIONS.map(a => (
              <button
                key={a.id}
                onClick={() => setAction(a.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  action === a.id
                    ? 'bg-primary/20 text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <a.icon className="w-3.5 h-3.5" />
                {a.label}
              </button>
            ))}
          </div>

          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-36 bg-secondary/30 border-border/50 h-8 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="glass-strong border-border/50">
              {LANGUAGES.map(lang => (
                <SelectItem key={lang} value={lang} className="capitalize">{lang}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="ml-auto flex items-center gap-2">
            {(code || output) && (
              <Button size="sm" variant="ghost" onClick={clearAll} className="h-8 text-xs text-muted-foreground">
                <RotateCcw className="w-3.5 h-3.5 mr-1" /> Clear
              </Button>
            )}
            <Button
              onClick={() => generateMutation.mutate()}
              disabled={!code.trim() || generateMutation.isPending}
              size="sm"
              className="bg-gradient-to-r from-neon-purple to-neon-cyan text-white hover:opacity-90 h-8"
            >
              {generateMutation.isPending ? (
                <><Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" /> Processing...</>
              ) : (
                <><Play className="w-3.5 h-3.5 mr-1.5" /> {currentAction?.label}</>
              )}
            </Button>
          </div>
        </div>
      </GlassCard>

      {/* Split Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4" style={{ minHeight: 480 }}>
        {/* Input */}
        <GlassCard className="flex flex-col overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 flex-shrink-0">
            <FileCode className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Input</span>
            <Badge variant="outline" className="text-xs ml-auto capitalize">{language}</Badge>
          </div>
          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) generateMutation.mutate();
            }}
            placeholder={
              action === 'generate'
                ? 'Describe what you want to generate...\n\nExample: Create a REST API with Express.js for a todo app with CRUD operations, JWT auth, rate limiting, and Prisma ORM for PostgreSQL'
                : 'Paste your code here...'
            }
            className="flex-1 border-0 rounded-none bg-transparent font-mono text-sm resize-none focus-visible:ring-0 placeholder:text-muted-foreground/40"
          />
          <div className="px-3 py-2 border-t border-border/40 bg-secondary/10">
            <p className="text-xs text-muted-foreground">
              <kbd className="bg-secondary/60 px-1.5 py-0.5 rounded text-[10px]">⌘ Enter</kbd> to run
            </p>
          </div>
        </GlassCard>

        {/* Output */}
        <GlassCard className="flex flex-col overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 flex-shrink-0">
            <Code2 className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium">Output</span>
            {isAnimating && (
              <div className="flex items-center gap-1.5 ml-2">
                <div className="w-1.5 h-1.5 bg-neon-cyan rounded-full animate-pulse" />
                <span className="text-xs text-neon-cyan">Generating...</span>
              </div>
            )}
            {output && !isAnimating && (
              <button onClick={copyOutput} className="ml-auto text-muted-foreground hover:text-foreground">
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {generateMutation.isPending && !output ? (
              <div className="flex flex-col items-center justify-center h-full gap-4">
                <div className="relative">
                  <Loader2 className="w-10 h-10 text-primary animate-spin" />
                  <div className="absolute inset-0 w-10 h-10 border-2 border-primary/20 rounded-full animate-ping" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground">AI is working...</p>
                  <p className="text-xs text-muted-foreground mt-1">Generating {language} code</p>
                </div>
                <div className="space-y-2 w-full max-w-xs mt-2">
                  <div className="h-2.5 bg-secondary/50 rounded-full animate-pulse" />
                  <div className="h-2.5 bg-secondary/50 rounded-full animate-pulse w-4/5" />
                  <div className="h-2.5 bg-secondary/50 rounded-full animate-pulse w-3/5" />
                </div>
              </div>
            ) : displayedOutput ? (
              <div className="prose prose-invert prose-sm max-w-none">
                <ReactMarkdown
                  components={{
                    code({ inline, className, children, ...props }) {
                      if (inline) return <code className="bg-secondary/60 text-primary px-1.5 py-0.5 rounded text-xs font-mono">{children}</code>;
                      const lang = /language-(\w+)/.exec(className || '')?.[1] || '';
                      return (
                        <div className="my-2 rounded-lg overflow-hidden border border-border/40">
                          {lang && (
                            <div className="flex items-center justify-between px-3 py-1.5 bg-secondary/50 border-b border-border/40">
                              <span className="text-xs text-muted-foreground">{lang}</span>
                              <button onClick={() => { navigator.clipboard.writeText(String(children)); toast.success('Copied!'); }} className="text-muted-foreground hover:text-foreground">
                                <Copy className="w-3 h-3" />
                              </button>
                            </div>
                          )}
                          <pre className="p-3 overflow-x-auto text-xs bg-card/40 m-0">
                            <code className="font-mono text-foreground/85">{children}</code>
                          </pre>
                        </div>
                      );
                    },
                    p: ({ children }) => <p className="my-2 text-sm text-foreground/85">{children}</p>,
                    h1: ({ children }) => <h1 className="text-lg font-bold mt-4 mb-2">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-base font-semibold mt-3 mb-2">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-sm font-semibold mt-2 mb-1">{children}</h3>,
                    ul: ({ children }) => <ul className="my-1 ml-4 space-y-0.5 list-disc">{children}</ul>,
                    li: ({ children }) => <li className="text-sm text-foreground/80">{children}</li>,
                  }}
                >
                  {displayedOutput}
                </ReactMarkdown>
                {isAnimating && (
                  <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-0.5 rounded-sm align-middle" />
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <Code2 className="w-10 h-10 text-muted-foreground/40 mb-3" />
                <p className="text-sm text-muted-foreground">Output will appear here</p>
                <p className="text-xs text-muted-foreground/60 mt-1">Enter code or a description, then click Run</p>
              </div>
            )}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}