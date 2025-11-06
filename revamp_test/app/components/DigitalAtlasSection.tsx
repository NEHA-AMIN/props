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

  // Video moves from 150vh (far below) to 0vh (centered)
  const videoY = useTransform(scrollYProgress, [0, 0.5], ['150vh', '0vh']);
  
  // Video opacity: starts at 0, becomes 1
  const videoOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [0, 1, 1]);
  
  // Text opacity: fades out as video comes up
  const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.45], [1, 1, 0]);
  
  // Text moves up and disappears
  const textY = useTransform(scrollYProgress, [0, 0.7], ['0vh', '-50vh']);
  
  // Left corner text appears after video is in place (after 50% scroll)
  const leftTextOpacity = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.8], [0, 1, 1, 0]);
  const leftTextY = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.8], [100, 0, 0, -650]);

  // Second text appears after first text disappears
  const secondTextOpacity = useTransform(scrollYProgress, [0.88, 0.92, 0.96, 1], [0, 1, 1, 0]);
  const secondTextY = useTransform(scrollYProgress, [0.88, 0.92, 0.96, 1], [100, 0, 0, -650]);

  return (
    <section 
      ref={sectionRef}
      className="relative bg-black h-[300vh]"
    >
      
      {/* Sticky container that holds both text and video */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Fixed Text in Center - Moves up and fades out */}
        <motion.div 
          style={{ 
            opacity: textOpacity,
            y: textY 
          }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white text-center px-6">
            Digital Atlas powered by Physical AI
          </h2>
        </motion.div>

        {/* Video Element that moves up from below */}
        <motion.div
          style={{
            y: videoY,
            opacity: videoOpacity
          }}
          className="absolute inset-0 flex items-center justify-end pr-32 z-10"
        >
          <div className="relative w-[60vw] h-[60vh] max-w-5xl">
            <video
              className="w-full h-full object-cover rounded-lg shadow-2xl"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/scan.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </motion.div>

        {/* Bottom Left Corner Text - Appears after video is in place */}
        <motion.div
          style={{
            opacity: leftTextOpacity,
            y: leftTextY
          }}
          className="absolute left-8 md:left-16 bottom-12 md:bottom-16 z-20 max-w-sm md:max-w-md"
        >
          <div className="text-white space-y-4">
            <h3 className="text-2xl md:text-3xl font-bold">
              Perceives the Physical World
            </h3>
            <p className="text-lg md:text-xl text-gray-300">
              Context Aware AI Agents continuously curate real-world data
            </p>
          </div>
        </motion.div>

        {/* Second Text - Appears after first text disappears */}
        <motion.div
          style={{
            opacity: secondTextOpacity,
            y: secondTextY
          }}
          className="absolute left-8 md:left-16 bottom-12 md:bottom-16 z-20 max-w-md md:max-w-lg"
        >
          <div className="text-white space-y-4">
            <h3 className="text-2xl md:text-3xl font-bold">
              Fuses Real world Signals
            </h3>
            <p className="text-lg md:text-xl text-gray-300">
              Like places, weather, people movement, demographics, and consumer sentiment - into comprehensive knowledge representation .
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DigitalAtlasSection;