'use client';

import React, { useRef } from 'react';
import { motion, useInView, cubicBezier } from 'framer-motion';

const DigitalAtlasAccessSection = () => {
  // Split-text heading animation setup
  const headingRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(headingRef, { amount: 0.3 });

  const titleText = 'How can you access the Digital Atlas?';
  const letters = titleText.split('');
  const tealStart = titleText.indexOf('Digital Atlas');
  const tealEnd = tealStart + 'Digital Atlas'.length;

  const letterVariants = {
    hidden: { opacity: 0, x: 40, scaleX: 0.3 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      scaleX: 1,
      transition: {
        duration: 0.8,
        delay: i * 0.025,
        ease: cubicBezier(0.19, 1, 0.22, 1),
      },
    }),
  };
  const steps = [
    {
      number: "01",
      title: "Query Digital Atlas directly",
      icon: (
        <svg className="w-8 h-8 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    },
    {
      number: "02",
      title: "API Call",
      icon: (
        <svg className="w-8 h-8 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      number: "03",
      title: "Plug in Applications",
      icon: (
        <svg className="w-8 h-8 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
        </svg>
      )
    },
    {
      number: "04",
      title: "Feed into models",
      icon: (
        <svg className="w-8 h-8 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      )
    }
  ];

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-black">
      {/* Subtle grid pattern background (exactly matching CaseStudySubPart) */}
      <div className="absolute inset-0 bg-black z-0">
        {/* Grid lines with glow */}
        <div
          className="absolute inset-0 opacity-90"
          style={{
            backgroundImage:
              `linear-gradient(to right, rgba(100, 200, 255, 0.3) 1px, transparent 1px),
               linear-gradient(to bottom, rgba(100, 200, 255, 0.3) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
            filter: 'blur(0.5px)'
          }}
        />
        {/* Intersection dots */}
        <div
          className="absolute inset-0 opacity-100"
          style={{
            backgroundImage:
              'radial-gradient(circle at 0 0, rgba(120, 220, 255, 0.8) 2px, transparent 2px)',
            backgroundSize: '80px 80px',
            filter: 'blur(1px)'
          }}
        />
      </div>
      {/* Removed partition border overlay */}
      
      <div className="relative z-10 container mx-auto px-6">
        {/* Section Title */}
        <div ref={headingRef} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-normal mb-4">
            {letters.map((ch, i) => (
              <motion.span
                key={i}
                custom={i}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                variants={letterVariants}
                className={`${i >= tealStart && i < tealEnd ? 'text-teal-500' : 'text-white'} inline-block`}
                style={{ display: 'inline-block' }}
              >
                {ch === ' ' ? '\u00A0' : ch}
              </motion.span>
            ))}
          </h2>
        </div>

        {/* Four Column Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative bg-black border border-slate-800 rounded-lg p-8 hover:border-teal-500/50 transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              {/* Step Number */}
              <div className="absolute top-4 right-4 text-5xl font-bold text-slate-800 group-hover:text-slate-700 transition-colors duration-300">
                {step.number}
              </div>

              {/* Icon */}
              <div className="flex justify-center mb-6 mt-4">
                <div className="w-16 h-16 rounded-full border-2 border-teal-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white text-center leading-snug min-h-[3.5rem] flex items-center justify-center">
                {step.title}
              </h3>

              {/* Connector Arrow (hidden on last item and on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-20">
                  {/* <svg className="w-6 h-6 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg> */}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DigitalAtlasAccessSection;