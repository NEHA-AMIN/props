'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SplitText from './SplitText';
import { Button } from './ui';

const SignalSection: React.FC = () => {
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Check if animation has already played in this session
    const animated = sessionStorage.getItem('signalAnimated');
    if (animated === 'true') {
      setHasAnimated(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Intentionally no backend hookup here; this is a design-first section.
  };

  const handleAnimationComplete = () => {
    sessionStorage.setItem('signalAnimated', 'true');
    setHasAnimated(true);
  };

  return (
    <section
      id="signal"
      className="relative overflow-hidden bg-black py-28 sm:py-32"
      aria-label="Subscribe to The Signal monthly intelligence briefing"
    >
      {/* Atmospheric visual: subtle teal signal waves behind headline */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] opacity-25"
          style={{
            backgroundImage:
              'repeating-radial-gradient(circle at center, rgba(34,211,238,0.16) 0px, rgba(34,211,238,0.12) 2px, transparent 3px, transparent 42px)',
            filter: 'blur(12px)'
          }}
          animate={{ scale: [1, 1.03, 1], opacity: [0.22, 0.32, 0.22] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] opacity-20"
          style={{
            background:
              'radial-gradient(closest-side, rgba(20,184,166,0.18), transparent 70%)',
            filter: 'blur(20px)'
          }}
          animate={{ opacity: [0.18, 0.28, 0.18] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6">
        <div className="mx-auto text-center max-w-3xl">
          {/* Animated Headline with SplitText */}
          {hasAnimated ? (
            <h4 className="text-4xl md:text-5xl font-bold text-white dark:text-white tracking-tight">
              Subscribe to The Signal
            </h4>
          ) : (
            <SplitText
              text="Subscribe to The Signal"
              className="text-4xl md:text-5xl font-normal text-white dark:text-white tracking-tight"
              delay={20}
              duration={0.4}
              ease="power2.out"
              splitType="chars"
              from={{ opacity: 0, y: 20 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
              tag="h4"
              onLetterAnimationComplete={handleAnimationComplete}
            />
          )}

          {/* Description */}
          <motion.p
            className="mt-6 text-lg md:text-xl font-normal text-gray-200 dark:text-gray-200 leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.4, delay: hasAnimated ? 0 : 0.8, ease: "easeOut" }
            }}
            viewport={{ once: true }}
          >
            Our exclusive <span className="font-bold">Newsletter</span>. We dissect emerging geospatial trends, deconstruct successful enterprise strategies, and deliver the critical insights that will define the next decade of Physical AI.
          </motion.p>

          {/* Form: single elegant line with integrated button */}
          <motion.form
            onSubmit={handleSubmit}
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.4, delay: hasAnimated ? 0 : 0.8, ease: "easeOut" }
            }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mx-auto max-w-2xl rounded-full bg-slate-200 dark:bg-slate-900/50 backdrop-blur-sm shadow-lg shadow-primary-400/10">
              <input
                type="email"
                aria-label="Email address"
                placeholder="Enter your email"
                className="flex-1 bg-transparent text-slate-900 dark:text-slate-200 placeholder-slate-500 dark:placeholder-slate-500 px-6 py-4 outline-none"
                required
              />
              <Button
                type="submit"
                variant="glow"
                size="md"
                className="m-1"
                aria-label="Get The Signal"
              >
                Get The Signal
              </Button>
            </div>
            <p className="mt-3 text-sm text-gray-300 dark:text-gray-300">No spam. Only the signal.</p>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default SignalSection;