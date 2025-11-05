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
  
  // Text opacity: stays 1 until 70% scroll, then fades to 0
  const textOpacity = useTransform(scrollYProgress, [0, 0.4, 0.5], [1, 1, 0]);
  
  // Left corner text appears after video is in place (after 50% scroll)
  const leftTextOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);
  const leftTextX = useTransform(scrollYProgress, [0.5, 0.7], [-50, 0]);

  return (
    <section 
      ref={sectionRef}
      className="relative bg-black h-[300vh]"
    >
      {/* Bottom border line for consistency */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-slate-800 z-30"></div>
      
      {/* Sticky container that holds both text and video */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Fixed Text in Center - Stays in place, fades out */}
        <motion.div 
          style={{ opacity: textOpacity }}
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
          className="absolute inset-0 flex items-center justify-center z-10"
        >
          <div className="relative w-[80vw] h-[60vh] max-w-5xl">
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
            x: leftTextX
          }}
          className="absolute left-8 md:left-12 bottom-12 md:bottom-16 z-20 max-w-md"
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
      </div>
    </section>
  );
};

export default DigitalAtlasSection;