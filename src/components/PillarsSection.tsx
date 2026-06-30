'use client';

import React from 'react';
import { motion } from 'framer-motion';

const pillars = [
  {
    num: "01",
    title: "Mathematics",
    desc: "Financial modelling that optimizes equity outcomes while balancing stakeholder interests strategically."
  },
  {
    num: "02",
    title: "Risk Mitigation",
    desc: "Governance frameworks that reduce uncertainty while protecting long-term organizational value effectively."
  },
  {
    num: "03",
    title: "Documentation",
    desc: "Comprehensive documentation that ensures absolute compliance while enabling confident, strategic decision-making across all levels of the organization."
  },
  {
    num: "04",
    title: "Communication",
    desc: "Clear communication that builds understanding and strengthens employee ownership participation confidently."
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

const rowVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }
  }
};

const introVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }
  }
};

export const PillarsSection = () => {

  return (
    <section className="relative w-full bg-[#111] text-white py-20 md:py-28 overflow-hidden border-t border-white/5">
      <motion.div 
        className="max-w-[1260px] w-full mx-auto px-6 md:px-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* Intro block */}
        <motion.div variants={introVariants} className="mb-16">
          <span className="block text-[#D02717] font-mono text-[15px] md:text-[15px] uppercase tracking-widest mb-6">
            02 / Pillars
          </span>
          <h2 className="text-2xl md:text-2xl lg:text-[48px] italic font-serif tracking-tight leading-[1.1] text-white max-w-3xl">
            Four essential pillars of equity design.
          </h2>
          <p className="mt-8 text-[15px] md:text-[15px] text-white/70 font-sans tracking-tight leading-[1.6] max-w-[600px]">
            Built around four essential pillars, our services combine financial precision, legal clarity, governance expertise, and employee engagement to create ownership structures that scale with your business.
          </p>
        </motion.div>

        {/* Sequenced Left-To-Right Reveal Block */}
        <div className="w-full flex flex-col border-t border-white/10 group/list overflow-hidden">
          {pillars.map((pillar, index) => {
            return (
              <motion.div 
                key={index} 
                variants={rowVariants}
                className="group relative w-full border-b border-white/10 transition-all duration-500 hover:bg-[#D02717]/5 hover:border-[#D02717]/40"
              >
                <div className="py-12 md:py-20 grid grid-cols-1 md:grid-cols-[120px_1fr_1fr] lg:grid-cols-[120px_400px_1fr] gap-8 lg:gap-16 items-center">
                  
                  {/* Number */}
                  <div 
                    className="font-mono text-[48px] md:text-[64px] leading-none tracking-tighter text-white/20 group-hover:text-[#D02717] transition-all duration-[0.8s] ease-[cubic-bezier(0.16,1,0.3,1)]"
                  >
                    {pillar.num}
                  </div>

                  {/* Title */}
                  <div 
                    className="font-sans text-[20px] md:text-[20px] tracking-tight leading-[1.2] text-white transition-all duration-1000 ease-out"
                  >
                    <div className="overflow-hidden">
                      <span className={`block transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform group-hover:text-[#D02717] group-hover:translate-x-4`}>
                        {pillar.title}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <div 
                    className="flex transition-all duration-1000 ease-out"
                  >
                    <p className={`text-[15px] md:text-[15px] text-white/70 font-sans tracking-tight leading-[1.6] max-w-[400px] transition-all duration-700 group-hover:text-white/90`}>
                      {pillar.desc}
                    </p>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};
