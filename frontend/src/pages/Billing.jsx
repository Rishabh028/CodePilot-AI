import React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, CreditCard, TrendingUp, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import GlassCard from '@/components/shared/GlassCard.jsx';

const plans = [
  { name: 'Free', price: '$0', tokens: '1,000', projects: '3', agents: '2', current: true },
  { name: 'Pro', price: '$29', tokens: '50,000', projects: 'Unlimited', agents: 'All 8', featured: true },
  { name: 'Team', price: '$79', tokens: '200,000', projects: 'Unlimited', agents: 'All 8 + Team' },
];

export default function Billing() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-heading font-bold">Billing</h1>
        <p className="text-muted-foreground mt-1">Manage your subscription and usage</p>
      </motion.div>

      {/* Current usage */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GlassCard className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <CreditCard className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Current Plan</span>
          </div>
          <p className="text-2xl font-heading font-bold">Free</p>
          <p className="text-xs text-muted-foreground mt-1">Upgrade to unlock more</p>
        </GlassCard>
        <GlassCard className="p-5" delay={0.05}>
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-accent" />
            <span className="text-sm text-muted-foreground">Tokens Used</span>
          </div>
          <p className="text-2xl font-heading font-bold">487 / 1,000</p>
          <Progress value={48.7} className="mt-2 h-2" />
        </GlassCard>
        <GlassCard className="p-5" delay={0.1}>
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-neon-pink" />
            <span className="text-sm text-muted-foreground">Billing Cycle</span>
          </div>
          <p className="text-2xl font-heading font-bold">12 days</p>
          <p className="text-xs text-muted-foreground mt-1">Until reset</p>
        </GlassCard>
      </div>

      {/* Plans */}
      <div>
        <h3 className="font-heading font-semibold text-lg mb-4">Plans</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan, i) => (
            <GlassCard
              key={plan.name}
              className={`p-6 ${plan.featured ? 'border-primary/30 glow-purple' : ''}`}
              delay={i * 0.05}
            >
              {plan.featured && (
                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
                  <Zap className="w-3 h-3" /> Recommended
                </div>
              )}
              <h4 className="font-heading font-bold text-xl">{plan.name}</h4>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-3xl font-heading font-bold">{plan.price}</span>
                <span className="text-muted-foreground text-sm">/mo</span>
              </div>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-primary" /><span className="text-muted-foreground">{plan.tokens} tokens/mo</span></li>
                <li className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-primary" /><span className="text-muted-foreground">{plan.projects} projects</span></li>
                <li className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-primary" /><span className="text-muted-foreground">{plan.agents} agents</span></li>
              </ul>
              <Button
                className={`w-full mt-5 ${
                  plan.current ? 'bg-secondary text-muted-foreground cursor-default' :
                  plan.featured ? 'bg-gradient-to-r from-neon-purple to-neon-cyan text-white hover:opacity-90' :
                  'bg-secondary hover:bg-secondary/80'
                }`}
                disabled={plan.current}
              >
                {plan.current ? 'Current Plan' : 'Upgrade'}
              </Button>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Invoice history */}
      <GlassCard className="p-6">
        <h3 className="font-heading font-semibold text-lg mb-4">Invoice History</h3>
        <div className="text-center py-8 text-muted-foreground text-sm">
          No invoices yet
        </div>
      </GlassCard>
    </div>
  );
}