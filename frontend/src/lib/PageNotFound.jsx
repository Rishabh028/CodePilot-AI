import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Menu, X, Zap } from 'lucide-react';

const NAV_LINKS = ['Domain', 'Servers', 'Cloud', 'Managed', 'Email', 'Privacy'];

const FOOTER_COLUMNS = [
  {
    title: 'SERVERS',
    links: ['Web Servers', 'VPS Servers', 'Cloud Servers', 'Managed Instances', 'Bare Metal'],
  },
  {
    title: 'DOMAINS',
    links: ['Find Domain', 'Move Domains', 'DNS Manager', 'Domain Costs'],
  },
  {
    title: 'HELP US',
    links: ['Open a Ticket', 'FAQs', 'Docs', 'Tutorials', 'Forum'],
  },
  {
    title: 'ABOUT',
    links: ['Our Story', 'Leadership Team', 'Press Room', 'We Hire', 'Alliance', 'Blog'],
  },
  {
    title: 'SOLUTIONS',
    links: ['Enterprise Cloud', 'Security Suite', 'Global CDN', 'AI Infrastructure', 'Status Page'],
  },
  {
    title: 'LEGAL & PRIVACY',
    links: ['Terms of Service', 'Privacy Policy', 'Security Overview', 'Cookie Preferences', 'GDPR Compliance'],
  },
];

export default function PageNotFound() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMobileMenu = () => {
    if (mobileMenuOpen) {
      setMenuVisible(false);
      setTimeout(() => {
        setMobileMenuOpen(false);
      }, 500);
    } else {
      setMobileMenuOpen(true);
    }
  };

  useEffect(() => {
    if (mobileMenuOpen) {
      const timer = setTimeout(() => setMenuVisible(true), 10);
      return () => clearTimeout(timer);
    }
  }, [mobileMenuOpen]);

  const closeMenu = () => {
    setMenuVisible(false);
    setTimeout(() => {
      setMobileMenuOpen(false);
    }, 500);
  };

  return (
    <div
      className="relative min-h-screen flex flex-col overflow-hidden bg-black text-white select-none"
      style={{ fontFamily: '"Helvetica Now Var", Helvetica, Arial, sans-serif' }}
    >
      {/* BACKGROUND VIDEO */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260613_180732_a54afbf6-b30d-470e-861f-669871f09f67.mp4"
          type="video/mp4"
        />
      </video>

      {/* CONTENT WRAPPER */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* NAVIGATION BAR */}
        <header className="w-full flex items-center justify-between px-6 md:px-12 lg:px-16 py-5">
          {/* Logo (left) */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#06B6D4] flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all duration-300 group-hover:scale-105">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-heading font-bold text-xl text-white">
              CodePilot <span className="bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] bg-clip-text text-transparent">AI</span>
            </span>
          </Link>

          {/* Desktop nav links (center) */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="text-white/80 hover:text-white text-sm tracking-wide transition-colors duration-200"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Login button (right) */}
          <div className="hidden lg:flex items-center">
            <Link
              to="/auth"
              className="bg-gradient-to-r from-emerald-400 to-cyan-500 text-white text-sm font-semibold px-6 py-2.5 rounded-full flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer shadow-lg shadow-cyan-500/20"
            >
              <span>LOG IN</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden relative z-[60] p-2 text-white focus:outline-none cursor-pointer w-10 h-10 flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <Menu
                className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                  menuVisible ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'
                }`}
              />
              <X
                className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                  menuVisible ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'
                }`}
              />
            </div>
          </button>
        </header>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div
              className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-md transition-opacity duration-400 ${
                menuVisible ? 'opacity-100' : 'opacity-0'
              }`}
              onClick={closeMenu}
            />

            {/* Menu Panel */}
            <div className="absolute left-0 right-0 top-[68px] z-50 overflow-hidden">
              <div className="absolute inset-0 backdrop-blur-xl rounded-b-2xl pointer-events-none" />
              <div className="relative z-10 py-8 px-6 flex flex-col items-center gap-6">
                {NAV_LINKS.map((link, index) => (
                  <a
                    key={link}
                    href="#"
                    onClick={closeMenu}
                    className="text-lg sm:text-xl font-light tracking-[0.08em] text-white/80 hover:text-white transition-all duration-400 ease-out"
                    style={{
                      transitionDelay: menuVisible ? `${350 + index * 50}ms` : '0ms',
                      opacity: menuVisible ? 1 : 0,
                      transform: menuVisible ? 'translateY(0)' : 'translateY(12px)',
                    }}
                  >
                    {link}
                  </a>
                ))}
                <Link
                  to="/auth"
                  onClick={closeMenu}
                  className="bg-gradient-to-r from-emerald-400 to-cyan-500 text-white text-sm font-semibold px-8 py-3 rounded-full flex items-center gap-2 transition-all duration-400 ease-out mt-2"
                  style={{
                    transitionDelay: menuVisible ? `${350 + NAV_LINKS.length * 50}ms` : '0ms',
                    opacity: menuVisible ? 1 : 0,
                    transform: menuVisible ? 'translateY(0)' : 'translateY(12px)',
                  }}
                >
                  <span>LOG IN</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </>
        )}

        {/* HERO / 404 SECTION */}
        <main className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 py-12 sm:py-16 md:py-0">
          <h1 className="text-white/80 text-lg sm:text-3xl md:text-5xl font-light leading-snug tracking-tight mb-1 sm:mb-2">
            This page seems to have
          </h1>
          <h1 className="text-white/80 text-lg sm:text-3xl md:text-5xl font-light leading-snug tracking-tight mb-8 sm:mb-12">
            slipped beyond our reach :/
          </h1>

          {/* Giant 404 Text */}
          <div className="relative mb-8 sm:mb-12 w-full flex justify-center overflow-visible">
            <span className="text-[80px] sm:text-[140px] md:text-[200px] lg:text-[260px] font-black text-white leading-none tracking-tighter select-none four-oh-four">
              404
            </span>
          </div>

          {/* Return Button */}
          <Link
            to="/"
            className="liquid-glass text-white text-[10px] sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] font-medium px-6 sm:px-8 py-3 sm:py-3.5 rounded-full uppercase flex items-center justify-center transition-all duration-300 hover:scale-105"
          >
            Return to Main Page
          </Link>
        </main>

        {/* FOOTER */}
        <footer className="relative z-10 px-4 sm:px-6 md:px-12 lg:px-16 pb-8 sm:pb-10 pt-10 sm:pt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8 lg:gap-6">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <h4 className="text-white text-[10px] sm:text-xs font-bold tracking-[0.15em] mb-3 sm:mb-4 uppercase">
                  {col.title}
                </h4>
                <ul className="space-y-2 sm:space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-white/50 hover:text-white/80 text-[10px] sm:text-xs transition-colors duration-200"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
}