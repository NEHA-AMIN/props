'use client';
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import CaseStudyCarousel, { CASE_STUDIES } from './CaseStudyCarousel';



const CaseStudySection: React.FC = () => {
  const subtitleText =
    'See how our AI solutions have transformed businesses across industries with measurable results.';
  const subtitleWords = subtitleText.split(' ');

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { amount: 0.4 });

  const headingVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1] } }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.25 + i * 0.04, duration: 0.45, ease: [0.19, 1, 0.22, 1] }
    })
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-black text-slate-100 dark:text-white">
      <div className="container mx-auto px-4" ref={sectionRef}>
        <div className="text-center mb-8 md:mb-12">
          <motion.h2
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={headingVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-3 text-white"
          >
            Industries
          </motion.h2>
          <p className="text-base sm:text-lg md:text-xl font-normal text-gray-200 max-w-3xl mx-auto px-4">
            {subtitleWords.map((word, index) => (
              <React.Fragment key={`${word}-${index}`}>
                <motion.span
                  custom={index}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  variants={wordVariants}
                  className="inline-block"
                >
                  {word}
                </motion.span>
                {index < subtitleWords.length - 1 ? '\u00A0' : ''}
              </React.Fragment>
            ))}
          </p>
        </div>

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