import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Code2, Eye, Shield, TestTube, FileText, Rocket, Gauge } from 'lucide-react';
import { Link } from 'react-router-dom';

const AGENTS = [
  { icon: Sparkles, label: 'Requirements', desc: 'Analyze requirements and create technical specifications.', color: '#8B5CF6', slug: 'requirements' },
  { icon: Code2, label: 'Code Generator', desc: 'Generate production-ready code from any prompt.', color: '#06B6D4', slug: 'code_generator' },
  { icon: Eye, label: 'Code Reviewer', desc: 'Review code quality and best practices.', color: '#F59E0B', slug: 'code_review' },
  { icon: Shield, label: 'Security Agent', desc: 'Detect vulnerabilities and suggest fixes.', color: '#EC4899', slug: 'security' },
  { icon: TestTube, label: 'Testing Agent', desc: 'Generate unit and integration tests.', color: '#10B981', slug: 'testing' },
  { icon: FileText, label: 'Docs Agent', desc: 'Create documentation and API references.', color: '#3B82F6', slug: 'documentation' },
  { icon: Rocket, label: 'Deploy Agent', desc: 'Deploy applications with CI/CD.', color: '#EF4444', slug: 'deployment' },
  { icon: Gauge, label: 'Performance', desc: 'Optimize performance and reduce bottlenecks.', color: '#A855F7', slug: 'performance' },
];

export default function AgentsSection() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: '#05010D' }}>
      <div className="absolute inset-0" style={{
        backgroundImage: 'linear-gradient(rgba(139,92,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.03) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-14">
          <p className="text-xs tracking-[0.3em] uppercase text-[#94A3B8] mb-4">8 AI Agents. Endless Possibilities.</p>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white">
            Meet Your <span className="bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] bg-clip-text text-transparent">AI Engineering Team</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {AGENTS.map((agent, i) => (
            <Link to="/agents" key={agent.label}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -8, scale: 1.04 }}
                className="group p-4 rounded-2xl text-center cursor-pointer transition-all duration-300 relative"
                style={{ border: `1px solid ${agent.color}25`, backdropFilter: 'blur(10px)', background: 'rgba(15,23,42,0.5)' }}
              >
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                  style={{ background: `${agent.color}15`, border: `1px solid ${agent.color}30`, boxShadow: `0 0 20px ${agent.color}20` }}
                >
                  <agent.icon className="w-5 h-5" style={{ color: agent.color }} />
                </motion.div>
                <h3 className="text-xs font-semibold text-white mb-1.5 leading-tight">{agent.label}</h3>
                <p className="text-[10px] text-[#94A3B8] leading-relaxed">{agent.desc}</p>
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{ boxShadow: `inset 0 0 20px ${agent.color}10, 0 0 30px ${agent.color}15` }} />
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}