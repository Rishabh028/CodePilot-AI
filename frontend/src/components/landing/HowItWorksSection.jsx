import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Search, Code2, Rocket } from 'lucide-react';

const STEPS = [
  { icon: MessageSquare, title: 'Describe', desc: 'Tell us what you want to build', color: '#8B5CF6', num: '01' },
  { icon: Search, title: 'Analyze', desc: 'AI analyzes and creates a plan', color: '#3B82F6', num: '02' },
  { icon: Code2, title: 'Generate', desc: 'Agents build, test and review code', color: '#06B6D4', num: '03' },
  { icon: Rocket, title: 'Deploy', desc: 'Deploy to cloud with one click', color: '#10B981', num: '04' },
];

export default function HowItWorksSection() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: '#05010D' }}>
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-[#94A3B8] mb-4">How CodePilot AI Works</p>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white">
            From Idea to <span className="bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] bg-clip-text text-transparent">Production</span> in Minutes
          </h2>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-12 left-[12.5%] right-[12.5%] h-px hidden md:block"
            style={{ background: 'linear-gradient(90deg, transparent, #8B5CF640, #06B6D440, #10B98140, transparent)' }} />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {STEPS.map((step, i) => (
              <motion.div key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative text-center group"
              >
                <div className="relative mx-auto w-20 h-20 mb-6">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto relative z-10"
                    style={{ background: `${step.color}15`, border: `1px solid ${step.color}40`, boxShadow: `0 0 30px ${step.color}20` }}
                  >
                    <step.icon className="w-8 h-8" style={{ color: step.color }} />
                  </motion.div>
                  <span className="absolute -top-2 -right-2 text-[10px] font-bold px-1.5 py-0.5 rounded-full z-20"
                    style={{ background: step.color, color: 'white' }}>
                    {step.num}
                  </span>
                </div>
                <h3 className="text-lg font-heading font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}