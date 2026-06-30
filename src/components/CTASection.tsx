'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedButton } from './AnimatedButton';
import { LiquifyBackground } from './LiquifyBackground';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.4,
      delayChildren: 0.2,
    }
  }
};

const bgVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 2 } }
};

const bracketVariants = {
  hidden: { width: "0%", opacity: 0 },
  visible: { 
    width: "100%", 
    opacity: 1, 
    transition: { duration: 1.2, ease: [0.77, 0, 0.175, 1] as any } 
  }
};

const textVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as any }
  }
};

export const CTASection = () => {
  return (
    <section className="relative z-20 w-full bg-[#111] text-white py-40 px-6 md:px-16 flex flex-col items-center justify-center overflow-hidden border-t border-white/5">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="absolute inset-0 w-full h-full flex flex-col items-center justify-center"
        style={{ position: 'static' }} // Allows layout to remain intact while managing children
      >
      {/* Background Gradient with Liquify Shader */}
      <motion.div variants={bgVariants} className="absolute inset-0 z-0">
        <LiquifyBackground />
      </motion.div>

      {/* The bordered container for the CTA */}
      <div className="relative w-full max-w-3xl xl:max-w-[850px] flex flex-col items-center justify-center py-16 px-4 md:px-12 z-10">
        {/* Animated Brackets Container */}
        <motion.div variants={bracketVariants} className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2">
          {/* Left Bracket */}
          <div className="absolute top-0 bottom-0 left-0 border-l border-white/50">
            <div className="absolute top-0 left-0 w-4 md:w-6 h-[1px] bg-white/50"></div>
            <div className="absolute bottom-0 left-0 w-4 md:w-6 h-[1px] bg-white/50"></div>
          </div>
          {/* Right Bracket */}
          <div className="absolute top-0 bottom-0 right-0 border-r border-white/50">
            <div className="absolute top-0 right-0 w-4 md:w-6 h-[1px] bg-white/50"></div>
            <div className="absolute bottom-0 right-0 w-4 md:w-6 h-[1px] bg-white/50"></div>
          </div>
        </motion.div>

        <motion.div variants={textVariants} className="relative z-10 flex flex-col items-center text-center mx-auto">
          <h3 className="text-2xl md:text-2xl lg:text-[54px] font-serif tracking-tight leading-[1.1] mb-10 text-white md:whitespace-nowrap">
            Ready to Redefine Your Equity Structure?
          </h3>
          <p className="text-[15px] md:text-[20px] text-white/70 leading-[1.6] max-w-[600px] tracking-tight font-sans mb-16">
            Join the vanguard of modern organizations building a sustainable culture of ownership and trust.
          </p>
          
          <AnimatedButton variant="dark" className="px-8 py-3">
            Get in Touch
          </AnimatedButton>
        </motion.div>
      </div>
      </motion.div>
    </section>
  );
};
