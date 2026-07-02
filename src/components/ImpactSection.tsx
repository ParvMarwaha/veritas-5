'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

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

export const ImpactSection = () => {
  return (
    <section className="relative w-full bg-[#111] text-white overflow-hidden border-t border-white/5">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
      {/* Immersive Background Image Placeholder (Subtle Texture) */}
      <div className="absolute inset-0 z-0 opacity-10 mix-blend-overlay pointer-events-none grayscale">
        <Image
          src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=2940&auto=format&fit=crop"
          alt="Abstract architecture texture"
          fill
          className="object-cover"
        />
      </div>

      <div className="relative z-10 w-full max-w-[78.75rem] mx-auto px-6 md:px-12 py-20 md:py-28">

        {/* Header */}
        <motion.div variants={itemVariants} className="mb-16 flex flex-col">
          <span className="block text-[#D02717] font-mono text-[0.875rem] uppercase tracking-widest mb-4">
            03 // OUR IMPACT
          </span>
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 md:gap-12">
            <h2 className="text-3xl md:text-4xl lg:text-[3rem] font-sans tracking-tight leading-[1.1] text-white max-w-2xl flex-1 text-left">
              Numbers that define success.
            </h2>
            <p className="text-[1rem] md:text-[1.125rem] text-white/70 font-sans tracking-tight leading-[1.6] max-w-md md:mt-4 text-left">
              Delivering structural clarity and long-term value creation.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Brutalist Data Table Constrained */}
      <div className="relative z-10 w-full border-t border-b border-white/20 bg-[#111]">
        <motion.div variants={itemVariants} className="max-w-[78.75rem] mx-auto w-full border-l border-r border-white/20 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/20">

          <div className="p-6 md:p-8 flex flex-col justify-between min-h-[11.25rem] md:min-h-[12.5rem] group hover:bg-white/[0.03] transition-colors duration-500">
            <span className="text-white/40 font-mono text-[0.875rem] uppercase tracking-widest mb-8 group-hover:text-white transition-colors duration-500">Volume</span>
            <div>
              <div className="text-[3rem] md:text-[4rem] font-mono tracking-tighter leading-none mb-4">
                1K<span className="text-[#D02717]">+</span>
              </div>
              <div className="text-[0.9375rem] md:text-[1rem] text-white/70 font-sans tracking-tight leading-[1.6]">ESOP Schemes Designed</div>
            </div>
          </div>

          <div className="p-6 md:p-8 flex flex-col justify-between min-h-[11.25rem] md:min-h-[12.5rem] group hover:bg-white/[0.03] transition-colors duration-500">
            <span className="text-white/40 font-mono text-[0.875rem] uppercase tracking-widest mb-8 group-hover:text-white transition-colors duration-500">Standards</span>
            <div>
              <div className="text-[1.5rem] md:text-[1.75rem] font-mono tracking-tight leading-[1.2] mb-4">
                Ind AS,<br />IAS 19,<br />US GAAP
              </div>
              <div className="text-[0.9375rem] md:text-[1rem] text-white/70 font-sans tracking-tight leading-[1.6]">Strictly Compliant</div>
            </div>
          </div>

          <div className="p-6 md:p-8 flex flex-col justify-between min-h-[11.25rem] md:min-h-[12.5rem] group hover:bg-white/[0.03] transition-colors duration-500">
            <span className="text-white/40 font-mono text-[0.875rem] uppercase tracking-widest mb-8 group-hover:text-white transition-colors duration-500">Reach</span>
            <div>
              <div className="text-[3rem] md:text-[4rem] font-mono tracking-tighter leading-none mb-4">
                50<span className="text-[#D02717]">+</span>
              </div>
              <div className="text-[0.9375rem] md:text-[1rem] text-white/70 font-sans tracking-tight leading-[1.6]">Global Sectors Served</div>
            </div>
          </div>

          <div className="p-6 md:p-8 flex flex-col justify-between min-h-[11.25rem] md:min-h-[12.5rem] group hover:bg-white/[0.03] transition-colors duration-500">
            <span className="text-white/40 font-mono text-[0.875rem] uppercase tracking-widest mb-8 group-hover:text-white transition-colors duration-500">Legacy</span>
            <div>
              <div className="text-[3rem] md:text-[4rem] font-mono tracking-tighter leading-none mb-4">
                20<span className="text-[#D02717]">+</span>
              </div>
              <div className="text-[0.9375rem] md:text-[1rem] text-white/70 font-sans tracking-tight leading-[1.6]">Years Actuarial Experience</div>
            </div>
          </div>

        </motion.div>
      </div>

      {/* Infinite Logo Marquee Strip */}
      <motion.div variants={itemVariants} className="relative w-full border-b border-white/20 bg-[#111] overflow-hidden py-12">

        {/* Subtle gradient masks on left and right for smooth fading */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#111] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#111] to-transparent z-10 pointer-events-none"></div>

        <div className="flex w-fit animate-marquee">
          {/* We duplicate the logo list twice to create a seamless infinite loop */}
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex shrink-0 items-center gap-20 px-8">
              {[
                "ANI-20260217104348.png",
                "Bajaj-Allianz-Logo-Small.png",
                "Larsen&Toubro_logo.svg.png",
                "ZaAxVKlu.png",
                "etWHDm9pwLdz7kNrFxG3kl3bx0M1567079925023_200x200.png",
                "images (1).jpeg",
                "images.jpeg",
                "images.png",
                "isthara_corporate_logo_2.png",
                "prepladderLogo.e4168f6e1bc6f2efe053.png"
              ].map((logo, index) => (
                <div key={index} className="relative w-48 md:w-56 h-16 md:h-20 grayscale brightness-200 invert opacity-60 hover:grayscale-0 hover:brightness-100 hover:invert-0 hover:opacity-100 transition-all duration-500 cursor-pointer">
                  <Image
                    src={`/logos/${logo}`}
                    alt={`Partner Logo ${index + 1}`}
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </motion.div>

      </motion.div>
    </section>
  );
};
