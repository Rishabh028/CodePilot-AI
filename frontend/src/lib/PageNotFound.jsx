import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PageNotFound() {
  return (
    <div className="min-h-screen bg-background grid-bg flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center mx-auto mb-6 glow-purple">
          <Zap className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-7xl font-heading font-bold gradient-text mb-4">404</h1>
        <p className="text-xl text-muted-foreground font-body mb-8">Page not found in the codebase</p>
        <Link to="/">
          <Button className="bg-gradient-to-r from-neon-purple to-neon-cyan text-white hover:opacity-90">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}