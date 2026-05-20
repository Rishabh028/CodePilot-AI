import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Twitter, Github, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const LINKS = {
  Platform: [
    { label: 'Features', to: '/features' },
    { label: 'About', to: '/about' },
    { label: 'Dashboard', to: '/dashboard' },
  ],
  Legal: [
    { label: 'Privacy Policy', to: '#' },
    { label: 'Terms of Service', to: '#' },
    { label: 'Contact', to: '#' },
  ],
};

const SOCIALS = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

export default function FooterSection() {
  return (
    <footer className="relative overflow-hidden" style={{ background: '#0B0A18', borderTop: '1px solid rgba(139,92,246,0.1)' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#06B6D4] flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-heading font-bold text-white">CodePilot <span className="bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] bg-clip-text text-transparent">AI</span></span>
            </Link>
            <p className="text-sm text-[#94A3B8] leading-relaxed mb-6 max-w-xs">
              Your autonomous AI software engineering team. Build faster, ship better with 8 specialized AI agents.
            </p>
            {/* Newsletter */}
            <div className="flex gap-2 max-w-xs">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 text-sm px-3 py-2 rounded-lg text-white outline-none min-w-0"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(139,92,246,0.2)' }}
              />
              <button className="px-3 py-2 rounded-lg text-white flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)' }}>
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>

          {Object.entries(LINKS).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-sm font-semibold text-white mb-4">{section}</h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-[#94A3B8] hover:text-white transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="text-sm text-[#94A3B8]">© 2026 CodePilot AI. All rights reserved.</p>
          <div className="flex items-center gap-3">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} aria-label={label}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[#94A3B8] hover:text-white transition-all hover:scale-110"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}