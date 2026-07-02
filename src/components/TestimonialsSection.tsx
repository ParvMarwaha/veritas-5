'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    quote: "They completely redefined our equity structure to attract top-tier talent while protecting founder interests. Partnerships built on trust, transparency, and scalable design. Their clarity and compliance framework gave both us and our investors total peace of mind. We were able to close our round three weeks faster than anticipated thanks to their airtight documentation. The level of bespoke advisory they provide simply doesn't exist anywhere else in the market.",
    name: "Aditi Sharma",
    title: "Founder",
    company: "Series B Tech"
  },
  {
    quote: "The clarity and compliance framework they built for our Series B gave both us and our investors total peace of mind. From initial valuation to final documentation, their precision and strategic guidance were unparalleled across every stage. They have a rare ability to translate incredibly dense financial models into actionable, board-ready insights. Having them in our corner during diligence was an absolute game-changer for our valuation.",
    name: "Rahul Verma",
    title: "Managing Director",
    company: "Global Ventures"
  },
  {
    quote: "Their team doesn't just do the math, they fundamentally understand how to design ownership that scales. They turned a highly complex cap table cleanup into a streamlined, understandable process for everyone involved. I've never worked with partners who are this responsive and intellectually rigorous. Their models have become the absolute gold standard for how we evaluate compensation across our entire portfolio of companies.",
    name: "Priya Desai",
    title: "Chief People Officer",
    company: "Unicorn SAAS"
  },
  {
    quote: "From initial valuation to final documentation, their precision and strategic guidance were unparalleled. They completely redefined our equity structure to attract top-tier talent while protecting founder interests in the long term. Their advisory goes far beyond standard accounting; they operate as true strategic partners who see around corners. The execution was flawless, and they anticipated every single hurdle before it even materialized.",
    name: "Vikram Malhotra",
    title: "General Partner",
    company: "Apex Capital"
  },
  {
    quote: "They turned a highly complex cap table cleanup into a streamlined, understandable process for everyone. Partnerships built on trust, transparency, and scalable design. Their team doesn't just do the math, they fundamentally understand how to design ownership that scales. We went from having a tangled mess of legacy agreements to a pristine, audit-ready structure in record time. They are the premier experts in this space, hands down.",
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
  const [isHovered, setIsHovered] = useState(false);

  const next = () => setActiveIndex((curr) => (curr === testimonials.length - 1 ? 0 : curr + 1));
  const prev = () => setActiveIndex((curr) => (curr === 0 ? testimonials.length - 1 : curr - 1));

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveIndex((curr) => (curr === testimonials.length - 1 ? 0 : curr + 1));
    }, 7500);
    return () => clearInterval(timer);
  }, [isHovered]);

  return (
    <section className="relative w-full bg-[#111] text-white py-20 md:py-28 overflow-hidden border-t border-white/5">
      <motion.div 
        className="max-w-[78.75rem] mx-auto px-6 md:px-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        
        {/* Standardized Header */}
        <motion.div variants={itemVariants} className="mb-12 md:mb-16 flex flex-col text-left w-full">
          <span className="block text-[#D02717] font-mono text-[0.875rem] uppercase tracking-widest mb-4">
            05 // TESTIMONIALS
          </span>
          <div className="flex flex-col">
            <h2 className="text-[2rem] md:text-[2.5rem] lg:text-[2.75rem] font-sans tracking-tight leading-[1.1] text-white">
              What people say about us
            </h2>
          </div>
        </motion.div>

        {/* The Divider / Progress Line */}
        <motion.div variants={itemVariants} className="w-full h-[1px] bg-white/20 mb-12 relative overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#D02717] to-[#DDA76D] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" 
            style={{ width: `${((activeIndex + 1) / testimonials.length) * 100}%` }}
          />
        </motion.div>

        {/* Main Content Area (Relative for Absolute children positioning) */}
        <motion.div variants={itemVariants} className="relative w-full min-h-[400px] md:min-h-[250px]">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex flex-col justify-between cursor-default group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              
              {/* Quote Text */}
              <div className="flex items-start w-full">
                <p className={`text-[0.9375rem] md:text-[1rem] font-sans tracking-tight leading-[1.6] text-left transition-all duration-700 ease-out transform ${isHovered ? 'text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] translate-x-2' : 'text-white/60 translate-x-0'}`}>
                  {testimonials[activeIndex].quote}
                </p>
              </div>

              {/* Bottom Footer: Author Info & Nav Arrows */}
              <div className="flex items-end justify-between mt-12 md:mt-0 pb-8">
                <div className="flex flex-col border-l border-[#D02717] pl-5">
                  <span className={`text-[1.25rem] md:text-[1.5rem] font-sans tracking-tight mb-1 transition-colors duration-700 ${isHovered ? 'text-white' : 'text-white/90'}`}>
                    {testimonials[activeIndex].name}
                  </span>
                  <span className="text-[1rem] md:text-[1.125rem] font-sans tracking-tight text-white/50">
                    {testimonials[activeIndex].title}, {testimonials[activeIndex].company}
                  </span>
                </div>

                <div className="flex gap-6 items-center">
                  <button onClick={prev} className="text-white/40 hover:text-white transition-colors duration-300 p-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </button>
                  <button onClick={next} className="text-white/40 hover:text-white transition-colors duration-300 p-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </motion.div>

      </motion.div>
    </section>
  );
};

