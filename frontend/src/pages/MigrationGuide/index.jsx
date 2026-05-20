import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Code2, Database, Shield, Rocket, Server,
  Globe, Key, GitBranch, Package, Terminal, CheckCircle2,
  ChevronDown, ChevronRight, Zap, Layers, Settings, Cloud,
  CreditCard, Cpu, FileCode
} from 'lucide-react';
import { SECTIONS } from './sections';
import ContentRenderer from './ContentRenderer';

const ICONS = {
  overview: BookOpen, architecture: Layers, structure: FileCode,
  localsetup: Terminal, database: Database, auth: Shield,
  agents: Cpu, storage: Cloud, billing: CreditCard,
  docker: Server, envvars: Key, export: Settings, checklist: CheckCircle2,
};

export default function MigrationGuide() {
  const [openSection, setOpenSection] = useState('overview');

  return (
    <div className="min-h-screen" style={{ background: '#05010D' }}>
      {/* Header */}
      <div className="sticky top-0 z-20 glass-strong border-b"
        style={{ borderColor: 'rgba(139,92,246,0.15)' }}>
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#06B6D4] flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="font-heading font-bold text-white text-sm">CodePilot AI — Full Migration Guide</h1>
            <p className="text-xs text-[#94A3B8]">Rebuild independently • Own everything • Zero Base44 dependency</p>
          </div>
          <div className="ml-auto">
            <span className="text-xs px-2 py-1 rounded-full"
              style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', color: '#6EE7B7' }}>
              {SECTIONS.length} Sections
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Intro Banner */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="p-5 rounded-xl mb-8"
          style={{ background: 'linear-gradient(135deg,rgba(139,92,246,0.1),rgba(6,182,212,0.05))', border: '1px solid rgba(139,92,246,0.2)' }}>
          <div className="flex items-start gap-3">
            <BookOpen className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="font-heading font-bold text-white mb-1">How to Use This Guide</h2>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                This is a complete technical guide to rebuild CodePilot AI as a 100% independent production application.
                Covers: monorepo setup, PostgreSQL + Prisma schema, Clerk auth with Google OAuth, all 8 AI agents with streaming,
                S3 storage, Stripe billing, Docker, GitHub Actions CI/CD, and Vercel + Railway deployment.
                <span className="text-purple-300 font-medium"> Your frontend React code is yours</span> — export it via Base44's GitHub Sync, then replace Base44 SDK calls with your own API client using the migration map in Section 12.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {['Next.js 15','NestJS','PostgreSQL','Prisma','Clerk','OpenAI','Stripe','S3','Vercel','Railway','BullMQ'].map(t => (
            <span key={t} className="text-xs px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.15)', color: '#C4B5FD' }}>
              {t}
            </span>
          ))}
        </div>

        {/* Sections */}
        <div className="space-y-3">
          {SECTIONS.map((section, idx) => {
            const Icon = ICONS[section.id] || BookOpen;
            const isOpen = openSection === section.id;

            return (
              <motion.div key={section.id}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
                className="rounded-xl overflow-hidden"
                style={{
                  border: `1px solid ${isOpen ? 'rgba(139,92,246,0.3)' : 'rgba(139,92,246,0.1)'}`,
                  background: isOpen ? 'rgba(11,10,24,0.9)' : 'rgba(11,10,24,0.4)'
                }}>

                {/* Section header */}
                <button
                  onClick={() => setOpenSection(isOpen ? null : section.id)}
                  className="w-full flex items-center gap-3 p-4 text-left hover:bg-white/[0.02] transition-colors">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: isOpen ? 'rgba(139,92,246,0.2)' : 'rgba(255,255,255,0.05)',
                      border: `1px solid ${isOpen ? 'rgba(139,92,246,0.4)' : 'rgba(255,255,255,0.08)'}`
                    }}>
                    <Icon className={`w-4 h-4 ${isOpen ? 'text-purple-400' : 'text-[#94A3B8]'}`} />
                  </div>
                  <span className={`font-medium text-sm flex-1 ${isOpen ? 'text-white' : 'text-[#94A3B8]'}`}>
                    {section.title}
                  </span>
                  {isOpen
                    ? <ChevronDown className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    : <ChevronRight className="w-4 h-4 text-[#94A3B8] flex-shrink-0" />
                  }
                </button>

                {/* Section content */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden">
                      <div className="px-5 pb-6 pt-2 border-t"
                        style={{ borderColor: 'rgba(139,92,246,0.1)' }}>
                        <ContentRenderer raw={section.content} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Footer */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="mt-10 p-6 rounded-xl text-center"
          style={{ background: 'linear-gradient(135deg,rgba(139,92,246,0.1),rgba(6,182,212,0.05))', border: '1px solid rgba(139,92,246,0.2)' }}>
          <h3 className="font-heading font-bold text-white mb-2">Start Building Today</h3>
          <p className="text-sm text-[#94A3B8] mb-4">
            Work through sections sequentially. Estimated time to full production deployment:{' '}
            <span className="text-purple-300 font-medium">1–2 weeks</span> for an experienced developer.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {[
              { label: 'Clerk Auth →', href: 'https://clerk.com', color: 'rgba(139,92,246,0.2)', border: 'rgba(139,92,246,0.3)', text: '#C4B5FD' },
              { label: 'Railway →', href: 'https://railway.app', color: 'rgba(6,182,212,0.1)', border: 'rgba(6,182,212,0.2)', text: '#67E8F9' },
              { label: 'Neon DB →', href: 'https://neon.tech', color: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.2)', text: '#6EE7B7' },
              { label: 'Vercel →', href: 'https://vercel.com', color: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.1)', text: '#E2E8F0' },
              { label: 'OpenAI →', href: 'https://platform.openai.com', color: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.15)', text: '#6EE7B7' },
              { label: 'Stripe →', href: 'https://stripe.com', color: 'rgba(99,102,241,0.1)', border: 'rgba(99,102,241,0.2)', text: '#A5B4FC' },
            ].map(l => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                className="text-xs px-3 py-1.5 rounded-lg transition-opacity hover:opacity-80"
                style={{ background: l.color, border: `1px solid ${l.border}`, color: l.text }}>
                {l.label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}