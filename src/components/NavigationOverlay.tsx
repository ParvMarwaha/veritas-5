import React, { useEffect } from 'react';
import { AnimatedButton } from './AnimatedButton';
import { useLenis } from 'lenis/react';
import { LiquifyBackground } from './LiquifyBackground';

interface NavigationOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NavigationOverlay: React.FC<NavigationOverlayProps> = ({ isOpen, onClose }) => {
  const lenis = useLenis();

  // Prevent scrolling when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      lenis?.stop();
    } else {
      document.body.style.overflow = 'unset';
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = 'unset';
      lenis?.start();
    };
  }, [isOpen, lenis]);

  return (
    <div 
      className={`fixed inset-0 z-[100] flex transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Solid background to prevent bleed-through */}
      <div className="absolute inset-0 bg-[#0a0a0a] -z-20"></div>

      {/* Menu Background Image */}
      <div className="absolute inset-0 w-full h-full -z-10">
        <LiquifyBackground />
      </div>

      {/* Left Panel (Content with dark tint over the image) */}
      <div className="flex-1 h-full bg-[#0a0a0a]/40 pt-24 pb-12 px-12 md:px-24 flex flex-col justify-center relative z-10">
        {/* Close Button Mobile */}
        <button 
          onClick={onClose}
          className={`md:hidden absolute top-8 right-8 text-white/50 hover:text-white transition-all duration-700 delay-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <nav className="flex flex-col space-y-2 md:space-y-4">
          {[
            'Home',
            'About Us',
            'Our Framework',
            'Insights',
            'Contact Us'
          ].map((item, index) => (
            <div className="overflow-hidden py-2 md:py-3" key={item}>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); onClose(); }}
                className={`group relative flex items-end w-fit transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
                style={{ transitionDelay: `${isOpen ? index * 80 : 0}ms` }}
              >
                <span className="text-white/40 font-mono text-[16px] md:text-[16px] mr-6 md:mr-12 mb-3 md:mb-5 tracking-widest group-hover:text-[#D02717] group-hover:-translate-y-2 transition-all duration-500 ease-out">
                  0{index + 1}
                </span>
                <span className="text-[42px] md:text-[64px] lg:text-[76px] font-serif tracking-tight text-white/70 group-hover:text-white group-hover:translate-x-4 transition-all duration-500 ease-out leading-[0.9]">
                  {item}
                </span>
              </a>
            </div>
          ))}
        </nav>
      </div>

      {/* Right Panel (Solid Dark) */}
      <div className="w-full md:w-[450px] lg:w-[500px] h-full bg-[#0a0a0a] flex flex-col justify-between pt-24 pb-12 px-12 border-l border-white/5">
        {/* Close Button Desktop */}
        <button 
          onClick={onClose}
          className="hidden md:flex absolute top-8 right-8 text-white/50 hover:text-[#D02717] p-2 transition-colors group"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:rotate-180 group-hover:scale-110">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Promotional Quote */}
        <div className={`flex flex-col items-start mt-12 md:mt-24 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] delay-300 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <h3 className="text-white font-serif italic text-[28px] md:text-[32px] leading-[1.2] mb-6">
            "Designing for true business outcomes."
          </h3>
          <p className="text-white/70 font-sans text-[16px] md:text-[15px] leading-relaxed max-w-[320px]">
            We help leaders design ownership programs that attract talent, align incentives, and create sustainable value for the long term.
          </p>
        </div>

        {/* Bottom Contact Info */}
        <div className={`grid grid-cols-2 gap-8 border-t border-white/10 pt-12 mt-12 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] delay-500 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="flex flex-col space-y-6">
            <h4 className="text-white/40 font-mono text-[11px] uppercase tracking-widest">Connect</h4>
            <ul className="flex flex-col space-y-4 font-mono text-[15px] tracking-tight text-white/90">
              <li><a href="#" className="hover:text-[#D02717] transition-colors">LinkedIn</a></li>
            </ul>
          </div>
          
          <div className="flex flex-col space-y-6">
            <h4 className="text-white/40 font-mono text-[11px] uppercase tracking-widest">Contact Us</h4>
            <ul className="flex flex-col space-y-4 font-mono text-[15px] tracking-tight text-white/90 leading-[1.6]">
              <li><a href="#" className="hover:text-[#D02717] transition-colors">contact@veritas.in</a></li>
              <li>+91 9560952022</li>
              <li>Gurugram, Haryana, India</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};
