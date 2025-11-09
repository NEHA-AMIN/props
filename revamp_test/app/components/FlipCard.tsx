'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from './ui';

export interface FlipCardProps {
  frontIcon: React.ReactNode;
  frontTitle: string;
  frontDescription: string;
  backTitle?: string;
  backPoints: string[];
}

export const FlipCard: React.FC<FlipCardProps> = ({
  frontIcon,
  frontTitle,
  frontDescription,
  backTitle,
  backPoints,
}) => {
  const [isFlipped, setIsFlipped] = React.useState(false);

  return (
    <div
      className="relative w-full h-[300px] perspective-1000 group"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="w-full h-full relative preserve-3d"
        animate={{ 
          rotateY: isFlipped ? 180 : 0,
          scale: isFlipped ? 1.02 : 1,
        }}
        transition={{ 
          duration: 0.4,
          ease: [0.23, 1, 0.32, 1] as any, // Cubic bezier for smooth yet snappy effect
          scale: {
            duration: 0.2,
            ease: "easeOut"
          }
        }}
      >
        {/* Front of card */}
        <div className="absolute w-full h-full backface-hidden">
          <div className="bg-[#0B0F0E]/90 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-8 h-full flex flex-col shadow-lg transition-all duration-300 group-hover:border-teal-500/30 group-hover:shadow-teal-500/10">
            <div className="mb-4">
              <Badge>Solutions</Badge>
            </div>
            <motion.div
              animate={{ scale: isFlipped ? 0.8 : 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="mb-4"
            >
              {frontIcon}
            </motion.div>
            <h4 className="text-xl font-bold text-slate-100 mb-3 text-center transition-colors duration-300 group-hover:text-teal-300 tracking-tight">
              {frontTitle}
            </h4>
            <p className="text-slate-300/90 text-sm text-center leading-relaxed">
              {frontDescription}
            </p>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180">
          <div className="bg-[#0B0F0E]/90 backdrop-blur-sm border border-teal-800/30 rounded-2xl p-8 h-full shadow-lg transition-all duration-300">
            <div className="mb-4">
              <Badge variant="primary">Key Features</Badge>
            </div>
            <h4 className="text-xl font-bold text-slate-100 mb-6 tracking-tight">
              {backTitle || frontTitle}
            </h4>
            <ul className="space-y-3">
              {backPoints.map((point, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: isFlipped ? 1 : 0, x: isFlipped ? 0 : -10 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-start text-slate-300/90 text-sm"
                >
                  <span className="inline-block w-2 h-2 rounded-full bg-teal-400/80 mt-1.5 mr-3 shrink-0" />
                  <span className="leading-relaxed">{point}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FlipCard;