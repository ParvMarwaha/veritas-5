'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedButton } from './AnimatedButton';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

export const ServicesSection = () => {

  return (
    <section className="relative w-full bg-[#111] text-white py-20 md:py-28 overflow-hidden border-t border-white/5">
      <motion.div 
        className="max-w-[1260px] w-full mx-auto px-6 md:px-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Section Heading */}
        <motion.div variants={itemVariants} className="mb-16">
          <span className="block text-[#D02717] font-mono text-[15px] md:text-[15px] uppercase tracking-widest mb-6">
            01 / Services
          </span>
          <h2 className="text-2xl md:text-2xl lg:text-[48px] italic font-serif tracking-tight leading-[1.1] text-white max-w-3xl">
            Who We Help
          </h2>
          <p className="mt-8 text-[15px] md:text-[15px] text-white/70 font-sans tracking-tight leading-[1.6] max-w-[600px]">
            We design scalable ownership structures tailored to the unique priorities of founders, executives, HR leaders, and investors.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4">
          {/* Col 1 */}
          <motion.div variants={itemVariants} className="flex flex-col pr-8 md:pr-12 pb-16">
            <span className="text-[#D02717] font-mono text-[48px] md:text-[64px] tracking-tighter leading-none mb-8">01</span>
            <h3 className="font-sans text-[20px] md:text-[20px] tracking-tight leading-[1.2] text-white mb-6">For Founders</h3>
            <p className="text-[15px] md:text-[15px] text-white/70 font-sans tracking-tight leading-[1.6] mb-12">
              Build an ownership structure that attracts talent and supports long-term growth.
            </p>
            <AnimatedButton variant="accent" className="mt-auto self-start px-8 py-3 tracking-widest text-[15px]">
              KNOW MORE
            </AnimatedButton>
          </motion.div>

          {/* Col 2 */}
          <motion.div variants={itemVariants} className="flex flex-col px-8 md:px-12 pb-16 md:border-l border-white/10">
            <span className="text-[#D02717] font-mono text-[48px] md:text-[64px] tracking-tighter leading-none mb-8">02</span>
            <h3 className="font-sans text-[20px] md:text-[20px] tracking-tight leading-[1.2] text-white mb-6">For CFOs</h3>
            <p className="text-[15px] md:text-[15px] text-white/70 font-sans tracking-tight leading-[1.6] mb-12">
              Navigate valuation, compliance, and reporting with confidence.
            </p>
            <AnimatedButton variant="accent" className="mt-auto self-start px-8 py-3 tracking-widest text-[15px]">
              KNOW MORE
            </AnimatedButton>
          </motion.div>
          
          {/* Col 3 */}
          <motion.div variants={itemVariants} className="flex flex-col px-8 md:px-12 pb-16 md:border-l border-white/10">
            <span className="text-[#D02717] font-mono text-[48px] md:text-[64px] tracking-tighter leading-none mb-8">03</span>
            <h3 className="font-sans text-[20px] md:text-[20px] tracking-tight leading-[1.2] text-white mb-6">For CHROs</h3>
            <p className="text-[15px] md:text-[15px] text-white/70 font-sans tracking-tight leading-[1.6] mb-12">
              Create ownership programs employees understand, value, and believe in.
            </p>
            <AnimatedButton variant="accent" className="mt-auto self-start px-8 py-3 tracking-widest text-[15px]">
              KNOW MORE
            </AnimatedButton>
          </motion.div>

          {/* Col 4 */}
          <motion.div variants={itemVariants} className="flex flex-col md:pl-12 pb-16 md:border-l border-white/10">
            <span className="text-[#D02717] font-mono text-[48px] md:text-[64px] tracking-tighter leading-none mb-8">04</span>
            <h3 className="font-sans text-[20px] md:text-[20px] tracking-tight leading-[1.2] text-white mb-6">For Investors/VC</h3>
            <p className="text-[15px] md:text-[15px] text-white/70 font-sans tracking-tight leading-[1.6] mb-12">
              Align portfolio companies with scalable ownership frameworks.
            </p>
            <AnimatedButton variant="accent" className="mt-auto self-start px-8 py-3 tracking-widest text-[15px]">
              KNOW MORE
            </AnimatedButton>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
