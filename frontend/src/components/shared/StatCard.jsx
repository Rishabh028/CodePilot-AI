import React from 'react';
import { motion } from 'framer-motion';

export default function StatCard({ icon: Icon, label, value, change, accentColor = 'from-neon-purple to-neon-cyan', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="glass rounded-xl p-5 hover:border-primary/20 transition-all duration-300 group"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground font-body">{label}</p>
          <p className="text-2xl font-heading font-bold mt-1">{value}</p>
          {change && (
            <p className={`text-xs mt-1 ${change.startsWith('+') ? 'text-emerald-400' : 'text-destructive'}`}>
              {change} from last month
            </p>
          )}
        </div>
        <div className={`p-2.5 rounded-lg bg-gradient-to-br ${accentColor} bg-opacity-10`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
    </motion.div>
  );
}