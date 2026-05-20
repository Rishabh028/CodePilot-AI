import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Rocket, MessageSquare, Bot, Code2, GitPullRequest, ShieldCheck,
  FlaskConical, CloudUpload, Sparkles, Eye, FileText, Gauge,
  ArrowRight, CheckCircle2, Zap
} from 'lucide-react';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';

const FEATURES = [
  { icon: Rocket, title: 'Build New Project', color: '#8B5CF6', tag: 'Multi-Framework', desc: 'Create full-stack projects from natural language requirements. Generate complete application architectures, folder structures, and initial codebases in minutes — no boilerplate needed.' },
  { icon: MessageSquare, title: 'Repository AI Chat', color: '#06B6D4', tag: 'RAG', desc: 'Ask questions about your codebase and get context-aware answers. Understand complex architectures, trace bugs, and explore unfamiliar repositories with AI-powered intelligence.' },
  { icon: Bot, title: '8 Specialized AI Agents', color: '#A855F7', tag: '8 Agents', desc: 'A complete autonomous engineering team. Each agent specializes in a different phase of software development, from requirements all the way through deployment and performance optimization.' },
  { icon: Code2, title: 'Smart Code Studio', color: '#3B82F6', tag: 'Monaco IDE', desc: 'Edit generated code with a powerful in-browser IDE featuring syntax highlighting, file explorer, multi-language support, and AI-assisted suggestions across 24+ programming languages.' },
  { icon: GitPullRequest, title: 'Code Review Automation', color: '#F59E0B', tag: 'Automated', desc: 'Analyze code quality, maintainability, architecture patterns, and best practices. Get actionable PR-style reviews with specific line-level suggestions and fix recommendations.' },
  { icon: ShieldCheck, title: 'Security Scanner', color: '#EC4899', tag: 'OWASP', desc: 'Detect SQL injection, XSS, CSRF, insecure auth, secrets in code, and dependency vulnerabilities. Get severity ratings and auto-fix suggestions for every issue found.' },
  { icon: FlaskConical, title: 'Automated Testing', color: '#10B981', tag: 'Jest/Vitest', desc: 'Generate unit and integration tests with full coverage reports. Get edge-case suggestions and framework-specific test suites for Jest, Vitest, Playwright, and Supertest.' },
  { icon: CloudUpload, title: 'One-Click Deployment', color: '#EF4444', tag: 'Docker + CI/CD', desc: 'Generate Dockerfiles, GitHub Actions workflows, and deployment configs for Vercel, Render, Railway, and AWS. Go from code to production in seconds.' },
];

const AGENTS = [
  { icon: Sparkles, title: 'Requirements Analyst', color: '#8B5CF6', purpose: 'Transforms vague requirements into structured technical specifications.', input: 'Natural language project description', output: 'Technical spec, user stories, architecture plan', when: 'Start every project here' },
  { icon: Code2, title: 'Code Generator', color: '#06B6D4', purpose: 'Generates production-ready code from specifications or prompts.', input: 'Requirements or feature description', output: 'Complete source files with proper structure', when: 'After requirements are defined' },
  { icon: Eye, title: 'Code Review Agent', color: '#F59E0B', purpose: 'Reviews code quality, patterns, and maintainability.', input: 'Existing code or generated files', output: 'Review report with line-level feedback', when: 'Before merging or shipping code' },
  { icon: ShieldCheck, title: 'Security Agent', color: '#EC4899', purpose: 'Scans for OWASP vulnerabilities and security risks.', input: 'Source code files', output: 'Severity-rated vulnerability report with fixes', when: 'Before any production deployment' },
  { icon: FlaskConical, title: 'Testing Agent', color: '#10B981', purpose: 'Generates comprehensive test suites with full coverage.', input: 'Code to be tested + framework preference', output: 'Unit & integration test files', when: 'After code generation or review' },
  { icon: FileText, title: 'Documentation Agent', color: '#3B82F6', purpose: 'Creates developer docs, API references, and README files.', input: 'Source code and project context', output: 'Markdown docs, API reference, usage guide', when: 'Before publishing or sharing' },
  { icon: CloudUpload, title: 'Deployment Agent', color: '#EF4444', purpose: 'Generates deployment assets and CI/CD configurations.', input: 'Project type and target platform', output: 'Dockerfile, CI/CD pipeline, deploy config', when: 'Ready to ship to production' },
  { icon: Gauge, title: 'Performance Agent', color: '#A855F7', purpose: 'Identifies bottlenecks and optimizes application performance.', input: 'Code or architecture description', output: 'Performance report with optimizations', when: 'Post-deployment or optimization phase' },
];

const STEPS = [
  { num: '01', title: 'Create Project', desc: 'Start a new project and describe what you want to build in plain English.' },
  { num: '02', title: 'Run Requirements Agent', desc: 'AI transforms your description into a complete technical specification.' },
  { num: '03', title: 'Generate Code', desc: 'Code Generator produces production-ready source files from the spec.' },
  { num: '04', title: 'Review & Secure', desc: 'Code Reviewer and Security Agent analyze and harden the generated code.' },
  { num: '05', title: 'Generate Tests', desc: 'Testing Agent creates full unit and integration test suites automatically.' },
  { num: '06', title: 'Create Docs', desc: 'Documentation Agent writes developer docs, API references, and READMEs.' },
  { num: '07', title: 'Deploy', desc: 'Deployment Agent generates Dockerfiles and CI/CD pipelines for one-click deploy.' },
];

function SectionTitle({ eyebrow, title, sub }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      className="text-center mb-14 max-w-3xl mx-auto">
      {eyebrow && <p className="text-xs tracking-[0.3em] uppercase text-[#94A3B8] mb-4">{eyebrow}</p>}
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">{title}</h2>
      {sub && <p className="text-[#94A3B8] leading-relaxed">{sub}</p>}
    </motion.div>
  );
}

export default function FeaturesPage() {
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
              <Zap className="w-3.5 h-3.5" /> Complete Platform Overview
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-white mb-6 leading-tight">
              Everything CodePilot AI <span className="bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] bg-clip-text text-transparent">Can Do</span>
            </h1>
            <p className="text-lg text-[#94A3B8] max-w-2xl mx-auto leading-relaxed mb-8">
              A complete autonomous software engineering platform powered by 8 specialized AI agents — from requirements to deployment.
            </p>
            <Link to="/dashboard">
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm text-white"
                style={{ background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)', boxShadow: '0 0 20px rgba(139,92,246,0.3)' }}>
                Start Building Free <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20" style={{ background: '#0B0A18' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <SectionTitle eyebrow="Core Platform" title="Core Platform Features" sub="Every module you need to build, review, secure, test, and deploy software — all in one place." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map((f, i) => (
              <motion.div key={f.title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group p-5 rounded-2xl relative overflow-hidden"
                style={{ background: 'rgba(15,23,42,0.55)', border: `1px solid ${f.color}20`, backdropFilter: 'blur(12px)' }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${f.color}15`, border: `1px solid ${f.color}30` }}>
                    <f.icon className="w-5 h-5" style={{ color: f.color }} />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background: `${f.color}15`, color: f.color, border: `1px solid ${f.color}30` }}>
                    {f.tag}
                  </span>
                </div>
                <h3 className="text-sm font-heading font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">{f.desc}</p>
                <div className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: `linear-gradient(90deg, transparent, ${f.color}60, transparent)` }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Agents */}
      <section className="py-20" style={{ background: '#05010D' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <SectionTitle eyebrow="AI Agents" title="8 Specialized AI Agents" sub="Each agent is purpose-built for a specific phase of software development." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {AGENTS.map((agent, i) => (
              <motion.div key={agent.title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                whileHover={{ y: -4 }}
                className="p-6 rounded-2xl"
                style={{ background: 'rgba(15,23,42,0.55)', border: `1px solid ${agent.color}20`, backdropFilter: 'blur(12px)' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${agent.color}15`, border: `1px solid ${agent.color}30` }}>
                    <agent.icon className="w-5 h-5" style={{ color: agent.color }} />
                  </div>
                  <h3 className="text-base font-heading font-semibold text-white">{agent.title}</h3>
                </div>
                <p className="text-sm text-[#94A3B8] mb-4 leading-relaxed">{agent.purpose}</p>
                <div className="grid grid-cols-3 gap-3">
                  {[['Input', agent.input], ['Output', agent.output], ['When', agent.when]].map(([label, val]) => (
                    <div key={label} className="rounded-lg p-2.5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <p className="text-[10px] text-[#94A3B8] uppercase tracking-wider mb-1">{label}</p>
                      <p className="text-xs text-white leading-relaxed">{val}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Step-by-step workflow */}
      <section className="py-20" style={{ background: '#0B0A18' }}>
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <SectionTitle eyebrow="How It Works" title="Step-by-Step Workflow" sub="From idea to production — follow these steps to ship with CodePilot AI." />
          <div className="space-y-4">
            {STEPS.map((step, i) => (
              <motion.div key={step.num}
                initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex items-start gap-5 p-5 rounded-2xl"
                style={{ background: 'rgba(15,23,42,0.55)', border: '1px solid rgba(139,92,246,0.1)' }}>
                <span className="text-2xl font-heading font-bold flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #8B5CF6, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {step.num}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-white mb-1">{step.title}</h3>
                  <p className="text-sm text-[#94A3B8]">{step.desc}</p>
                </div>
                <CheckCircle2 className="w-5 h-5 text-emerald-400 ml-auto flex-shrink-0 mt-0.5" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center" style={{ background: '#05010D' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="max-w-2xl mx-auto px-4">
          <h2 className="text-4xl font-heading font-bold text-white mb-4">
            Ready to Try It? <span className="bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] bg-clip-text text-transparent">Start Free.</span>
          </h2>
          <p className="text-[#94A3B8] mb-8">No credit card required. Full platform access from day one.</p>
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