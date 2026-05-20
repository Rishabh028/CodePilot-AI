import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, MessageSquare, Bot, Code2, GitPullRequest, ShieldCheck, FlaskConical, CloudUpload } from 'lucide-react';

const FEATURES = [
  {
    icon: Rocket, title: 'Build New Project', color: '#8B5CF6', badge: 'AI-Powered',
    desc: 'Create full-stack projects from natural language requirements and generate complete application architectures in minutes.',
    tag: 'Multi-Framework'
  },
  {
    icon: MessageSquare, title: 'Repository AI Chat', color: '#06B6D4', badge: 'RAG',
    desc: 'Ask questions about your codebase, understand architecture, and get context-aware answers powered by repository-aware intelligence.',
    tag: 'Context-Aware'
  },
  {
    icon: Bot, title: '8 Specialized AI Agents', color: '#A855F7', badge: '8 Agents',
    desc: 'Run Requirements, Code Generation, Review, Security, Testing, Documentation, Deployment, and Performance agents autonomously.',
    tag: 'Orchestrated'
  },
  {
    icon: Code2, title: 'Smart Code Studio', color: '#3B82F6', badge: 'Monaco IDE',
    desc: 'Edit generated code with syntax highlighting, file explorer, and AI-assisted development tools in a powerful in-browser IDE.',
    tag: 'Multi-Language'
  },
  {
    icon: GitPullRequest, title: 'Code Review Automation', color: '#F59E0B', badge: 'Automated',
    desc: 'Analyze code quality, maintainability, architecture, and best practices with automated PR-style reviews and actionable feedback.',
    tag: 'Best Practices'
  },
  {
    icon: ShieldCheck, title: 'Security Scanner', color: '#EC4899', badge: 'OWASP',
    desc: 'Detect vulnerabilities such as SQL injection, XSS, insecure authentication, and dependency risks with actionable fix suggestions.',
    tag: 'Production Ready'
  },
  {
    icon: FlaskConical, title: 'Automated Testing', color: '#10B981', badge: 'Jest/Vitest',
    desc: 'Generate unit and integration tests with coverage reports, edge-case suggestions, and framework-specific test suites.',
    tag: 'Full Coverage'
  },
  {
    icon: CloudUpload, title: 'One-Click Deployment', color: '#EF4444', badge: 'Docker + CI/CD',
    desc: 'Generate Dockerfiles, CI/CD pipelines, and deployment configurations for Vercel, Render, Railway, and AWS in seconds.',
    tag: 'Multi-Cloud'
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: '#0B0A18' }}>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at top, rgba(139,92,246,0.06) 0%, transparent 60%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-14 max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#94A3B8] mb-4">Powerful Features</p>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            Everything You Need to{' '}
            <span className="bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent">
              Build, Review, Secure &amp; Deploy
            </span>
          </h2>
          <p className="text-[#94A3B8] text-base leading-relaxed">
            CodePilot AI combines autonomous agents, repository intelligence, code generation, security analysis, and deployment automation into one powerful platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((f, i) => (
            <motion.div key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group p-5 rounded-2xl relative overflow-hidden cursor-default"
              style={{ background: 'rgba(15,23,42,0.55)', border: `1px solid ${f.color}20`, backdropFilter: 'blur(12px)' }}
            >
              {/* Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${f.color}15`, border: `1px solid ${f.color}30`, boxShadow: `0 0 16px ${f.color}20` }}>
                  <f.icon className="w-5 h-5" style={{ color: f.color }} />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{ background: `${f.color}15`, color: f.color, border: `1px solid ${f.color}30` }}>
                  {f.badge}
                </span>
              </div>

              <h3 className="text-sm font-heading font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed mb-3">{f.desc}</p>

              {/* Tag */}
              <div className="text-[10px] text-[#94A3B8] font-mono"
                style={{ color: f.color, opacity: 0.7 }}>
                # {f.tag}
              </div>

              {/* Hover glow overlay */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: `radial-gradient(circle at top left, ${f.color}08, transparent 60%)` }} />
              <div className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, transparent, ${f.color}60, transparent)` }} />
            </motion.div>
          ))}
        </div>

        {/* Secondary badges */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.4 }} className="mt-10 flex flex-wrap justify-center gap-2">
          {['Documentation Generator', 'Real-Time Collaboration', 'Usage Analytics', 'Stripe Billing', 'Team Workspaces', 'Deployment Logs', 'Audit Trails', 'Notifications'].map(label => (
            <span key={label} className="text-xs px-3 py-1.5 rounded-full text-[#94A3B8]"
              style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.15)' }}>
              + {label}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}