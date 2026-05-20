import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: '#05010D' }}>
      {/* Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[300px] rounded-full blur-[100px]"
          style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.15) 0%, transparent 70%)' }} />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="p-8 rounded-3xl"
              style={{ background: 'rgba(15,23,42,0.55)', border: '1px solid rgba(139,92,246,0.25)', backdropFilter: 'blur(20px)', boxShadow: '0 0 60px rgba(139,92,246,0.1)' }}>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4 leading-tight">
                Ready to Build<br />
                <span className="bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] bg-clip-text text-transparent">the Future?</span>
              </h2>
              <p className="text-[#94A3B8] mb-8 leading-relaxed">
                Join thousands of developers who are building faster with their AI engineering team.
              </p>
              <Link to="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(139,92,246,0.5)' }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white text-sm"
                  style={{ background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)', boxShadow: '0 0 20px rgba(139,92,246,0.3)' }}
                >
                  <Sparkles className="w-4 h-4" />
                  Start Building Free
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Right — 3D Cube */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="flex items-center justify-center h-64">
            <div className="relative">
              {/* Outer glow */}
              <div className="absolute inset-0 w-40 h-40 rounded-full blur-[40px]" style={{ background: 'rgba(139,92,246,0.3)' }} />
              {/* Rotating rings */}
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 w-40 h-40 rounded-full" style={{ border: '1px solid rgba(139,92,246,0.3)' }} />
              <motion.div animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-4 w-48 h-48 rounded-full" style={{ border: '1px dashed rgba(6,182,212,0.2)' }} />
              {/* Cube */}
              <motion.div
                animate={{ rotate: [0, 5, -5, 0], y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10 w-32 h-32 rounded-2xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #1e1b4b, #0f172a)', border: '1px solid rgba(139,92,246,0.5)', boxShadow: '0 0 40px rgba(139,92,246,0.3), inset 0 0 40px rgba(139,92,246,0.1)' }}
              >
                <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>
                  <Sparkles className="w-14 h-14 text-purple-400" />
                </motion.div>
              </motion.div>
              {/* Particles */}
              {[...Array(8)].map((_, i) => (
                <motion.div key={i}
                  className="absolute w-1.5 h-1.5 rounded-full"
                  style={{ top: `${50 + 45 * Math.sin(i * Math.PI / 4)}%`, left: `${50 + 45 * Math.cos(i * Math.PI / 4)}%`, background: i % 2 === 0 ? '#8B5CF6' : '#06B6D4', boxShadow: `0 0 6px ${i % 2 === 0 ? '#8B5CF6' : '#06B6D4'}` }}
                  animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}