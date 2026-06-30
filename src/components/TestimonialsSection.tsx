'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "They completely redefined our equity structure to attract top-tier talent while protecting founder interests.",
    name: "Aditi Sharma",
    title: "Founder & CEO",
    company: "Series B Tech"
  },
  {
    quote: "The clarity and compliance framework they built for our Series B gave both us and our investors total peace of mind.",
    name: "Rahul Verma",
    title: "Managing Director",
    company: "Global Ventures"
  },
  {
    quote: "Their team doesn't just do the math, they fundamentally understand how to design ownership that scales.",
    name: "Priya Desai",
    title: "Chief People Officer",
    company: "Unicorn SAAS"
  },
  {
    quote: "From initial valuation to final documentation, their precision and strategic guidance were unparalleled.",
    name: "Vikram Malhotra",
    title: "General Partner",
    company: "Apex Capital"
  },
  {
    quote: "They turned a highly complex cap table cleanup into a streamlined, understandable process for everyone.",
    name: "Neha Kapoor",
    title: "Chief Financial Officer",
    company: "Fintech Grid"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }
  }
};

export const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative w-full bg-[#111] text-white py-20 md:py-28 overflow-hidden border-t border-white/5">
      <motion.div 
        className="max-w-[1260px] mx-auto px-6 md:px-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-16">
          <span className="block text-[#D02717] font-mono text-[15px] md:text-[15px] uppercase tracking-widest mb-6">
            05 / Testimonials
          </span>
          <h2 className="text-2xl md:text-2xl lg:text-[48px] italic font-serif tracking-tight leading-[1.1] text-white max-w-3xl">
            What our partners say.
          </h2>
          <p className="mt-8 text-[15px] md:text-[15px] text-white/70 font-sans tracking-tight leading-[1.6] max-w-[600px]">
            Partnerships built on trust, transparency, and scalable design.
          </p>
        </motion.div>

        {/* Interactive Tabbed Interface */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-white/10 border border-white/10">
          
          {/* Left Panel: Tabs (Spans 4 cols) */}
          <div className="lg:col-span-4 flex flex-col bg-[#111]">
            {testimonials.map((t, i) => (
              <div 
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`group px-8 py-8 border-b last:border-b-0 border-white/10 cursor-pointer transition-all duration-300 flex items-center justify-between ${
                  activeIndex === i ? 'bg-white/5' : 'hover:bg-white/[0.02]'
                }`}
              >
                <div>
                  <h4 className={`text-[15px] md:text-[15px] font-sans tracking-tight leading-[1.2] mb-2 transition-colors duration-300 ${activeIndex === i ? 'text-white' : 'text-white/60 group-hover:text-white/90'}`}>
                    {t.name}
                  </h4>
                  <p className="text-[15px] md:text-[15px] font-mono uppercase tracking-widest text-white/40">
                    {t.company}
                  </p>
                </div>
                {/* Active Indicator Arrow */}
                <div className={`transition-all duration-300 ${activeIndex === i ? 'opacity-100 translate-x-0 text-[#D02717]' : 'opacity-0 -translate-x-4 text-white/30'}`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {/* Right Panel: Active Quote (Spans 8 cols) */}
          <div className="lg:col-span-8 bg-[#111] p-10 md:p-16 lg:p-24 flex flex-col justify-center min-h-[500px] relative overflow-hidden">
            {/* Massive decorative quotes */}
            <div className="absolute top-12 left-12 text-[#D02717] opacity-20 font-serif text-[180px] leading-none select-none">
              “
            </div>

            <div className="relative z-10 w-full max-w-3xl">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className={`absolute inset-0 flex flex-col justify-center transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${
                    activeIndex === i 
                      ? 'opacity-100 translate-y-0 pointer-events-auto relative' 
                      : 'opacity-0 translate-y-12 pointer-events-none absolute'
                  }`}
                >
                  <p className="text-2xl md:text-2xl lg:text-2xl font-sans tracking-tight leading-[1.3] text-white mb-12">
                    {t.quote}
                  </p>
                  <div className="flex flex-col border-l-2 border-[#D02717] pl-6">
                    <span className="text-[15px] md:text-[15px] font-sans tracking-tight leading-[1.2] text-white mb-2">
                      {t.name}
                    </span>
                    <span className="text-[15px] md:text-[15px] font-mono uppercase tracking-widest text-white/40">
                      {t.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </motion.div>
      </motion.div>
    </section>
  );
};
