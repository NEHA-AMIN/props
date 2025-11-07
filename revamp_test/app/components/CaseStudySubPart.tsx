'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { animate, useInView } from 'framer-motion';

interface CaseStudy {
  id: number;
  title: string;
  description: string[];
  image: string;
  metricValue: number;
  metricLabel: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: 1,
    title: 'Store network planning for a leading coffee chain:',
    description: [
      'The coffee chain was able to see real demand at a micro-market level with Digital Atlas - identifying whitespace and prioritizing high-yield catchments.',
      'They were able to turn those signals into a clear 2030 expansion plan with Digital Atlas - where to open next, in what order, and with confidence.'
    ],
    image: 'https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif',
    metricValue: 23,
    metricLabel: 'more viable zones'
  },
  {
    id: 2,
    title: 'Demand Forecasting for a Leading CPG Network',
    description: [
      'A full-stack platform combining Digital Atlas + context-aware AI demand model enriched by store-specific embeddings.',
      'Thus we replaced old statistical methods to better learn SKU-level demand patterns, incorporating brand sentiments, neighborhood trends, and weather patterns.'
    ],
    image: 'https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif',
    metricValue: 15,
    metricLabel: 'revenue uplift'
  },
  {
    id: 3,
    title: 'Real-World Aware AI for Smarter CPG Sales Execution',
    description: [
      'A Product Recommendation Module that fused first-party sales with Digital Atlas signals to estimate true SKU potential per outlet and guide real-time conversations.',
      'Equipped field reps with outlet-specific, real-world aware SKU recommendations and AI-generated pitches in Bahasa to support on-the-spot selling.'
    ],
    image: 'https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif',
    metricValue: 12,
    metricLabel: 'SKU sales lift'
  },
  {
    id: 4,
    title: 'Store Network Planning & Optimization',
    description: [
      'Leveraged Digital Atlas to optimize existing store network and identify underperforming locations for repositioning or closure.',
      'We built predictive models to forecast store performance based on catchment area characteristics and competitive landscape dynamics.'
    ],
    image: 'https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif',
    metricValue: 8,
    metricLabel: ' optimization '
  }
];

const CaseStudySubPart = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [counterValue, setCounterValue] = useState(0);
  const [hasPopped, setHasPopped] = useState(false);
  const counterRef = useRef<HTMLDivElement | null>(null);
  const counterInView = useInView(counterRef, { once: true, amount: 0.8 });

  const currentStudy = caseStudies[currentIndex];

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % caseStudies.length);
    setTimeout(() => setIsTransitioning(false), 400);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + caseStudies.length) % caseStudies.length);
    setTimeout(() => setIsTransitioning(false), 400);
  };

  // Animate the percentage counter smoothly from 0 to case metric when entering viewport
  useEffect(() => {
    if (!counterInView) return;
    
    const controls = animate(0, currentStudy.metricValue, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1], // Smooth easeOutExpo curve
      onUpdate: (v) => {
        setCounterValue(v); // Keep decimal precision
        // Trigger pop when reaching the end
        if (v >= currentStudy.metricValue - 0.05 && !hasPopped) {
          setHasPopped(true);
        }
      }
    });
    
    return () => controls.stop();
  }, [counterInView, hasPopped, currentStudy.metricValue]);

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-black">
      {/* Background Elements - Glowing Grid Pattern */}
      <div className="absolute inset-0 bg-black z-0">
        {/* Grid lines with glow */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(100, 200, 255, 0.3) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(100, 200, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            filter: 'blur(0.5px)'
          }}
        />
        
        {/* Intersection dots */}
        <div 
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: 'radial-gradient(circle at 0 0, rgba(120, 220, 255, 0.8) 2px, transparent 2px)',
            backgroundSize: '80px 80px',
            filter: 'blur(1px)'
          }}
        />
      </div>

      <div 
        className={`relative z-10 max-w-7xl mx-auto px-8 transition-opacity duration-100 ease-linear ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
      >
        <div className="flex flex-col lg:flex-row items-start justify-between gap-16">
          
          {/* Left: Text */}
          <div className="flex-1 space-y-6 self-start">
            <div className="inline-flex items-center px-3 py-1 rounded-md bg-teal-900/40 border border-teal-700/30 text-teal-400 text-sm font-medium">
              <span className="mr-1"></span> Case Study
            </div>
            <h2 className="text-4xl lg:text-4xl font-normal text-white leading-tight mt-6">
              {currentStudy.title}
            </h2>
            
            <div className="space-y-5 mt-6">
              {currentStudy.description.map((para, idx) => (
                <p key={idx} className="text-lg font-normal text-gray-300 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>

            {/* Metric Counter */}
            <div ref={counterRef} className="mt-6 flex items-baseline gap-4">
              <span 
                className={`text-5xl md:text-6xl font-bold text-teal-400 tracking-tight transition-transform duration-300 ease-out ${
                  hasPopped ? 'animate-pop' : ''
                }`}
                aria-label="Ten percent increase"
                style={{
                  animation: hasPopped ? 'pop 0.4s ease-out' : 'none'
                }}
              >
                {counterValue >= currentStudy.metricValue - 0.05 ? Math.round(currentStudy.metricValue) : counterValue.toFixed(1)}
                <span className="ml-1">%</span>
              </span>
              <span className="text-lg md:text-xl font-normal italic text-teal-400">{currentStudy.metricLabel}</span>
            </div>

            <style jsx>{`
              @keyframes pop {
                0% {
                  transform: scale(1);
                }
                50% {
                  transform: scale(1.15);
                }
                100% {
                  transform: scale(1);
                }
              }
            `}</style>

            {/* Navigation Arrows: left aligned below description */}
            <div className="mt-8 flex gap-3">
              <button
                onClick={handlePrev}
                disabled={isTransitioning}
                className="group p-3 rounded-lg bg-gray-800/50 border border-gray-700/50 hover:bg-gray-700/50 hover:border-gray-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous case study"
              >
                <ChevronLeft className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
              </button>
              <button
                onClick={handleNext}
                disabled={isTransitioning}
                className="group p-3 rounded-lg bg-gray-800/50 border border-gray-700/50 hover:bg-gray-700/50 hover:border-gray-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next case study"
              >
                <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
              </button>
            </div>
          </div>

          {/* Right: Image */}
          <div className="flex-1 relative">
            <div className="sticky top-24">
              <div className="rounded-xl overflow-hidden shadow-lg">
                {/* Case Study GIF implementation */}
                <Image
                  src={currentStudy.image}
                  alt="Case Study metrics visualization"
                  width={1200}
                  height={1200}
                  className="w-full h-full object-cover"
                  priority
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-12">
          {caseStudies.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (!isTransitioning) {
                  setIsTransitioning(true);
                  setCurrentIndex(idx);
                  setTimeout(() => setIsTransitioning(false), 500);
                }
              }}
              className={`h-2 rounded-full transition-all ${
                idx === currentIndex 
                  ? 'w-8 bg-teal-500' 
                  : 'w-2 bg-gray-600 hover:bg-gray-500'
              }`}
              aria-label={`Go to case study ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudySubPart;