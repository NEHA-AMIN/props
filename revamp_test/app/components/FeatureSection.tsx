'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, cubicBezier } from 'framer-motion';
import { GradientButton } from '@/components/ui/gradient-button';

const DigitalAtlasAccessSection = () => {
  // Split-text heading animation setup
  const headingRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(headingRef, { amount: 0.3, once: true });

  const titleText = 'How can you access the Digital Atlas?';
  // Split into words so we can prevent breaking inside words on small screens
  const words = titleText.split(' ');

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
      title: "Use-Case Specific Applications",
      icon: (
        <svg className="w-8 h-8 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    },
    {
      number: "02",
      title: "API Access",
      icon: (
        <svg className="w-8 h-8 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      number: "03",
      title: "Model Integrations",
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
            {words.map((word, wi) => {
              // Determine if this word should be highlighted (Digital or Atlas)
              const plain = word.replace(/[^a-zA-Z]/g, '');
              const isTeal = plain === 'Digital' || plain === 'Atlas';

              return (
                <span key={wi} className="inline-block whitespace-nowrap mr-2">
                  {word.split('').map((ch, i) => (
                    <motion.span
                      key={`${wi}-${i}`}
                      custom={wi * 10 + i}
                      initial="hidden"
                      animate={inView ? 'visible' : 'hidden'}
                      variants={letterVariants}
                      className={`${isTeal ? 'text-teal-500' : 'text-white'} inline-block`}
                      style={{ display: 'inline-block' }}
                    >
                      {ch}
                    </motion.span>
                  ))}
                </span>
              );
            })}
          </h2>
        </div>

        {/* Mobile: stacked, compact cards */}
        <div className="md:hidden space-y-4 snap-y snap-proximity overflow-y-auto max-h-[85vh] touch-pan-y px-4">
          {steps.map((step, index) => (
            <motion.div
              key={`mobile-${index}`}
              className="bg-black border border-slate-800 rounded-xl px-5 py-4 w-full shadow-sm snap-start"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: 0.06 * index, ease: [0.19, 1, 0.22, 1] }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border-2 border-teal-500 flex items-center justify-center flex-shrink-0">
                  {step.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-semibold text-white leading-tight">{step.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop / larger screens: grid layout (3 columns) */}
        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative bg-black border border-slate-800 rounded-lg p-8 transition-all duration-300 group"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ 
                duration: 0.7, 
                delay: 0.15 * index,
                ease: [0.19, 1, 0.22, 1]
              }}
            >
              <div className="flex justify-center mb-6 mt-4">
                <div className="w-16 h-16 rounded-full border-2 border-teal-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>
              </div>

              <h3 className="text-xl font-bold text-white text-center leading-snug min-h-[3.5rem] flex items-center justify-center">
                {step.title}
              </h3>
            </motion.div>
          ))}
        </div>

        {/* CTA: Book Demo */}
        <div className="mt-12 flex justify-center">
          <Link href="/contact#contact-form" prefetch={false}>
            <GradientButton aria-label="Book a demo" variant="variant">
              Book Demo
            </GradientButton>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DigitalAtlasAccessSection;