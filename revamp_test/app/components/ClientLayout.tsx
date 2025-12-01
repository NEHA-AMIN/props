'use client';
import React, { useEffect, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { ThemeProvider } from '../providers/ThemeProvider';
import Navbar from './Navbar';
import Footer from './Footer';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [animationsEnabled, setAnimationsEnabled] = useState<boolean>(true);

  useEffect(() => {
    try {
      const played = typeof window !== 'undefined' && window.localStorage.getItem('animationsPlayed') === 'true';
      const enabled = !played;
      setAnimationsEnabled(enabled);
      (window as any).__animationsEnabled__ = enabled;

      if (enabled) {
        const markPlayed = () => {
          try {
            window.localStorage.setItem('animationsPlayed', 'true');
          } catch (_) {}
        };
        window.addEventListener('scroll', markPlayed, { once: true, passive: true });
        return () => window.removeEventListener('scroll', markPlayed);
      }
    } catch (_) {}
  }, []);

  return (
    <ThemeProvider>
      <MotionConfig reducedMotion={animationsEnabled ? 'never' : 'always'}>
        <Navbar />
        {children}
        <Footer />
      </MotionConfig>
    </ThemeProvider>
  );
}
