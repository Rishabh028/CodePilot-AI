import React from 'react';
import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import AgentsSection from '@/components/landing/AgentsSection';
import StatsSection from '@/components/landing/StatsSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import TechStackSection from '@/components/landing/TechStackSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import CTASection from '@/components/landing/CTASection';
import FooterSection from '@/components/landing/FooterSection';

export default function Landing() {
  return (
    <div className="min-h-screen overflow-hidden" style={{ background: '#05010D' }}>
      <Navbar />
      <HeroSection />
      <AgentsSection />
      <StatsSection />
      <HowItWorksSection />
      <FeaturesSection />
      <TechStackSection />
      <TestimonialsSection />
      <CTASection />
      <FooterSection />
    </div>
  );
}