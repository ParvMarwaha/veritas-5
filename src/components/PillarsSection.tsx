'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { LiquifyBackground } from './LiquifyBackground';

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
      staggerChildren: 0.15,
      delayChildren: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)', scale: 0.98 },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    scale: 1,
    transition: { duration: 1.2, ease: [0.19, 1, 0.22, 1] as any } 
  }
};

const getClipPathClasses = (index: number) => {
  switch (index) {
    case 0: return '[clip-path:circle(0%_at_100%_100%)] group-hover:[clip-path:circle(150%_at_100%_100%)]';
    case 1: return '[clip-path:circle(0%_at_0%_100%)] group-hover:[clip-path:circle(150%_at_0%_100%)]';
    case 2: return '[clip-path:circle(0%_at_100%_0%)] group-hover:[clip-path:circle(150%_at_100%_0%)]';
    case 3: return '[clip-path:circle(0%_at_0%_0%)] group-hover:[clip-path:circle(150%_at_0%_0%)]';
    default: return '[clip-path:circle(0%_at_50%_50%)] group-hover:[clip-path:circle(150%_at_50%_50%)]';
  }
};

export const PillarsSection = () => {
  const [scrambledText, setScrambledText] = useState("");
  const gridRef = useRef(null);
  const hasTriggeredRef = useRef(false);
  
  // Trigger circle when grid is fully in view / sticky container hits the top
  const isInView = useInView(gridRef, { once: true, margin: "-10% 0px" });
  
  const cardsControls = useAnimation();
  const circleControls = useAnimation();

  const triggerAnimationSequence = () => {
    if (hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;

    const finalWord = "SERVICES";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$*&%";
    let iterations = 0;
    const maxIterations = 20; 
    
    const interval = setInterval(() => {
      setScrambledText(
        finalWord
          .split("")
          .map((letter, index) => {
            if (index < iterations / 2.5) return finalWord[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iterations >= maxIterations) {
        clearInterval(interval);
        setScrambledText(finalWord);
        
        // Reveal Cards after scramble
        cardsControls.start("visible");
      }
      
      iterations += 1;
    }, 40);
  };

  useEffect(() => {
    if (isInView) {
      // 1. Reveal circle as soon as section sticks
      circleControls.start({ 
        y: 0, 
        opacity: 1, 
        scale: 1,
        transition: { type: "spring", stiffness: 70, damping: 15, mass: 1.2 }
      }).then(() => {
        // 2. Auto trigger the rest of the animation after a short delay
        // This gives the user time to click it if they want, or it just plays automatically.
        setTimeout(() => {
          triggerAnimationSequence();
        }, 600);
      });
    }
  }, [isInView, circleControls]);

  return (
    <section className="relative w-full bg-[#F6F4F0] text-[#111] shadow-[0_-20px_50px_rgba(0,0,0,0.5)] z-20">
      
      {/* Header text - scrolls up normally */}
      <div className="pt-20 md:pt-24 pb-12 md:pb-24 max-w-[78.75rem] w-full mx-auto px-6 md:px-12">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 flex flex-col"
        >
          <motion.span variants={itemVariants} className="block text-[#D02717] font-mono text-[0.875rem] uppercase tracking-widest mb-4">
            02 // OUR SERVICES
          </motion.span>
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 md:gap-12">
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl lg:text-[3rem] font-sans tracking-tight leading-[1.1] text-[#111] max-w-2xl flex-1 text-left">
              Four Essential Pillars of Equity Design.
            </motion.h2>
            <motion.p variants={itemVariants} className="text-[1rem] md:text-[1.125rem] text-[#111]/70 font-sans tracking-tight leading-[1.6] max-w-md md:mt-4 text-left">
              Built around four essential pillars, our services combine financial precision, legal clarity, governance expertise, and employee engagement to create ownership structures that scale with your business.
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* Grid and Circle - Stuck in viewport while animation plays */}
      <div className="relative w-full md:h-[150vh]">
        <div className="md:sticky md:top-0 md:h-screen w-full flex flex-col items-center justify-center overflow-hidden pb-20 md:pb-0">
          
          <div className="relative w-full max-w-[78.75rem] mx-auto px-6 md:px-12 flex items-center justify-center" ref={gridRef}>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 w-full"
              initial="hidden"
              animate={cardsControls}
              variants={containerVariants}
            >
              {pillars.map((pillar, index) => (
                <motion.div 
                  key={index} 
                  variants={itemVariants} 
                  className="group bg-[#111] p-10 md:p-14 flex flex-col justify-center min-h-[20rem] cursor-pointer transition-transform duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] relative overflow-hidden"
                >
                  <div className={`absolute inset-0 transition-all duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] ${getClipPathClasses(index)} z-0 overflow-hidden`}>
                    <LiquifyBackground />
                  </div>
                  
                  <div className="relative z-10">
                    <span className="text-[#D02717] font-mono text-[3rem] md:text-[3.5rem] tracking-tighter leading-none mb-4 block transition-colors duration-500 ease-out group-hover:text-white">
                      {pillar.num}
                    </span>
                    <h3 className="font-sans text-[1.5rem] md:text-[1.75rem] tracking-tight leading-[1.2] text-white mb-3">
                      {pillar.title}
                    </h3>
                    <p className="text-[0.9375rem] md:text-[1rem] text-white/70 font-sans tracking-tight leading-[1.6] transition-colors duration-500 group-hover:text-white/95">
                      {pillar.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Center Circular Badge */}
            <div className="absolute inset-0 hidden md:flex items-center justify-center pointer-events-none z-20">
              <motion.div 
                onClick={triggerAnimationSequence}
                className="w-36 h-36 md:w-48 md:h-48 bg-[#F6F4F0] rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(0,0,0,0.1)] pointer-events-auto cursor-pointer group transition-transform duration-500 hover:scale-105"
                initial={{ y: -60, opacity: 0, scale: 0.8 }}
                animate={circleControls}
              >
                <span className="font-mono text-[0.9375rem] md:text-[1.125rem] tracking-[0.2em] group-hover:tracking-[0.3em] transition-all duration-500 text-[#111] font-semibold select-none">
                  {scrambledText}
                </span>
              </motion.div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};
