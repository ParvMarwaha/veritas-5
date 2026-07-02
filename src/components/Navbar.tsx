'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AnimatedButton } from './AnimatedButton';
import { NavigationOverlay } from './NavigationOverlay';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const isHovered = useRef(false);
  
  const lastScrollY = useRef(0);
  const hideTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setIsScrolled(currentScrollY > 50);

      if (currentScrollY < 50) {
        setIsVisible(true);
        if (hideTimeout.current) clearTimeout(hideTimeout.current);
      } else {
        if (currentScrollY < lastScrollY.current) { 
          setIsVisible(true);
          
          if (hideTimeout.current) clearTimeout(hideTimeout.current);
          
          hideTimeout.current = setTimeout(() => {
            if (window.scrollY > 50 && !isHovered.current && !isMenuOpen) {
              setIsVisible(false);
            }
          }, 1500);
        } 
        else if (currentScrollY > lastScrollY.current) {
          setIsVisible(false);
          if (hideTimeout.current) clearTimeout(hideTimeout.current);
        }
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
    };
  }, []);

  // Prevent hiding if menu is explicitly opened
  useEffect(() => {
    if (isMenuOpen) {
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
      setIsVisible(true);
    }
  }, [isMenuOpen]);

  return (
    <>
      <NavigationOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      
      <header 
        onMouseEnter={() => isHovered.current = true}
        onMouseLeave={() => isHovered.current = false}
        className={`fixed top-0 left-0 w-full z-[90] px-12 py-8 flex justify-between items-center text-white transition-transform duration-200 ease-out ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        {/* Dark blurred background that fades in when scrolled past top */}
        <div className={`absolute inset-0 bg-gradient-to-b from-[#111]/90 to-transparent backdrop-blur-md -z-10 transition-opacity duration-500 ${isScrolled ? 'opacity-100' : 'opacity-0'}`}></div>
        
        <a href="/" className="flex items-center">
          <img src="/logo.png" alt="Veritas Logo" className="h-8 md:h-10 w-auto object-contain" />
        </a>
        
        <div className="flex items-center space-x-8 text-[0.9375rem] uppercase font-mono tracking-tight cursor-pointer">
          <AnimatedButton variant="text" className="px-0 py-0">
            Get in Touch
          </AnimatedButton>
          <div 
            onClick={() => setIsMenuOpen(true)}
            className="w-12 h-12 flex justify-center items-center group cursor-pointer -mr-3"
          >
            <div className="w-6 h-2 flex flex-col justify-between items-end">
              <div className="w-full h-[1px] bg-white transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:w-1/2 group-hover:-translate-x-1"></div>
              <div className="w-2/3 h-[1px] bg-white transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:w-full"></div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
