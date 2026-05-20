import React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for trying out CodePilot AI',
    features: ['3 projects', '1,000 AI tokens/mo', '2 agents', 'Community support'],
    cta: 'Get Started',
    featured: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    description: 'For individual developers who ship fast',
    features: ['Unlimited projects', '50,000 AI tokens/mo', 'All 8 agents', 'Priority support', 'GitHub integration', 'Custom deployments'],
    cta: 'Start Pro Trial',
    featured: true,
  },
  {
    name: 'Team',
    price: '$79',
    period: '/seat/mo',
    description: 'For engineering teams building together',
    features: ['Everything in Pro', '200,000 AI tokens/mo', 'Team collaboration', 'Shared workspaces', 'Admin dashboard', 'SSO & RBAC'],
    cta: 'Contact Sales',
    featured: false,
  },
];

export default function PricingSection() {
  return (
    <section className="py-32 px-6 relative" id="pricing">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Pricing</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mt-3">
            Simple, transparent <span className="gradient-text">pricing</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-xl p-6 relative ${
                plan.featured
                  ? 'animated-border p-[1px]'
                  : 'glass'
              }`}
            >
              <div className={plan.featured ? 'bg-card rounded-[11px] p-6 h-full' : ''}>
                {plan.featured && (
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
                    <Zap className="w-3 h-3" />
                    Most Popular
                  </div>
                )}
                <h3 className="font-heading font-bold text-xl">{plan.name}</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-heading font-bold">{plan.price}</span>
                  <span className="text-muted-foreground text-sm">{plan.period}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                
                <Link to="/dashboard">
                  <Button
                    className={`w-full mt-6 ${
                      plan.featured
                        ? 'bg-gradient-to-r from-neon-purple to-neon-cyan text-white hover:opacity-90'
                        : 'bg-secondary hover:bg-secondary/80'
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </Link>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}