import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Play, Loader2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const EXAMPLE_PROMPTS = {
  requirements: 'Build a SaaS analytics dashboard with user roles, real-time charts, and CSV exports',
  code_generator: 'Create a full-stack Next.js app with auth, Prisma ORM, and Stripe payments',
  code_review: 'Review this code for performance, security, and maintainability issues',
  security: 'Scan this Express.js API for SQL injection, XSS, and auth vulnerabilities',
  testing: 'Generate comprehensive unit and integration tests with 90%+ coverage',
  documentation: 'Generate README, API docs, and architecture overview for a REST API',
  deployment: 'Generate Dockerfile, docker-compose.yml, and GitHub Actions CI/CD pipeline',
  performance: 'Analyze database queries, caching strategy, and bundle optimization opportunities',
  general: 'Describe your software engineering task...',
};

export default function AgentPromptInput({ agentType, onSubmit, isLoading, className = '' }) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;
    onSubmit(prompt.trim());
    setPrompt('');
  };

  const examplePrompt = EXAMPLE_PROMPTS[agentType] || EXAMPLE_PROMPTS.general;

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className={`relative ${className}`}
    >
      <div className="glass rounded-xl border border-border/50 overflow-hidden focus-within:border-primary/40 transition-colors">
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSubmit(e);
          }}
          placeholder={examplePrompt}
          disabled={isLoading}
          className="border-0 rounded-none bg-transparent min-h-[100px] max-h-48 resize-none text-sm focus-visible:ring-0 placeholder:text-muted-foreground/50 font-body leading-relaxed"
        />
        <div className="flex items-center justify-between px-4 py-3 border-t border-border/40 bg-secondary/10">
          <p className="text-xs text-muted-foreground">
            <kbd className="bg-secondary/60 px-1.5 py-0.5 rounded text-[10px]">⌘ Enter</kbd>
            {' '}to submit
          </p>
          <Button
            type="submit"
            disabled={!prompt.trim() || isLoading}
            size="sm"
            className="bg-gradient-to-r from-neon-purple to-neon-cyan text-white hover:opacity-90 h-8 px-4"
          >
            {isLoading ? (
              <><Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" /> Running...</>
            ) : (
              <><Play className="w-3.5 h-3.5 mr-1.5" /> Run Agent</>
            )}
          </Button>
        </div>
      </div>
    </motion.form>
  );
}