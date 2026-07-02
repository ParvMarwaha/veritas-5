'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { AnimatedButton } from './AnimatedButton';

const insights = [
  { num: "01", title: "The Future of Employee Ownership", tag: "Report", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" },
  { num: "02", title: "Navigating Valuations in 2026", tag: "Analysis", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" },
  { num: "03", title: "Building a Culture of Trust", tag: "Opinion", img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" },
  { num: "04", title: "Global Equity Compliance", tag: "Guide", img: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2070&auto=format&fit=crop" },
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

export const InsightsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative w-full bg-[#111] text-white py-20 md:py-28 overflow-hidden border-t border-white/5">
      <motion.div 
        className="max-w-[78.75rem] mx-auto px-6 md:px-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        
        <motion.div variants={itemVariants} className="mb-16 flex flex-col text-left w-full">
          <span className="block text-[#D02717] font-mono text-[0.875rem] uppercase tracking-widest mb-4">
            04 // INSIGHTS
          </span>
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 md:gap-12">
            <h2 className="text-3xl md:text-4xl lg:text-[3rem] font-sans tracking-tight leading-[1.1] text-white max-w-2xl flex-1">
              Latest Thinking
            </h2>
            <div className="flex flex-col items-start gap-6 max-w-md md:mt-4 text-left">
              <p className="text-[1rem] md:text-[1.125rem] text-white/70 font-sans tracking-tight leading-[1.6]">
                Perspectives on ownership, equity design, and governance.
              </p>
              <AnimatedButton variant="text" className="border border-white/20 px-8 py-4 whitespace-nowrap">
                View All Insights
              </AnimatedButton>
            </div>
          </div>
        </motion.div>

        {/* Bento / Editorial Magazine Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-white/10 border border-white/10">
          
          {/* Featured Insight (Left - spans 7 cols) */}
          <motion.div variants={itemVariants} className="lg:col-span-7 relative bg-[#111] p-8 md:p-12 min-h-[31.25rem] flex flex-col justify-end group cursor-pointer overflow-hidden">
            
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <Image 
                src={insights[activeIndex].img as string}
                alt={insights[activeIndex].title}
                fill
                className="object-cover opacity-40 group-hover:opacity-70 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/80 to-transparent"></div>
            </div>

            <div className="relative z-10 w-full flex flex-col">
              <div className="flex justify-between items-start w-full mb-8">
                <span className="text-white/60 font-mono text-[0.875rem] uppercase tracking-widest bg-white/10 px-4 py-2 backdrop-blur-md">
                  {insights[activeIndex].tag}
                </span>
                <span className="text-white/60 font-mono text-[0.875rem]">
                  {insights[activeIndex].num}
                </span>
              </div>
              <h3 className="text-[1.5rem] md:text-[1.75rem] font-sans tracking-tight leading-[1.2] mb-8 group-hover:text-[#D02717] transition-colors duration-500">
                {insights[activeIndex].title}
              </h3>
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center transition-all duration-500 group-hover:bg-[#D02717] group-hover:border-[#D02717]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white transform transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                  <line x1="5" y1="19" x2="19" y2="5"></line>
                  <polyline points="10 5 19 5 19 14"></polyline>
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Secondary Insights Stack (Right - spans 5 cols) */}
          <div className="lg:col-span-5 grid grid-rows-4 gap-px bg-white/10">
            {insights.map((item, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                onMouseEnter={() => setActiveIndex(index)}
                className={`relative bg-[#111] p-6 md:p-8 flex flex-col justify-between group cursor-pointer transition-all duration-700 ${activeIndex === index ? 'bg-white/[0.05]' : 'hover:bg-white/[0.02]'}`}
              >
                <div className="flex justify-between items-center w-full mb-4">
                  <span className={`font-mono text-[0.8125rem] uppercase tracking-widest transition-colors duration-500 ${activeIndex === index ? 'text-white' : 'text-white/40 group-hover:text-white'}`}>
                    {item.tag}
                  </span>
                  <span className={`font-mono text-[0.8125rem] transition-colors duration-500 ${activeIndex === index ? 'text-[#D02717]' : 'text-white/20 group-hover:text-[#D02717]'}`}>
                    {item.num}
                  </span>
                </div>
                <div className="flex justify-between items-end w-full mt-auto">
                  <h4 className={`text-[1.25rem] md:text-[1.5rem] font-sans tracking-tight leading-[1.2] max-w-[85%] transition-transform duration-500 ${activeIndex === index ? 'text-white translate-x-2' : 'text-white/70 group-hover:translate-x-2 group-hover:text-white/90'}`}>
                    {item.title}
                  </h4>
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500 shrink-0 ${activeIndex === index ? 'bg-[#D02717] border-[#D02717]' : 'border-white/10 group-hover:bg-[#D02717] group-hover:border-[#D02717]'}`}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-white transform transition-transform duration-500 ${activeIndex === index ? 'translate-x-1 -translate-y-1' : 'group-hover:translate-x-1 group-hover:-translate-y-1'}`}>
                      <line x1="5" y1="19" x2="19" y2="5"></line>
                      <polyline points="10 5 19 5 19 14"></polyline>
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </motion.div>
    </section>
  );
};
