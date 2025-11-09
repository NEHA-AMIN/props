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
  // Starts from middle (0), moves up (-300)
  const leftTextOpacity = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.8], [0, 1, 1, 0]);
  const leftTextY = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.8], [0, 0, -50, -300]);

  // Second text appears after first text disappears and stays in place
  const secondTextOpacity = useTransform(scrollYProgress, [0.88, 0.92], [0, 1]);
  const secondTextY = useTransform(scrollYProgress, [0.88, 0.92], [0, 0]);

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
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal italic text-white text-center px-6">
            Digital Atlas powered by Physical AI
          </h2>
        </motion.div>

        {/* Video Element that moves up from below */}
        <motion.div
          style={{
            y: videoY,
            opacity: videoOpacity
          }}
          className="absolute inset-0 flex items-center justify-center lg:justify-end lg:pr-32 px-4 z-10"
        >
          <div className="relative w-[50vw] h-[15vh] sm:w-[55vw] sm:h-[25vh] md:w-[45vw] md:h-[30vh] lg:w-[55vw] lg:h-[50vh] xl:w-[60vw] xl:h-[60vh] max-w-5xl">
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
          className="absolute left-4 md:left-8 lg:left-16 bottom-16 lg:top-1/2 lg:-translate-y-1/2 z-20 max-w-[80vw] sm:max-w-sm md:max-w-md"
        >
          <div className="text-white space-y-1 sm:space-y-2 md:space-y-3 lg:space-y-4">
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-normal italic">
              Perceives the Physical World
            </h3>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 italic">
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
          className="absolute left-4 md:left-8 lg:left-16 bottom-16 lg:top-1/2 lg:-translate-y-1/2 z-20 max-w-[80vw] sm:max-w-md md:max-w-lg"
        >
          <div className="text-white space-y-1 sm:space-y-2 md:space-y-3 lg:space-y-4">
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-normal italic">
              Fuses Real world Signals
            </h3>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 italic">
              Like places, weather, people movement, demographics, and consumer sentiment - into comprehensive knowledge representation .
            </p>
          </div>
        </motion.div>

        {/* Scroll indicator - same as hero section */}
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