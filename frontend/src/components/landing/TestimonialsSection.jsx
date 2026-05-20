import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const TESTIMONIALS = [
  { name: 'Sarah Chen', role: 'Tech Lead', company: 'Acme Inc.', quote: '"CodePilot AI transformed how our team builds software. We\'re shipping 3x faster with AI engineering team support."', color: '#8B5CF6', avatar: 'SC' },
  { name: 'Arjun Patel', role: 'Senior Engineer', company: '', quote: '"The AI agents are incredibly smart. The code quality and suggestions are outstanding!"', color: '#06B6D4', avatar: 'AP' },
  { name: 'Emily Johnson', role: 'CTO', company: 'DevFlow', quote: '"From code generation to deployment, everything just works. Game changer for our startup."', color: '#EC4899', avatar: 'EJ' },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: '#0B0A18' }}>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at bottom, rgba(139,92,246,0.06) 0%, transparent 60%)' }} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-14">
          <p className="text-xs tracking-[0.3em] uppercase text-[#94A3B8] mb-4">Developers Love CodePilot AI</p>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white">
            What Developers <span className="bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] bg-clip-text text-transparent">Say</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -6 }}
              className="p-6 rounded-2xl relative group cursor-default"
              style={{ background: 'rgba(15,23,42,0.55)', border: `1px solid ${t.color}20`, backdropFilter: 'blur(12px)' }}
            >
              <Quote className="w-6 h-6 mb-4 opacity-50" style={{ color: t.color }} />
              <p className="text-sm text-[#94A3B8] leading-relaxed mb-6 italic">{t.quote}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}80)` }}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-[#94A3B8]">{t.role}{t.company ? ` at ${t.company}` : ''}</p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
                </div>
              </div>
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{ background: `radial-gradient(circle at top left, ${t.color}06, transparent 60%)` }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}