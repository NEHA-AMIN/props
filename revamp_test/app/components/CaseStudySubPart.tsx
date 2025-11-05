'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CaseStudy {
  id: number;
  title: string;
  description: string[];
  image: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: 1,
    title: 'Market expansion & store network planning for a leading affordable coffee chain:',
    description: [
      'The coffee chain was able to see real demand at a micro-market level with Digital Atlas - identifying whitespace, reducing cannibalization, and prioritizing high-yield catchments.',
      'The coffee chain was able to turn those signals into a clear 2030 expansion plan with Digital Atlas - where to open next, in what order, and with confidence.'
    ],
    image: 'https://media.giphy.com/media/3oKIPnAiaMCws8nOsE/giphy.gif'
  },
  {
    id: 2,
    title: 'Demand Forecasting for a Leading CPG Network',
    description: [
      'A full-stack platform combining Digital Atlas (multimodal real-world signals) with a custom, context-specific AI demand model enriched by store-specific embeddings.',
      'Replaced traditional statistical methods with context-specific AI to better learn SKU-level demand patterns, incorporating brand sentiments, neighborhood trends, and weather patterns.'
    ],
    image: 'https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif'
  },
  {
    id: 3,
    title: 'Reimagining CPG Sales Execution with Real-World Aware Product Recommendations',
    description: [
      'A Product Recommendation Module that fused first-party sales with Digital Atlas signals to estimate true SKU potential per outlet and guide real-time conversations.',
      'Equipped field reps with outlet-specific, real-world aware SKU recommendations and AI-generated pitches in Bahasa to support on-the-spot selling.'
    ],
    image: 'https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif'
  },
  {
    id: 4,
    title: 'Store Network Planning & Optimization',
    description: [
      'Leveraged Digital Atlas to optimize existing store network and identify underperforming locations for repositioning or closure.',
      'Built predictive models to forecast store performance based on catchment area characteristics and competitive landscape dynamics.'
    ],
    image: 'https://media.giphy.com/media/3o7buirYcmV5nSwIRW/giphy.gif'
  }
];

const CaseStudySubPart = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentStudy = caseStudies[currentIndex];

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % caseStudies.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + caseStudies.length) % caseStudies.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-[#0b0e14]">
      {/* Grid pattern background matching Industries section */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-20"
             style={{
               backgroundImage: 'linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)',
               backgroundSize: '80px 80px'
             }}>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute top-8 right-8 z-20 flex gap-3">
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

      <div 
        className={`relative z-10 max-w-7xl mx-auto px-8 transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
      >
        <div className="flex flex-col lg:flex-row items-start justify-between gap-16">
          
          {/* Left: Text */}
          <div className="flex-1 space-y-6 self-start">
            <div className="inline-flex items-center px-3 py-1 rounded-md bg-blue-900/40 border border-blue-700/30 text-blue-400 text-sm font-medium">
              <span className="mr-1"></span> Case Study
            </div>
            <h2 className="text-4xl lg:text-4xl font-bold text-white leading-tight mt-6">
              {currentStudy.title}
            </h2>
            
            {/* <div className="flex flex-col space-y-2">
              <p className="text-3xl font-semibold text-teal-400">+23% more viable zones</p>
              <p className="text-3xl font-semibold text-teal-400">+15% revenue uplift</p>
            </div> */}
            <div className="space-y-5 mt-6">
              {currentStudy.description.map((para, idx) => (
                <p key={idx} className="text-lg text-gray-300 leading-relaxed">
                  {para}
                </p>
              ))}
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
                  ? 'w-8 bg-blue-500' 
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