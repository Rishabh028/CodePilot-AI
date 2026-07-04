import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Menu, X, User as UserIcon } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';

const NAV_LINKS = [
  { label: 'Features', to: '/features' },
  { label: 'About', to: '/about' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#05010D]/80 backdrop-blur-xl border-b border-purple-500/10 shadow-lg shadow-purple-900/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#06B6D4] flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-shadow">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-heading font-bold text-base text-white">
            CodePilot <span className="bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] bg-clip-text text-transparent">AI</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(link => (
            <Link key={link.label} to={link.to}
              className="px-4 py-1.5 text-sm text-[#94A3B8] hover:text-white transition-colors rounded-lg hover:bg-white/5">
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link to="/dashboard">
                <button className="text-sm font-semibold px-5 py-2 rounded-lg bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] text-white hover:opacity-90 transition-opacity">
                  Dashboard
                </button>
              </Link>
              <Link to="/settings" title="Profile Settings">
                <button className="w-9 h-9 flex items-center justify-center rounded-full bg-[#8B5CF6]/20 text-[#8B5CF6] hover:bg-[#8B5CF6]/30 transition-colors border border-[#8B5CF6]/30">
                  {user?.avatar ? (
                    <img src={user.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <UserIcon className="w-4 h-4" />
                  )}
                </button>
              </Link>
            </div>
          ) : (
            <>
              <Link to="/auth">
                <button className="text-sm text-[#94A3B8] hover:text-white transition-colors px-3 py-1.5">Sign In</button>
              </Link>
              <Link to="/auth">
                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: '0 0 20px rgba(139,92,246,0.4)' }}
                  whileTap={{ scale: 0.97 }}
                  className="text-sm font-semibold px-5 py-2 rounded-lg bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] text-white">
                  Start Free
                </motion.button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile */}
        <button className="md:hidden text-white p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0B0A18]/95 backdrop-blur-xl border-b border-purple-500/10 px-4 pb-4"
          >
            {NAV_LINKS.map(link => (
              <Link key={link.label} to={link.to} onClick={() => setMobileOpen(false)}
                className="block py-2.5 text-sm text-[#94A3B8] hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
            <div className="flex gap-3 mt-3">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="flex-1" onClick={() => setMobileOpen(false)}>
                    <button className="w-full py-2 text-sm bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] rounded-lg text-white font-semibold">Dashboard</button>
                  </Link>
                  <Link to="/settings" className="flex-1" onClick={() => setMobileOpen(false)}>
                    <button className="w-full py-2 text-sm border border-purple-500/30 rounded-lg text-white hover:bg-purple-500/10 transition-colors">Profile</button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/auth" className="flex-1" onClick={() => setMobileOpen(false)}>
                    <button className="w-full py-2 text-sm border border-purple-500/30 rounded-lg text-white hover:bg-purple-500/10 transition-colors">Sign In</button>
                  </Link>
                  <Link to="/auth" className="flex-1" onClick={() => setMobileOpen(false)}>
                    <button className="w-full py-2 text-sm bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] rounded-lg text-white font-semibold">Start Free</button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}