import React, { useEffect, useRef } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';
import { ArrowRight, Play, Sparkles, Star, Code2, Shield, GitPullRequest, Rocket, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const FLOAT_CARDS = [
{ icon: Code2, label: 'Code Generation', sub: 'function getValue() { return solution; }', color: '#8B5CF6', x: '-65%', y: '-30%' },
{ icon: GitPullRequest, label: 'PR Review', sub: '2 issues found\n3 suggestions', color: '#06B6D4', x: '55%', y: '-40%' },
{ icon: Shield, label: 'Security Scan', sub: 'No critical issues\n2 warnings found', color: '#EC4899', x: '-70%', y: '30%' },
{ icon: Rocket, label: 'Deploy', sub: 'Production\nDeployed ✓', color: '#3B82F6', x: '58%', y: '25%' }];


function FloatingCard({ card, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2 + index * 0.15, duration: 0.5 }}
      style={{ left: card.x, top: card.y }}
      className="absolute hidden lg:block">
      
      
















      
    </motion.div>);

}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#05010D]" />
      <div className="absolute inset-0" style={{
        backgroundImage: 'linear-gradient(rgba(139,92,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.04) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />
      {/* Glow blobs */}
      <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }} transition={{ duration: 8, repeat: Infinity }}
      className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none"
      style={{ background: 'radial-gradient(circle, #8B5CF640, transparent 70%)' }} />
      <motion.div animate={{ scale: [1.1, 1, 1.1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 10, repeat: Infinity }}
      className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none"
      style={{ background: 'radial-gradient(circle, #06B6D440, transparent 70%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* LEFT */}
          <div className="space-y-6 py-12 lg:py-0">
            {/* Badge */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
            style={{ background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.3)', color: '#A78BFA' }}>
              <Sparkles className="w-3.5 h-3.5" />
              Powered by 8 AI Agents
            </motion.div>

            {/* Heading */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-[1.05] tracking-tight text-white">
                Your Autonomous
                <br />
                <span className="bg-gradient-to-r from-[#8B5CF6] via-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent">
                  AI Software
                </span>
                <br />
                Engineering Team
              </h1>
            </motion.div>

            {/* Sub */}
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}
            className="text-base md:text-lg text-[#94A3B8] max-w-xl leading-relaxed font-body">
              Generate code, review PRs, write tests, secure apps, and deploy automatically — all powered by 8 specialized AI agents.
            </motion.p>

            {/* Buttons */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap gap-4 pt-2">
              <Link to="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(139,92,246,0.5)' }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-white"
                  style={{ background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)', boxShadow: '0 0 20px rgba(139,92,246,0.3)' }}>
                  Start Building Free <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-white"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)' }}>
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                  <Play className="w-3 h-3 ml-0.5" />
                </div>
                Watch Demo
              </motion.button>
            </motion.div>

            {/* Social proof */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.6 }}
            className="flex items-center gap-4 pt-2">
              <div className="flex -space-x-2">
                {['#8B5CF6', '#06B6D4', '#EC4899', '#3B82F6', '#10B981'].map((c, i) =>
                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#05010D] flex items-center justify-center text-xs font-bold text-white"
                style={{ background: `linear-gradient(135deg, ${c}, ${c}99)` }}>
                    {['S', 'A', 'J', 'K', 'M'][i]}
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-xs text-[#94A3B8] mt-0.5">Trusted by 5,000+ developers worldwide</p>
              </div>
            </motion.div>
          </div>

          {/* RIGHT — 3D Robot Scene */}
          <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.3 }}
          className="relative flex items-center justify-center h-[520px] lg:h-[600px]">
            {/* Glow ring */}
            <div className="absolute w-72 h-72 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)', filter: 'blur(30px)' }} />

            {/* Rotating rings */}
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute w-64 h-64 rounded-full pointer-events-none"
            style={{ border: '1px solid rgba(139,92,246,0.2)' }} />
            <motion.div animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="absolute w-80 h-80 rounded-full pointer-events-none"
            style={{ border: '1px solid rgba(6,182,212,0.15)' }} />
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            className="absolute w-96 h-96 rounded-full pointer-events-none"
            style={{ border: '1px dashed rgba(139,92,246,0.1)' }} />

            {/* Robot / Astronaut */}
            <motion.div
              animate={{ y: [0, -16, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10">
              
              {/* Body */}
              <div className="relative">
                {/* Head */}
                <div className="w-28 h-28 mx-auto rounded-2xl mb-1 relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #1e1b4b, #312e81)', border: '2px solid rgba(139,92,246,0.5)', boxShadow: '0 0 40px rgba(139,92,246,0.4)' }}>
                  {/* Eyes */}
                  <div className="absolute inset-0 flex items-center justify-center gap-5 pt-3">
                    <motion.div animate={{ scaleY: [1, 0.1, 1] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                    className="w-5 h-5 rounded-full"
                    style={{ background: '#06B6D4', boxShadow: '0 0 12px #06B6D4' }} />
                    <motion.div animate={{ scaleY: [1, 0.1, 1] }} transition={{ duration: 3, repeat: Infinity, delay: 1.1 }}
                    className="w-5 h-5 rounded-full"
                    style={{ background: '#06B6D4', boxShadow: '0 0 12px #06B6D4' }} />
                  </div>
                  {/* Mouth */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-10 h-1.5 rounded-full"
                  style={{ background: 'linear-gradient(90deg, #8B5CF6, #06B6D4)' }} />
                  {/* Shine */}
                  <div className="absolute top-2 left-2 w-8 h-4 rounded-full opacity-20"
                  style={{ background: 'linear-gradient(135deg, white, transparent)' }} />
                  {/* Chest emblem */}
                  <div className="absolute bottom-[-2px] left-1/2 -translate-x-1/2 w-8 h-4 flex items-center justify-center"
                  style={{ background: 'rgba(139,92,246,0.3)', borderRadius: '6px 6px 0 0', border: '1px solid rgba(139,92,246,0.5)' }}>
                    <Sparkles className="w-3 h-3 text-purple-300" />
                  </div>
                </div>
                {/* Torso */}
                <div className="w-36 h-24 mx-auto rounded-2xl relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #1e1b4b, #0f172a)', border: '2px solid rgba(139,92,246,0.3)', boxShadow: '0 0 30px rgba(139,92,246,0.2)' }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.4)' }}>
                      <Zap className="w-6 h-6 text-purple-400" />
                    </motion.div>
                  </div>
                  {/* Side details */}
                  <div className="absolute left-2 top-4 space-y-1.5">
                    {[...Array(3)].map((_, i) =>
                    <motion.div key={i} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                    className="w-2 h-2 rounded-full" style={{ background: '#06B6D4' }} />
                    )}
                  </div>
                  <div className="absolute right-2 top-4 space-y-1.5">
                    {[...Array(3)].map((_, i) =>
                    <motion.div key={i} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 + 0.5 }}
                    className="w-2 h-2 rounded-full" style={{ background: '#8B5CF6' }} />
                    )}
                  </div>
                </div>
                {/* Arms */}
                <div className="absolute top-[120px] -left-10 w-8 h-16 rounded-full"
                style={{ background: 'linear-gradient(135deg, #1e1b4b, #312e81)', border: '1px solid rgba(139,92,246,0.3)', transform: 'rotate(15deg)' }} />
                <div className="absolute top-[120px] -right-10 w-8 h-16 rounded-full"
                style={{ background: 'linear-gradient(135deg, #1e1b4b, #312e81)', border: '1px solid rgba(139,92,246,0.3)', transform: 'rotate(-15deg)' }} />
                {/* Legs */}
                <div className="flex justify-center gap-4 mt-1">
                  <div className="w-10 h-14 rounded-b-xl"
                  style={{ background: 'linear-gradient(180deg, #1e1b4b, #0f172a)', border: '1px solid rgba(139,92,246,0.3)' }} />
                  <div className="w-10 h-14 rounded-b-xl"
                  style={{ background: 'linear-gradient(180deg, #1e1b4b, #0f172a)', border: '1px solid rgba(139,92,246,0.3)' }} />
                </div>
              </div>
            </motion.div>

            {/* Platform */}
            <div className="absolute bottom-16 w-48 h-8 rounded-full"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.4), rgba(6,182,212,0.4), transparent)', filter: 'blur(8px)' }} />
            <div className="absolute bottom-14 w-36 h-4 rounded-full"
            style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.6), transparent 70%)', filter: 'blur(4px)' }} />

            {/* Floating cards */}
            {FLOAT_CARDS.map((card, i) => <FloatingCard key={i} card={card} index={i} />)}

            {/* Particles */}
            {[...Array(12)].map((_, i) =>
            <motion.div key={i}
            className="absolute w-1 h-1 rounded-full pointer-events-none"
            style={{ left: `${20 + Math.random() * 60}%`, top: `${10 + Math.random() * 80}%`, background: i % 2 === 0 ? '#8B5CF6' : '#06B6D4' }}
            animate={{ y: [0, -20, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 3 }} />

            )}
          </motion.div>
        </div>
      </div>
    </section>);

}