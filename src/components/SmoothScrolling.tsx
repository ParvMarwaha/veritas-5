'use client';

import { ReactLenis } from 'lenis/react';

export function SmoothScrolling({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ 
      lerp: 0.08, 
      duration: 1.8, 
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    }}>
      {children}
    </ReactLenis>
  );
}
