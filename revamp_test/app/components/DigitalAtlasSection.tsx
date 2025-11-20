'use client';
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const DigitalAtlasSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress through this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  // Desktop transforms (unchanged from original)
  const videoY = useTransform(scrollYProgress, [0, 0.5], ['150vh', '0vh']);
  const firstVideoOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.82, 0.95], [0, 1, 1, 1, 0]);
  const secondVideoOpacity = useTransform(scrollYProgress, [0.82, 0.95], [0, 1]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.45], [1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.7], ['0vh', '-50vh']);
  const leftTextOpacity = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.8], [0, 1, 1, 0]);
  const leftTextY = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.8], [0, 0, -50, -300]);
  const secondTextOpacity = useTransform(scrollYProgress, [0.88, 0.92], [0, 1]);
  const secondTextY = useTransform(scrollYProgress, [0.88, 0.92], [0, 0]);

  // Mobile transforms (optimized)
  const mobileTitleOpacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
  const mobileCard1Y = useTransform(scrollYProgress, [0.10, 0.30], ['100vh', '0vh']);
  const mobileCard1Opacity = useTransform(scrollYProgress, [0.30, 0.45, 0.60], [1, 1, 0]);
  const mobileCard2Y = useTransform(scrollYProgress, [0.45, 0.65], ['100vh', '0vh']);

  return (
    <section 
      ref={sectionRef}
      className="relative bg-black h-[220vh] md:h-[300vh]"
    >
      
      {/* Mobile: stacked card layout (visible up to md breakpoint) */}
      <div className="block md:hidden">
        {/* Container for title and both cards - all in same sticky context */}
        <div className="min-h-[220vh]">
          <div className="sticky top-0 h-screen flex items-center justify-center">
            
            {/* Title Text - stays in place, covered by cards */}
            <motion.div 
              style={{ opacity: mobileTitleOpacity }} 
              className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none"
            >
              <div className="text-center px-6">
                <h2 className="text-3xl font-normal text-white gradient-sweep-text">Digital Atlas powered by Physical AI</h2>
              </div>
            </motion.div>

            {/* First Card - slides up on top of title, then fades */}
            <motion.div 
              className="absolute w-full max-w-xl px-6 z-10" 
              style={{ 
                y: mobileCard1Y,
                opacity: mobileCard1Opacity 
              }}
            >
              <div className="rounded-2xl overflow-hidden bg-black shadow-lg">
                <div className="w-full h-[48vh] sm:h-[40vh] relative">
                  <video className="w-full h-full object-cover" autoPlay muted loop playsInline>
                    <source src="/scan.webm" type="video/webm" />
                  </video>
                </div>
                <div className="py-6 px-4 text-center">
                  <h3 className="text-2xl text-white">Perceives the Physical World</h3>
                  <p className="mt-3 text-gray-300">Context Aware AI Agents continuously curate real-world data.</p>
                </div>
              </div>
            </motion.div>

            {/* Second Card - slides up on top of first card */}
            <motion.div 
              className="absolute w-full max-w-xl px-6 z-20" 
              style={{ y: mobileCard2Y }}
            >
              <div className="rounded-2xl overflow-hidden bg-black shadow-lg">
                <div className="w-full h-[48vh] sm:h-[40vh] relative">
                  <video className="w-full h-full object-cover" autoPlay muted loop playsInline>
                    <source src="/digi2.webm" type="video/webm" />
                  </video>
                </div>
                <div className="py-6 px-4 text-center">
                  <h3 className="text-2xl text-white">Fuses Real world Signals</h3>
                  <p className="mt-3 text-gray-300">Like places, weather, people movement, demographics, and consumer sentiment.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Desktop: Original logic restored */}
      <div className="hidden md:block sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Fixed Text in Center - Moves up and fades out */}
        <motion.div 
          style={{ 
            opacity: textOpacity,
            y: textY 
          }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal text-white text-center px-6 gradient-sweep-text">
            Digital Atlas powered by Physical AI
          </h2>
        </motion.div>

        {/* Video Container that moves up from below */}
        <motion.div
          style={{
            y: videoY
          }}
          className="absolute inset-0 flex items-center justify-center md:justify-end md:pr-8 lg:pr-16 xl:pr-24 px-4 z-10"
        >
          <div className="relative w-[70vw] h-[20vh] sm:w-[65vw] sm:h-[28vh] md:w-[50vw] md:h-[35vh] lg:w-[48vw] lg:h-[45vh] xl:w-[50vw] xl:h-[55vh] max-w-4xl">
            {/* First Video */}
            <motion.video
              style={{ 
                opacity: firstVideoOpacity,
                borderRadius: '150px'
              }}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/scan.webm" type="video/webm" />
              Your browser does not support the video tag.
            </motion.video>
            
            {/* Second Video */}
            <motion.video
              style={{ 
                opacity: secondVideoOpacity,
                borderRadius: '150px'
              }}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/digi2.webm" type="video/webm" />
              Your browser does not support the video tag.
            </motion.video>
          </div>
        </motion.div>

        {/* Bottom Left Corner Text - First text */}
        <motion.div
          style={{
            opacity: leftTextOpacity,
            y: leftTextY
          }}
          className="absolute left-4 md:left-8 lg:left-12 xl:left-16 top-1/2 -translate-y-1/2 z-20 max-w-[85vw] sm:max-w-[45vw] md:max-w-[38vw] lg:max-w-[35vw] xl:max-w-[32vw]"
        >
          <div className="text-white space-y-1 sm:space-y-2 md:space-y-3 lg:space-y-4">
            <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-normal leading-tight">
              Perceives the Physical World
            </h3>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-300 leading-snug">
              Context Aware AI Agents continuously curate real-world data
            </p>
          </div>
        </motion.div>

        {/* Second Text */}
        <motion.div
          style={{
            opacity: secondTextOpacity,
            y: secondTextY
          }}
          className="absolute left-4 md:left-8 lg:left-12 xl:left-16 top-1/2 -translate-y-1/2 z-20 max-w-[85vw] sm:max-w-[45vw] md:max-w-[40vw] lg:max-w-[38vw] xl:max-w-[35vw]"
        >
          <div className="text-white space-y-1 sm:space-y-2 md:space-y-3 lg:space-y-4">
            <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-normal leading-tight">
              Fuses Real world Signals
            </h3>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-300 leading-snug">
              Like places, weather, people movement, demographics, and consumer sentiment -into the most comprehensive representaion of the world
            </p>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <span className="text-sm text-slate-400 mb-2">Scroll Down</span>
          <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center p-1">
            <motion.div 
              className="w-1 h-2 bg-teal-400 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DigitalAtlasSection;