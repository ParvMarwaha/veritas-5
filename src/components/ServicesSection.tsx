'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedButton } from './AnimatedButton';

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
    }
  }
};

const textVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
  }
};

const gridVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.8,
      staggerChildren: 0.15,
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, clipPath: 'inset(0 50% 0 50%)', y: 30 },
  visible: { 
    opacity: 1, 
    scale: 1,
    clipPath: 'inset(0 0% 0 0%)',
    y: 0,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
    transitionEnd: { clipPath: 'none' }
  }
};

export const ServicesSection = () => {

  return (
    <section className="relative w-full bg-[#111] text-white pt-10 pb-20 md:pt-16 md:pb-28 overflow-hidden border-t border-white/5">
      <motion.div 
        className="max-w-[78.75rem] w-full mx-auto px-6 md:px-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Section Heading */}
        <motion.div variants={textVariants} className="mb-16 flex flex-col">
          <span className="block text-[#D02717] font-mono text-[0.875rem] uppercase tracking-widest mb-4">
            01 // WHO WE HELP
          </span>
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 md:gap-12">
            <h2 className="text-3xl md:text-4xl lg:text-[3rem] font-sans tracking-tight leading-[1.1] text-white max-w-2xl flex-1">
              Built for the architects of growth.
            </h2>
            <p className="text-[1rem] md:text-[1.125rem] text-white/70 font-sans tracking-tight leading-[1.6] max-w-md md:mt-4 text-left">
              We design scalable ownership structures tailored to the unique priorities of founders, executives, HR leaders, and investors.
            </p>
          </div>
        </motion.div>

        {/* Grid Container */}
        <motion.div variants={gridVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-8 md:mt-12 pb-12 w-full">
          
          {/* Card 1 - Founders */}
          <motion.div variants={cardVariants} className="flex flex-col overflow-hidden bg-[#D02717] group cursor-pointer hover:-translate-y-2 hover:bg-[#E32A19] hover:shadow-2xl hover:shadow-[#D02717]/40 transition-all duration-500">
            {/* Top Half - Image */}
            <div className="h-40 relative overflow-hidden shrink-0 bg-[#FBF4ED]">
              <img src="/founders.png" alt="Founders" className="absolute inset-0 w-full h-full object-cover opacity-90 grayscale group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 z-10 pointer-events-none"></div>
            </div>
            {/* Bottom Half - Content */}
            <div className="p-6 md:p-8 flex flex-col flex-1 relative z-20 justify-between">
              <div>
                <span className="text-white/80 font-mono text-[1.5rem] md:text-[1.75rem] tracking-tight leading-none mb-4 block">01</span>
                <h3 className="font-sans text-[1.25rem] md:text-[1.375rem] tracking-tight leading-[1.2] text-white mb-3">For Founders</h3>
              </div>
              <p className="text-[0.875rem] text-white/90 font-sans tracking-tight leading-[1.5]">
                Build an ownership structure that attracts top-tier talent and supports long-term growth.
              </p>
            </div>
          </motion.div>

          {/* Card 2 - CFOs */}
          <motion.div variants={cardVariants} className="flex flex-col overflow-hidden bg-[#D02717] group cursor-pointer hover:-translate-y-2 hover:bg-[#E32A19] hover:shadow-2xl hover:shadow-[#D02717]/40 transition-all duration-500">
            {/* Top Half - Image */}
            <div className="h-40 relative overflow-hidden shrink-0 bg-[#FBF4ED]">
              <img src="/cfos.png" alt="CFOs" className="absolute inset-0 w-full h-full object-cover opacity-90 grayscale group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 z-10 pointer-events-none"></div>
            </div>
            {/* Bottom Half - Content */}
            <div className="p-6 md:p-8 flex flex-col flex-1 relative z-20 justify-between">
              <div>
                <span className="text-white/80 font-mono text-[1.5rem] md:text-[1.75rem] tracking-tight leading-none mb-4 block">02</span>
                <h3 className="font-sans text-[1.25rem] md:text-[1.375rem] tracking-tight leading-[1.2] text-white mb-3">For CFOs</h3>
              </div>
              <p className="text-[0.875rem] text-white/90 font-sans tracking-tight leading-[1.5]">
                Navigate valuation, compliance, and reporting with absolute confidence.
              </p>
            </div>
          </motion.div>
          
          {/* Card 3 - CHROs */}
          <motion.div variants={cardVariants} className="flex flex-col overflow-hidden bg-[#D02717] group cursor-pointer hover:-translate-y-2 hover:bg-[#E32A19] hover:shadow-2xl hover:shadow-[#D02717]/40 transition-all duration-500">
            {/* Top Half - Image */}
            <div className="h-40 relative overflow-hidden shrink-0 bg-[#FBF4ED]">
              <img src="/chros.png" alt="CHROs" className="absolute inset-0 w-full h-full object-cover opacity-90 grayscale group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 z-10 pointer-events-none"></div>
            </div>
            {/* Bottom Half - Content */}
            <div className="p-6 md:p-8 flex flex-col flex-1 relative z-20 justify-between">
              <div>
                <span className="text-white/80 font-mono text-[1.5rem] md:text-[1.75rem] tracking-tight leading-none mb-4 block">03</span>
                <h3 className="font-sans text-[1.25rem] md:text-[1.375rem] tracking-tight leading-[1.2] text-white mb-3">For CHROs</h3>
              </div>
              <p className="text-[0.875rem] text-white/90 font-sans tracking-tight leading-[1.5]">
                Create ownership programs employees understand, value, and believe in.
              </p>
            </div>
          </motion.div>

          {/* Card 4 - Investors */}
          <motion.div variants={cardVariants} className="flex flex-col overflow-hidden bg-[#D02717] group cursor-pointer hover:-translate-y-2 hover:bg-[#E32A19] hover:shadow-2xl hover:shadow-[#D02717]/40 transition-all duration-500">
            {/* Top Half - Image */}
            <div className="h-40 relative overflow-hidden shrink-0 bg-[#FBF4ED]">
              <img src="/investors.png" alt="Investors" className="absolute inset-0 w-full h-full object-cover opacity-90 grayscale group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 z-10 pointer-events-none"></div>
            </div>
            {/* Bottom Half - Content */}
            <div className="p-6 md:p-8 flex flex-col flex-1 relative z-20 justify-between">
              <div>
                <span className="text-white/80 font-mono text-[1.5rem] md:text-[1.75rem] tracking-tight leading-none mb-4 block">04</span>
                <h3 className="font-sans text-[1.25rem] md:text-[1.375rem] tracking-tight leading-[1.2] text-white mb-3">For Investors</h3>
              </div>
              <p className="text-[0.875rem] text-white/90 font-sans tracking-tight leading-[1.5]">
                Align portfolio companies with scalable ownership frameworks.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};
