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

      <div className="relative z-10 w-full max-w-[1260px] mx-auto px-6 md:px-12 py-20 md:py-28">

        {/* Massive Typographic Intro */}
        <motion.div variants={itemVariants} className="mb-16">
          <span className="block text-[#D02717] font-mono text-[15px] md:text-[15px] uppercase tracking-widest mb-6">
            03 / Impact
          </span>
          <h2 className="text-2xl md:text-2xl lg:text-[48px] italic font-serif tracking-tight leading-[1.1] text-white max-w-3xl">
            Business Outcomes
          </h2>
          <p className="mt-8 text-[15px] md:text-[15px] text-white/70 font-sans tracking-tight leading-[1.6] max-w-[600px]">
            Most ownership programs are designed around compliance. The best ones are designed around measurable business impact.
          </p>
        </motion.div>
      </div>

      {/* Brutalist Data Table Constrained */}
      <div className="relative z-10 w-full border-t border-b border-white/20 bg-[#111]">
        <motion.div variants={itemVariants} className="max-w-[1260px] mx-auto w-full border-l border-r border-white/20 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/20">

          <div className="p-6 md:p-8 flex flex-col justify-between min-h-[180px] md:min-h-[200px] group hover:bg-white/[0.03] transition-colors duration-500">
            <span className="text-white/40 font-mono text-[15px] md:text-[15px] uppercase tracking-widest mb-8 group-hover:text-white transition-colors duration-500">Volume</span>
            <div>
              <div className="text-[48px] md:text-[64px] font-mono tracking-tighter leading-none mb-4">
                1K<span className="text-[#D02717]">+</span>
              </div>
              <div className="text-[15px] md:text-[15px] text-white/70 font-sans tracking-tight leading-[1.6]">ESOP Schemes Designed</div>
            </div>
          </div>

          <div className="p-6 md:p-8 flex flex-col justify-between min-h-[180px] md:min-h-[200px] group hover:bg-white/[0.03] transition-colors duration-500">
            <span className="text-white/40 font-mono text-[15px] md:text-[15px] uppercase tracking-widest mb-8 group-hover:text-white transition-colors duration-500">Standards</span>
            <div>
              <div className="text-[20px] md:text-[20px] font-mono tracking-tight leading-[1.2] mb-4">
                Ind AS,<br />IAS 19,<br />US GAAP
              </div>
              <div className="text-[15px] md:text-[15px] text-white/70 font-sans tracking-tight leading-[1.6]">Strictly Compliant</div>
            </div>
          </div>

          <div className="p-6 md:p-8 flex flex-col justify-between min-h-[180px] md:min-h-[200px] group hover:bg-white/[0.03] transition-colors duration-500">
            <span className="text-white/40 font-mono text-[15px] md:text-[15px] uppercase tracking-widest mb-8 group-hover:text-white transition-colors duration-500">Reach</span>
            <div>
              <div className="text-[48px] md:text-[64px] font-mono tracking-tighter leading-none mb-4">
                50<span className="text-[#D02717]">+</span>
              </div>
              <div className="text-[15px] md:text-[15px] text-white/70 font-sans tracking-tight leading-[1.6]">Global Sectors Served</div>
            </div>
          </div>

          <div className="p-6 md:p-8 flex flex-col justify-between min-h-[180px] md:min-h-[200px] group hover:bg-white/[0.03] transition-colors duration-500">
            <span className="text-white/40 font-mono text-[15px] md:text-[15px] uppercase tracking-widest mb-8 group-hover:text-white transition-colors duration-500">Legacy</span>
            <div>
              <div className="text-[48px] md:text-[64px] font-mono tracking-tighter leading-none mb-4">
                20<span className="text-[#D02717]">+</span>
              </div>
              <div className="text-[15px] md:text-[15px] text-white/70 font-sans tracking-tight leading-[1.6]">Years Actuarial Experience</div>
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
