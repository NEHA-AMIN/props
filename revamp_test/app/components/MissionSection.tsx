'use client';
import React, { useRef } from 'react';
import { motion, useInView, cubicBezier } from 'framer-motion';

const MissionSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { amount: 0.3, once: true });
  
  const headingText = "Physical AI";
  const paragraphText = "Delivering the most comprehensive understanding of the real world - enabling humans and autonomous systems (robots, AVs, and software agents) to perceive, act, and deliver outcomes with confidence.";
  
  // Split heading into letters (kept), paragraph into words to avoid mid-word breaks
  const headingLetters = headingText.split('');
  const paragraphWords = paragraphText.split(' ');

  // Letter animation - each letter slides in with squeeze effect
  const letterVariants = {
    hidden: {
      opacity: 0,
      x: 40,
      scaleX: 0.3,
    },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      scaleX: 1,
      transition: {
        duration: 0.8,
        delay: i * 0.025, // Stagger delay between letters
        ease: cubicBezier(0.19, 1, 0.22, 1), // easeOutExpo
      }
    })
  };

  // Paragraph word animation with base delay to start after heading
  const paragraphWordVariants = {
    hidden: {
      opacity: 0,
      x: 20,
      scaleX: 0.98,
    },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      scaleX: 1,
      transition: {
        duration: 0.5,
        delay: 0.3 + (i * 0.03), // Stagger by word
        ease: cubicBezier(0.19, 1, 0.22, 1),
      }
    })
  };

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32 bg-black">
      {/* Subtle grid background overlay */}
      <div className="absolute inset-0 bg-black z-0">
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
      
      <div className="relative z-10 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
          {/* Left column - Animated Heading */}
          <div className="md:col-span-3">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              {/* Animated letters */}
              {headingLetters.map((letter, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={letterVariants}
                  className="inline-block"
                  style={{ display: 'inline-block' }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </h2>
          </div>
          
          {/* Right column - Paragraph animated per-word to prevent mid-word wrapping */}
          <div className="md:col-span-9">
            <p className="text-xl md:text-2xl text-white leading-relaxed">
              {paragraphWords.map((word, index) => (
                <React.Fragment key={`${word}-${index}`}>
                  <motion.span
                    custom={index}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={paragraphWordVariants}
                    className="inline-block"
                    style={{ display: 'inline-block' }}
                  >
                    {word}
                  </motion.span>{' '}
                </React.Fragment>
              ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;