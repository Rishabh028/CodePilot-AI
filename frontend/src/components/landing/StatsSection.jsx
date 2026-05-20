import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Code2, Activity, Bot, Cloud } from 'lucide-react';

const STATS = [
  { icon: Users, value: 50000, display: '50K+', label: 'Developers', suffix: '+', color: '#8B5CF6' },
  { icon: Code2, value: 1000000, display: '1M+', label: 'Lines of Code Generated', suffix: '+', color: '#06B6D4' },
  { icon: Activity, value: 98.5, display: '98.5%', label: 'Agent Success Rate', suffix: '%', color: '#10B981', decimal: true },
  { icon: Bot, value: 8, display: '8', label: 'AI Agents', suffix: '', color: '#3B82F6' },
  { icon: Cloud, value: 10000, display: '10K+', label: 'Projects Deployed', suffix: '+', color: '#EC4899' },
];

function AnimatedCounter({ value, display, decimal }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) { setCount(value); clearInterval(timer); }
      else setCount(current);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  const formatted = decimal
    ? count.toFixed(1)
    : count >= 1000000 ? `${(count / 1000000).toFixed(0)}M`
    : count >= 1000 ? `${(count / 1000).toFixed(0)}K`
    : Math.floor(count).toString();

  return <span ref={ref}>{inView ? formatted : '0'}</span>;
}

export default function StatsSection() {
  return (
    <section className="py-20 relative overflow-hidden" style={{ background: '#0B0A18', borderTop: '1px solid rgba(139,92,246,0.1)', borderBottom: '1px solid rgba(139,92,246,0.1)' }}>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.05) 0%, transparent 70%)' }} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-center text-xs tracking-[0.3em] uppercase text-[#94A3B8] mb-10">
          Built for Developers, Loved by Teams.
        </motion.p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {STATS.map((stat, i) => (
            <motion.div key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 rounded-2xl group cursor-default"
              style={{ background: 'rgba(15,23,42,0.5)', border: `1px solid ${stat.color}20`, backdropFilter: 'blur(10px)' }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                style={{ background: `${stat.color}15`, border: `1px solid ${stat.color}30` }}>
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <div className="text-3xl md:text-4xl font-heading font-bold mb-1"
                style={{ background: `linear-gradient(135deg, ${stat.color}, white)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                <AnimatedCounter value={stat.value} display={stat.display} decimal={stat.decimal} />{stat.suffix}
              </div>
              <p className="text-xs text-[#94A3B8]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}