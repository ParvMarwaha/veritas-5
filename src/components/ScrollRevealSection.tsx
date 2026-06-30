'use client';
import React, { useEffect, useRef, useState } from 'react';

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export const ScrollRevealSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const { top, height } = containerRef.current.getBoundingClientRect();
      const scrollableDistance = height - window.innerHeight;
      const scrolled = -top;
      
      if (scrolled <= 0) {
        setProgress(0);
      } else if (scrolled >= scrollableDistance) {
        setProgress(1);
      } else {
        setProgress(scrolled / scrollableDistance);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // init
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const text = "We help organizations navigate the complexities of employee ownership by designing strategic equity frameworks that align stakeholders, strengthen governance, and create sustainable long-term value for businesses and their people.";
  const words = text.split(' ');

  // Calculate sub-progresses (Slower interaction)
  const bracketProgress = Math.min(progress / 0.35, 1);
  const bEase = easeOut(bracketProgress);
  
  const textRevealProgress = Math.max(0, Math.min((progress - 0.35) / 0.15, 1));
  const tEase = easeOut(textRevealProgress);
  
  const highlightProgress = Math.max(0, Math.min((progress - 0.50) / 0.50, 1));

  return (
    <section ref={containerRef} className="relative z-10 w-full bg-[#111] text-white h-[400vh]">
      <div className="sticky top-0 w-full h-screen flex justify-center items-center px-6 md:px-16 overflow-hidden">
        <div 
          className="relative max-w-[1200px] w-full mx-auto py-28 px-12 md:px-20 lg:px-32 flex items-center"
          style={{ 
            transform: `translateY(${15 - (highlightProgress * 35)}vh)` 
          }}
        >
          
          {/* Top Left Bracket */}
          <div 
            className="absolute top-0 left-0 w-24 h-32 md:w-32 md:h-48 border-t border-l border-white/60"
            style={{
              transform: `translate(${(1 - bEase) * 40}vw, ${(1 - bEase) * 30}vh)`,
              opacity: Math.min(bEase * 2, 1) // fade in quickly as it moves
            }}
          ></div>
          
          {/* Bottom Right Bracket */}
          <div 
            className="absolute bottom-0 right-0 w-24 h-32 md:w-32 md:h-48 border-b border-r border-white/60"
            style={{
              transform: `translate(${(1 - bEase) * -40}vw, ${(1 - bEase) * -30}vh)`,
              opacity: Math.min(bEase * 2, 1)
            }}
          ></div>

          {/* Text Container */}
          <p 
            className="text-xl md:text-2xl lg:text-[26px] leading-[1.7] font-light font-sans tracking-tight max-w-[1000px]"
            style={{
              opacity: tEase,
              transform: `translateY(${(1 - tEase) * 40}px)`
            }}
          >
            {words.map((word, i) => {
              const start = i / words.length;
              const end = start + (1 / words.length);
              
              // Calculate how much of this specific word should be highlighted
              // based on the overall highlight progress.
              const wordProgress = Math.max(0, Math.min((highlightProgress - start) / (end - start), 1));
              
              // Interpolate opacity between 0.2 and 1
              const opacity = 0.2 + (0.8 * wordProgress);
              
              return (
                <span 
                  key={i} 
                  style={{ color: `rgba(255, 255, 255, ${opacity})` }}
                >
                  {word}{' '}
                </span>
              );
            })}
          </p>
        </div>
      </div>
    </section>
  );
};
