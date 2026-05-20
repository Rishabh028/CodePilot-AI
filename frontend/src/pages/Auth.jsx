import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import {
  Zap, Eye, EyeOff, Mail, Lock, User, ArrowRight,
  Chrome, Sparkles, Shield, Code2, Rocket, CheckCircle2, AlertCircle, Loader2
} from 'lucide-react';

const BENEFITS = [
  { icon: Code2, text: 'Generate full-stack apps with AI' },
  { icon: Shield, text: 'Built-in security scanning' },
  { icon: Rocket, text: 'Deploy to cloud in one click' },
  { icon: Sparkles, text: '8 specialized AI agents' },
];

export default function Auth() {
  const [tab, setTab] = useState('signin'); // 'signin' | 'signup' | 'forgot'
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const navigate = useNavigate();

  const set = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }));
    setError('');
  };

  const handleGoogleLogin = () => {
    setGoogleLoading(true);
    base44.auth.loginWithProvider('google', '/dashboard');
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) { setError('Please fill in all fields.'); return; }
    setLoading(true);
    setError('');
    try {
      await base44.auth.loginViaEmailPassword(form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err?.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) { setError('Please fill in all fields.'); return; }
    if (form.password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    if (form.password !== form.confirmPassword) { setError('Passwords do not match.'); return; }
    setLoading(true);
    setError('');
    try {
      await base44.auth.signupViaEmailPassword(form.email, form.password, form.name);
      setSuccess('Account created! Please check your email to verify your account.');
      setTimeout(() => setTab('signin'), 3000);
    } catch (err) {
      setError(err?.message || 'Could not create account. This email may already be in use.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!form.email) { setError('Please enter your email address.'); return; }
    setLoading(true);
    setError('');
    try {
      await base44.auth.sendPasswordResetEmail(form.email);
      setSuccess('Password reset email sent! Check your inbox.');
    } catch (err) {
      setError(err?.message || 'Could not send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: '#05010D' }}>
      {/* LEFT — Branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col relative overflow-hidden p-12"
        style={{ background: 'linear-gradient(135deg, #0B0A18 0%, #130d2e 100%)' }}>
        {/* Grid */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'linear-gradient(rgba(139,92,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.04) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
        {/* Glow blobs */}
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }} transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-20 left-10 w-72 h-72 rounded-full blur-[80px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, #8B5CF640, transparent 70%)' }} />
        <motion.div animate={{ scale: [1.1, 1, 1.1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 9, repeat: Infinity }}
          className="absolute bottom-20 right-10 w-60 h-60 rounded-full blur-[60px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, #06B6D440, transparent 70%)' }} />

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 relative z-10 mb-16">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#06B6D4] flex items-center justify-center shadow-lg shadow-purple-500/30">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="font-heading font-bold text-lg text-white">
            CodePilot <span className="bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] bg-clip-text text-transparent">AI</span>
          </span>
        </Link>

        {/* Content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <h2 className="text-4xl font-heading font-bold text-white mb-4 leading-tight">
              Your AI Engineering<br />
              <span className="bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] bg-clip-text text-transparent">Team Awaits</span>
            </h2>
            <p className="text-[#94A3B8] mb-10 leading-relaxed">
              Join 5,000+ developers building faster with autonomous AI agents that handle the full software lifecycle.
            </p>

            <div className="space-y-4">
              {BENEFITS.map((b, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)' }}>
                    <b.icon className="w-4 h-4 text-purple-400" />
                  </div>
                  <span className="text-sm text-[#94A3B8]">{b.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Floating cards */}
        <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity }}
          className="absolute bottom-32 right-8 p-3 rounded-xl pointer-events-none"
          style={{ background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(139,92,246,0.3)', backdropFilter: 'blur(12px)' }}>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] flex items-center justify-center">
              <Code2 className="w-3 h-3 text-white" />
            </div>
            <div>
              <p className="text-xs text-white font-medium">Code Generated</p>
              <p className="text-[10px] text-emerald-400">✓ Production Ready</p>
            </div>
          </div>
        </motion.div>
        <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          className="absolute top-40 right-10 p-3 rounded-xl pointer-events-none"
          style={{ background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(6,182,212,0.3)', backdropFilter: 'blur(12px)' }}>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyan-400" />
            <div>
              <p className="text-xs text-white font-medium">Security Scan</p>
              <p className="text-[10px] text-cyan-400">No issues found</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* RIGHT — Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="w-full max-w-md">

          {/* Mobile logo */}
          <Link to="/" className="flex items-center gap-2.5 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#06B6D4] flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-heading font-bold text-white">CodePilot <span className="bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] bg-clip-text text-transparent">AI</span></span>
          </Link>

          <AnimatePresence mode="wait">
            {/* ─── SIGN IN ─── */}
            {tab === 'signin' && (
              <motion.div key="signin" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h1 className="text-3xl font-heading font-bold text-white mb-1">Welcome back</h1>
                <p className="text-[#94A3B8] text-sm mb-8">Sign in to your CodePilot AI account</p>

                {/* Google */}
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={handleGoogleLogin} disabled={googleLoading}
                  className="w-full flex items-center justify-center gap-3 py-3 rounded-xl font-medium text-sm text-white mb-4 transition-all hover:opacity-90"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
                  {googleLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  )}
                  Continue with Google
                </motion.button>

                <div className="flex items-center gap-3 mb-5">
                  <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
                  <span className="text-xs text-[#94A3B8]">or continue with email</span>
                  <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
                </div>

                <form onSubmit={handleSignIn} className="space-y-4">
                  <div>
                    <label className="text-xs text-[#94A3B8] mb-1.5 block">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                      <input type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" required
                        className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white outline-none transition-all"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                        onFocus={e => e.target.style.borderColor = 'rgba(139,92,246,0.6)'}
                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs text-[#94A3B8]">Password</label>
                      <button type="button" onClick={() => setTab('forgot')} className="text-xs text-purple-400 hover:text-purple-300">Forgot password?</button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                      <input type={showPass ? 'text' : 'password'} value={form.password} onChange={set('password')} placeholder="••••••••" required
                        className="w-full pl-10 pr-10 py-3 rounded-xl text-sm text-white outline-none transition-all"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                        onFocus={e => e.target.style.borderColor = 'rgba(139,92,246,0.6)'}
                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                      <button type="button" onClick={() => setShowPass(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-white">
                        {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <ErrorMsg msg={error} />
                  <SuccessMsg msg={success} />

                  <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="w-full py-3 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 mt-2"
                    style={{ background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)', boxShadow: '0 0 20px rgba(139,92,246,0.3)' }}>
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><ArrowRight className="w-4 h-4" /> Sign In</>}
                  </motion.button>
                </form>

                <p className="text-center text-xs text-[#94A3B8] mt-6">
                  Don't have an account?{' '}
                  <button onClick={() => { setTab('signup'); setError(''); setSuccess(''); }} className="text-purple-400 hover:text-purple-300 font-medium">
                    Sign up free
                  </button>
                </p>
              </motion.div>
            )}

            {/* ─── SIGN UP ─── */}
            {tab === 'signup' && (
              <motion.div key="signup" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h1 className="text-3xl font-heading font-bold text-white mb-1">Create account</h1>
                <p className="text-[#94A3B8] text-sm mb-8">Start building with your AI engineering team</p>

                {/* Google */}
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={handleGoogleLogin} disabled={googleLoading}
                  className="w-full flex items-center justify-center gap-3 py-3 rounded-xl font-medium text-sm text-white mb-4 transition-all hover:opacity-90"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
                  {googleLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  )}
                  Sign up with Google
                </motion.button>

                <div className="flex items-center gap-3 mb-5">
                  <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
                  <span className="text-xs text-[#94A3B8]">or sign up with email</span>
                  <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
                </div>

                <form onSubmit={handleSignUp} className="space-y-4">
                  <div>
                    <label className="text-xs text-[#94A3B8] mb-1.5 block">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                      <input type="text" value={form.name} onChange={set('name')} placeholder="John Doe" required
                        className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white outline-none"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                        onFocus={e => e.target.style.borderColor = 'rgba(139,92,246,0.6)'}
                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-[#94A3B8] mb-1.5 block">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                      <input type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" required
                        className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white outline-none"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                        onFocus={e => e.target.style.borderColor = 'rgba(139,92,246,0.6)'}
                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-[#94A3B8] mb-1.5 block">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                      <input type={showPass ? 'text' : 'password'} value={form.password} onChange={set('password')} placeholder="Min. 8 characters" required
                        className="w-full pl-10 pr-10 py-3 rounded-xl text-sm text-white outline-none"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                        onFocus={e => e.target.style.borderColor = 'rgba(139,92,246,0.6)'}
                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                      <button type="button" onClick={() => setShowPass(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-white">
                        {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-[#94A3B8] mb-1.5 block">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                      <input type={showPass ? 'text' : 'password'} value={form.confirmPassword} onChange={set('confirmPassword')} placeholder="Repeat password" required
                        className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white outline-none"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                        onFocus={e => e.target.style.borderColor = 'rgba(139,92,246,0.6)'}
                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                    </div>
                  </div>

                  {/* Strength indicator */}
                  {form.password && (
                    <PasswordStrength password={form.password} />
                  )}

                  <ErrorMsg msg={error} />
                  <SuccessMsg msg={success} />

                  <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="w-full py-3 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 mt-2"
                    style={{ background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)', boxShadow: '0 0 20px rgba(139,92,246,0.3)' }}>
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Sparkles className="w-4 h-4" /> Create Account</>}
                  </motion.button>

                  <p className="text-xs text-[#94A3B8] text-center">
                    By signing up you agree to our{' '}
                    <button className="text-purple-400 hover:underline">Terms</button> and{' '}
                    <button className="text-purple-400 hover:underline">Privacy Policy</button>
                  </p>
                </form>

                <p className="text-center text-xs text-[#94A3B8] mt-5">
                  Already have an account?{' '}
                  <button onClick={() => { setTab('signin'); setError(''); setSuccess(''); }} className="text-purple-400 hover:text-purple-300 font-medium">
                    Sign in
                  </button>
                </p>
              </motion.div>
            )}

            {/* ─── FORGOT PASSWORD ─── */}
            {tab === 'forgot' && (
              <motion.div key="forgot" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h1 className="text-3xl font-heading font-bold text-white mb-1">Reset password</h1>
                <p className="text-[#94A3B8] text-sm mb-8">We'll send you a reset link to your email</p>

                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div>
                    <label className="text-xs text-[#94A3B8] mb-1.5 block">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                      <input type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" required
                        className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white outline-none"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                        onFocus={e => e.target.style.borderColor = 'rgba(139,92,246,0.6)'}
                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                    </div>
                  </div>

                  <ErrorMsg msg={error} />
                  <SuccessMsg msg={success} />

                  <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="w-full py-3 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 mt-2"
                    style={{ background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)' }}>
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Mail className="w-4 h-4" /> Send Reset Link</>}
                  </motion.button>
                </form>

                <p className="text-center text-xs text-[#94A3B8] mt-6">
                  <button onClick={() => { setTab('signin'); setError(''); setSuccess(''); }} className="text-purple-400 hover:text-purple-300 font-medium">
                    ← Back to Sign In
                  </button>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

function ErrorMsg({ msg }) {
  if (!msg) return null;
  return (
    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-2 p-3 rounded-lg text-xs"
      style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', color: '#FCA5A5' }}>
      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
      {msg}
    </motion.div>
  );
}

function SuccessMsg({ msg }) {
  if (!msg) return null;
  return (
    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-2 p-3 rounded-lg text-xs"
      style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', color: '#6EE7B7' }}>
      <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
      {msg}
    </motion.div>
  );
}

function PasswordStrength({ password }) {
  const checks = [
    { label: '8+ characters', pass: password.length >= 8 },
    { label: 'Uppercase', pass: /[A-Z]/.test(password) },
    { label: 'Number', pass: /\d/.test(password) },
    { label: 'Special char', pass: /[^A-Za-z0-9]/.test(password) },
  ];
  const score = checks.filter(c => c.pass).length;
  const colors = ['#EF4444', '#F59E0B', '#3B82F6', '#10B981'];
  const labels = ['Weak', 'Fair', 'Good', 'Strong'];
  return (
    <div className="space-y-2">
      <div className="flex gap-1">
        {[0,1,2,3].map(i => (
          <div key={i} className="flex-1 h-1 rounded-full transition-all duration-300"
            style={{ background: i < score ? colors[score - 1] : 'rgba(255,255,255,0.1)' }} />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {checks.map(c => (
            <span key={c.label} className="text-[10px] flex items-center gap-1"
              style={{ color: c.pass ? '#10B981' : '#94A3B8' }}>
              {c.pass ? '✓' : '○'} {c.label}
            </span>
          ))}
        </div>
        {score > 0 && <span className="text-[10px] font-medium" style={{ color: colors[score - 1] }}>{labels[score - 1]}</span>}
      </div>
    </div>
  );
}