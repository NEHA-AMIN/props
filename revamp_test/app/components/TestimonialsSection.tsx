'use client';
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import TestimonialGrid from './TestimonialGrid';

export default function TestimonialsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Section uses TestimonialGrid component which has its own animations

  return (
    <section ref={sectionRef} className="w-full py-16 md:py-24 bg-slate-950 dark:bg-slate-950 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 mb-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white dark:text-white mb-4"
            initial={{ opacity: 0, y: -30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as any }}
          >
            What Our Clients Say
          </motion.h2>
          <motion.p
            className="text-lg text-gray-200 dark:text-gray-200"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as any, delay: 0.2 }}
          >
            Discover how Propheus is transforming businesses across industries
          </motion.p>
        </div>
      </div>
      
      <TestimonialGrid />
    </section>
  );
}