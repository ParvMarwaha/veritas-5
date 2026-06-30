'use client';

import { Canvas } from '@react-three/fiber';
import AsciiBackground from '../components/AsciiBackground';
import { ScrollRevealSection } from '../components/ScrollRevealSection';
import { Hero } from '../components/Hero';
import { ServicesSection } from '../components/ServicesSection';
import { PillarsSection } from '../components/PillarsSection';
import { ImpactSection } from '../components/ImpactSection';
import { InsightsSection } from '../components/InsightsSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { CTASection } from '../components/CTASection';
import { Footer } from '../components/Footer';

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-[#111] font-sans selection:bg-white selection:text-black">
      <div className="sticky top-0 w-full h-screen z-0">
        <Hero />
      </div>
      
      <div className="relative z-10 bg-[#111]">
        <ScrollRevealSection />
        <ServicesSection />
        <PillarsSection />
        <ImpactSection />
        <InsightsSection />
        <TestimonialsSection />
        <CTASection />
        <Footer />
      </div>
    </main>
  );
}
