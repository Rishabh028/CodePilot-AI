import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Zap, Target, Users, Code2, Shield, Rocket, ArrowRight,
  Sparkles, Bot, GitPullRequest, CheckCircle2, Star, Building2, GraduationCap, Briefcase
} from 'lucide-react';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';

const DIFFERENTIATORS = [
  { icon: Bot, title: 'Multi-Agent Orchestration', desc: '8 specialized agents work together, each expert in their domain — unlike single-model tools.', color: '#8B5CF6' },
  { icon: Code2, title: 'Full Development Lifecycle', desc: 'From requirements to deployment, every phase is covered. No switching between tools.', color: '#06B6D4' },
  { icon: Shield, title: 'Security-First by Design', desc: 'Security scanning is built into every workflow, not bolted on as an afterthought.', color: '#EC4899' },
  { icon: Rocket, title: 'Production-Ready Output', desc: 'All generated code, tests, and configs are ready to ship — not just proof-of-concept demos.', color: '#10B981' },
];

const WHO_FOR = [
  { icon: GraduationCap, title: 'Students & Learners', desc: 'Understand any codebase, generate projects to learn from, and get expert-level code reviews on your work.', color: '#8B5CF6' },
  { icon: Code2, title: 'Individual Developers', desc: 'Ship 10x faster by offloading boilerplate, reviews, security scanning, and testing to AI agents.', color: '#06B6D4' },
  { icon: Users, title: 'Development Teams', desc: 'Standardize code quality, automate PR reviews, and keep your team focused on creative problem-solving.', color: '#F59E0B' },
  { icon: Building2, title: 'Startups & Enterprises', desc: 'Move from idea to deployed product faster than ever, with enterprise-grade security and quality built in.', color: '#10B981' },
];

const ROADMAP = [
  { phase: 'Q1 2026', title: 'Core Platform', items: ['8 AI Agents', 'Code Studio', 'Security Scanner', 'Test Generator'], done: true },
  { phase: 'Q2 2026', title: 'Collaboration', items: ['Team Workspaces', 'Real-Time Editing', 'Comment Threads', 'Role Management'], done: false },
  { phase: 'Q3 2026', title: 'Intelligence', items: ['Repo RAG Chat', 'Custom Agent Training', 'Multi-Repo Analysis', 'AI Code Suggestions'], done: false },
  { phase: 'Q4 2026', title: 'Enterprise', items: ['SSO / SAML', 'Audit Logs', 'Self-Hosted Option', 'SLA & Support'], done: false },
];

const ARCH_LAYERS = [
  { label: 'User Interface', items: 'React · TypeScript · Tailwind CSS · Framer Motion', color: '#8B5CF6' },
  { label: 'Agent Orchestration', items: 'Requirements · Code Gen · Review · Security · Testing · Docs · Deploy · Performance', color: '#06B6D4' },
  { label: 'AI Infrastructure', items: 'Large Language Models · RAG Pipeline · Vector Search · Streaming', color: '#3B82F6' },
  { label: 'Data & Storage', items: 'Entity Database · File Storage · Real-Time Subscriptions · Analytics', color: '#10B981' },
  { label: 'Deployment Layer', items: 'Docker · Vercel · Render · Railway · AWS · CI/CD Pipelines', color: '#EF4444' },
];

function SectionTitle({ eyebrow, title, sub, align = 'center' }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      className={`mb-14 ${align === 'center' ? 'text-center max-w-3xl mx-auto' : ''}`}>
      {eyebrow && <p className="text-xs tracking-[0.3em] uppercase text-[#94A3B8] mb-4">{eyebrow}</p>}
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">{title}</h2>
      {sub && <p className="text-[#94A3B8] leading-relaxed">{sub}</p>}
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <div style={{ background: '#05010D' }} className="min-h-screen">
      <Navbar />
      <div className="h-16" />

      {/* Hero */}
      <section className="py-20 relative overflow-hidden text-center">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.1) 0%, transparent 60%)' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-6"
              style={{ background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.3)', color: '#A78BFA' }}>
              <Zap className="w-3.5 h-3.5" /> About CodePilot AI
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-white mb-6 leading-tight">
              Your Autonomous <span className="bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] bg-clip-text text-transparent">AI Software<br />Engineering Team</span>
            </h1>
            <p className="text-lg text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
              CodePilot AI is a complete autonomous software engineering platform where 8 specialized AI agents handle every phase of development — from requirements analysis to production deployment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20" style={{ background: '#0B0A18' }}>
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Target, title: 'Our Vision', color: '#8B5CF6', text: 'A world where every developer — regardless of experience — can ship production-grade software at the speed of thought, backed by an AI team that never sleeps.' },
              { icon: Sparkles, title: 'Our Mission', color: '#06B6D4', text: 'To democratize software engineering by giving every developer, team, and startup access to an autonomous AI engineering team that handles the full development lifecycle.' },
            ].map((item, i) => (
              <motion.div key={item.title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className="p-8 rounded-2xl"
                style={{ background: 'rgba(15,23,42,0.55)', border: `1px solid ${item.color}20`, backdropFilter: 'blur(12px)' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}>
                  <item.icon className="w-6 h-6" style={{ color: item.color }} />
                </div>
                <h3 className="text-xl font-heading font-bold text-white mb-3">{item.title}</h3>
                <p className="text-[#94A3B8] leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why It Was Built */}
      <section className="py-20" style={{ background: '#05010D' }}>
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <SectionTitle eyebrow="The Problem" title="Why CodePilot AI Was Built"
            sub="Traditional development is slow, fragmented, and inaccessible. Developers juggle dozens of tools — IDEs, linters, CI/CD, security scanners, test frameworks — losing hours to tooling instead of building." />
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { problem: 'Context switching kills productivity', solution: 'One unified platform for the entire lifecycle' },
              { problem: 'Security is always an afterthought', solution: 'Security scanning built into every workflow' },
              { problem: 'Boilerplate wastes engineering time', solution: 'AI generates scaffolding, tests, and docs instantly' },
            ].map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-5 rounded-2xl"
                style={{ background: 'rgba(15,23,42,0.55)', border: '1px solid rgba(139,92,246,0.1)' }}>
                <p className="text-xs text-red-400 mb-2 font-medium">❌ Problem</p>
                <p className="text-sm text-white mb-4">{item.problem}</p>
                <p className="text-xs text-emerald-400 mb-2 font-medium">✅ Solution</p>
                <p className="text-sm text-[#94A3B8]">{item.solution}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes It Different */}
      <section className="py-20" style={{ background: '#0B0A18' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <SectionTitle eyebrow="Differentiators" title="What Makes CodePilot AI Different" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {DIFFERENTIATORS.map((d, i) => (
              <motion.div key={d.title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl text-center"
                style={{ background: 'rgba(15,23,42,0.55)', border: `1px solid ${d.color}20` }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: `${d.color}15`, border: `1px solid ${d.color}30` }}>
                  <d.icon className="w-6 h-6" style={{ color: d.color }} />
                </div>
                <h3 className="text-sm font-semibold text-white mb-2">{d.title}</h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">{d.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Architecture */}
      <section className="py-20" style={{ background: '#05010D' }}>
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <SectionTitle eyebrow="Architecture" title="Platform Architecture" sub="A layered system designed for reliability, scalability, and developer experience." />
          <div className="space-y-3">
            {ARCH_LAYERS.map((layer, i) => (
              <motion.div key={layer.label}
                initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 p-4 rounded-xl"
                style={{ background: 'rgba(15,23,42,0.55)', border: `1px solid ${layer.color}15` }}>
                <span className="text-xs font-bold px-2 py-1 rounded-lg flex-shrink-0"
                  style={{ background: `${layer.color}15`, color: layer.color, border: `1px solid ${layer.color}30` }}>
                  L{i + 1}
                </span>
                <div>
                  <p className="text-sm font-semibold text-white mb-0.5">{layer.label}</p>
                  <p className="text-xs text-[#94A3B8]">{layer.items}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Should Use It */}
      <section className="py-20" style={{ background: '#0B0A18' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <SectionTitle eyebrow="Who It's For" title="Built for Every Developer" sub="Whether you're a student or a seasoned CTO, CodePilot AI scales to your needs." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHO_FOR.map((w, i) => (
              <motion.div key={w.title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl"
                style={{ background: 'rgba(15,23,42,0.55)', border: `1px solid ${w.color}20` }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${w.color}15`, border: `1px solid ${w.color}30` }}>
                  <w.icon className="w-5 h-5" style={{ color: w.color }} />
                </div>
                <h3 className="text-sm font-semibold text-white mb-2">{w.title}</h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">{w.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-20" style={{ background: '#05010D' }}>
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <SectionTitle eyebrow="Future" title="Roadmap" sub="What's coming next for CodePilot AI." />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {ROADMAP.map((phase, i) => (
              <motion.div key={phase.phase}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-5 rounded-2xl"
                style={{ background: 'rgba(15,23,42,0.55)', border: `1px solid ${phase.done ? 'rgba(16,185,129,0.3)' : 'rgba(139,92,246,0.15)'}` }}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold" style={{ color: phase.done ? '#10B981' : '#8B5CF6' }}>{phase.phase}</span>
                  {phase.done && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                </div>
                <h3 className="text-sm font-semibold text-white mb-3">{phase.title}</h3>
                <ul className="space-y-1.5">
                  {phase.items.map(item => (
                    <li key={item} className="flex items-center gap-2 text-xs text-[#94A3B8]">
                      <div className="w-1 h-1 rounded-full flex-shrink-0"
                        style={{ background: phase.done ? '#10B981' : '#8B5CF6' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center" style={{ background: '#0B0A18' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="max-w-2xl mx-auto px-4">
          <h2 className="text-4xl font-heading font-bold text-white mb-4">
            Ready to <span className="bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] bg-clip-text text-transparent">Start Building?</span>
          </h2>
          <p className="text-[#94A3B8] mb-8">Join thousands of developers building faster with their AI engineering team.</p>
          <Link to="/dashboard">
            <motion.button whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(139,92,246,0.4)' }} whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white"
              style={{ background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)' }}>
              <Sparkles className="w-4 h-4" /> Start Building Free <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </motion.div>
      </section>
      <FooterSection />
    </div>
  );
}