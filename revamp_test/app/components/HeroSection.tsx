// ============================================
// HeroSection.tsx
// ============================================
"use client";
import React from "react";
import { motion } from "framer-motion";
import VideoBackground from "./VideoBackground";

interface HeroSectionProps {
  onVideoLoad?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onVideoLoad }) => {
  return (
    <section
      className="relative overflow-hidden w-full h-[60vh] md:h-screen"
    >
      {/* Background: plain black */}
      <div className="absolute inset-0 z-0 bg-black" />
      {/* Centered video container with padding only on top/bottom */}
      <div className="relative z-10 flex items-center justify-center h-full w-full py-8 md:py-0">
        <div className="w-full h-[calc(100%-4rem)] md:h-full bg-black/60 md:bg-transparent rounded-xl md:rounded-none overflow-hidden shadow-2xl md:shadow-none">
          <VideoBackground
            videoSources={{
              highest: 'https://res.cloudinary.com/doiftjxrr/video/upload/v1763634180/hero-background-1_qbuwp8.mp4',
              high: 'https://res.cloudinary.com/doiftjxrr/video/upload/v1763634180/hero-background-1_qbuwp8.mp4',
              medium: 'https://res.cloudinary.com/doiftjxrr/video/upload/v1763634180/hero-background-1_qbuwp8.mp4',
              low: 'https://res.cloudinary.com/doiftjxrr/video/upload/v1763634180/hero-background-1_qbuwp8.mp4'
            }}
            className="w-full h-full object-cover"
            onLoad={onVideoLoad}
          />
        </div>
      </div>
      {/* Content container for overlay UI (scroll indicator etc) */}
      <div className="relative z-[20] h-full w-full pointer-events-none">
        <motion.div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center pointer-events-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
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

export default HeroSection;
