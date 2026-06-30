'use client';

import React from 'react';

export const Footer = () => {
  return (
    <footer className="w-full bg-[#111] text-white pt-24 pb-12 px-6 md:px-16 border-t border-white/10">
      <div className="max-w-[1380px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
        
        {/* Brand / Logo */}
        <div className="lg:col-span-4 flex flex-col items-start">
          <div className="text-2xl italic font-serif tracking-tight mb-8">
            Veritas
          </div>
          <p className="text-white/50 text-[15px] font-sans max-w-[280px] leading-relaxed">
            Ownership structures designed for growth, not just compliance.
          </p>
        </div>

        {/* Quick Links */}
        <div className="lg:col-span-2 flex flex-col">
          <h4 className="text-white font-medium text-[15px] mb-6 tracking-tight">Quick Links</h4>
          <ul className="space-y-4">
            {['About Us', 'Why Veritas', 'Solutions', 'Knowledge Hub', 'Contact Us', 'Careers'].map((link) => (
              <li key={link}>
                <a href="#" className="text-white/50 hover:text-white transition-colors duration-300 text-[15px] font-sans">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Our Services */}
        <div className="lg:col-span-3 flex flex-col">
          <h4 className="text-white font-medium text-[15px] mb-6 tracking-tight">Our Services</h4>
          <ul className="space-y-4">
            {['ESOP\'s', 'Actuarial Valuations'].map((link) => (
              <li key={link}>
                <a href="#" className="text-white/50 hover:text-white transition-colors duration-300 text-[15px] font-sans">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="lg:col-span-3 flex flex-col">
          <h4 className="text-white font-medium text-[15px] mb-6 tracking-tight">Contact Info</h4>
          <p className="text-white/50 text-[15px] font-sans leading-relaxed mb-6">
            Emaar The Palm Square,<br />
            Unit No: 002, 15th Floor,<br />
            Golf Course Ext Rd, Sector 66,<br />
            Gurugram, Haryana 122102
          </p>
          <a href="#" className="text-white/50 hover:text-[#D02717] transition-colors duration-300 text-[15px] font-sans">
            LinkedIn
          </a>
        </div>

      </div>

      <div className="max-w-[1380px] mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between">
        <p className="text-white/40 text-[15px] font-sans">
          © Copyright Veritas 2026. All Rights Reserved.
        </p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="text-white/40 hover:text-white transition-colors duration-300 text-[15px] font-sans">
            Privacy Policy
          </a>
          <a href="#" className="text-white/40 hover:text-white transition-colors duration-300 text-[15px] font-sans">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};
