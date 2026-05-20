import React from 'react';
import { motion } from 'framer-motion';

export default function GlassCard({ children, className = '', delay = 0, hover = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className={`glass rounded-xl ${hover ? 'hover:border-primary/20 transition-all duration-300' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
}