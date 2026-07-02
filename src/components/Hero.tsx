import React from 'react';
import { AnimatedButton } from './AnimatedButton';
import { LiquifyBackground } from './LiquifyBackground';

export const Hero = () => {
  return (
    <>
      <section className="relative w-full h-[100svh] flex flex-col justify-between overflow-hidden">
      {/* Background Gradient with Liquify Shader */}
      <div className="absolute inset-0 z-0 animate-wipe-down">
        <LiquifyBackground />
      </div>

      {/* Spacer for Navbar */}
      <div className="h-24 w-full"></div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center text-white px-4 pb-20">
        {/* The bordered container for the heading */}
        <div className="relative w-full max-w-3xl xl:max-w-[75rem] flex flex-col items-center justify-center py-16 px-4 md:px-12">
          
          {/* Animated Brackets Container */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 animate-expand-brackets">
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
          </div>

          <h1 className="text-2xl md:text-2xl lg:text-6xl xl:text-[3.8rem] font-serif text-center leading-[1.15] mb-8 w-full max-w-full animate-reveal-up delay-1800">
            Ownership structures<br />
            designed for growth, not just compliance
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-reveal-up delay-1800">
            <AnimatedButton variant="dark" className="px-8 py-3">
              Get in Touch
            </AnimatedButton>
          </div>
        </div>
        
        <p className="mt-16 text-[1rem] md:text-[1.125rem] text-center text-white/90 font-sans tracking-tight leading-relaxed whitespace-nowrap animate-reveal-up delay-2400">
          We help leaders design ownership programs that attract talent, align incentives, and create value.
        </p>
      </div>
    </section>
    </>
  );
};
