import React from 'react';
import { motion } from 'framer-motion';

const TECHS = [
  { name: 'Next.js', letter: 'N', color: '#ffffff' },
  { name: 'Tailwind CSS', letter: 'TW', color: '#06B6D4' },
  { name: 'TypeScript', letter: 'TS', color: '#3B82F6' },
  { name: 'Node.js', letter: 'N', color: '#10B981' },
  { name: 'PostgreSQL', letter: 'PG', color: '#3B82F6' },
  { name: 'Redis', letter: 'R', color: '#EF4444' },
  { name: 'Docker', letter: 'D', color: '#06B6D4' },
  { name: 'AWS', letter: 'AWS', color: '#F59E0B' },
];

export default function TechStackSection() {
  return (
    <section className="py-20 relative overflow-hidden" style={{ background: '#05010D' }}>
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-[#94A3B8] mb-4">Built with Modern Technologies</p>
        </motion.div>
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {TECHS.map((tech, i) => (
            <motion.div key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.15, y: -4 }}
              className="flex flex-col items-center gap-2 cursor-default group"
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-sm"
                style={{ background: `${tech.color}15`, border: `1px solid ${tech.color}30`, color: tech.color, boxShadow: `0 0 20px ${tech.color}15` }}>
                {tech.letter}
              </div>
              <span className="text-xs text-[#94A3B8] group-hover:text-white transition-colors">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}