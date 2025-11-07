'use client';
import React from 'react';
import { motion } from 'framer-motion';
import CaseStudyCarousel, { CASE_STUDIES } from './CaseStudyCarousel';



const CaseStudySection: React.FC = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-black text-slate-100 dark:text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold italic mb-3 md:mb-3 text-white">Industries</h2>
          <p className="text-base sm:text-lg md:text-xl font-normal italic text-gray-200 max-w-3xl mx-auto px-4">
            See how our AI solutions have transformed businesses across industries with measurable results.
          </p>
        </motion.div>
        
        <CaseStudyCarousel 
          caseStudies={CASE_STUDIES}
          scaleDelta={0.08}
          opacityDelta={0.25}
          transitionDuration={1}
          autoScrollInterval={3000}
        />
      </div>
    </section>
  );
};

export default CaseStudySection;