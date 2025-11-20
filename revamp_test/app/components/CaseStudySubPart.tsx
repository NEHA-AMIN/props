"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useInView, motion } from 'framer-motion';
// import VideoModal from '@/components/VideoModal';
// VideoModal left in repo but not used for the decorative autoplay behavior

interface CaseStudy {
  id: number;
  title: string;
  description: string[];
  image: string;
  metricValue: number;
  metricLabel: string;
  metrics?: { value: number; label: string; prefix?: string; suffix?: string }[];
}

const caseStudies: CaseStudy[] = [
  {
    id: 1,
    title: 'Market Expansion for a leading coffee chain',
    description: [
      'The coffee chain was able to see real demand at a micro-market level with Digital Atlas - identifying whitespace, reducing cannibalization, and prioritizing high-yield catchments.',
      'The coffee chain was able to turn those signals into a clear 2030 expansion plan with Digital Atlas - where to open next, in what order, and with confidence.'
    ],
    image: '/Users/neha/Desktop/Propheus/props/revamp_test/public/Case study 1.mp4',
    metricValue: 23,
    metricLabel: 'more viable zones',
    metrics: [
      { value: 23, label: 'more viable zones' },
      { value: 15, label: 'revenue uplift' }
    ]
  },
  {
    id: 2,
    title: 'Physical Observability for a leading multi-service super app',
    description: [
      'They turned static place data into live, context-rich intelligence with Digital Atlas—enriching every POI with pickup/drop points, rush hours, and weather/event effects.',
      'The super app was able to use these signals to predict demand, optimize driver allocation and routing, and adjust pricing in near real time improving on-time deliveries.'
    ],
    image: '/Users/neha/Desktop/Propheus/props/revamp_test/public/Case study 2.mp4',
    metricValue: 12,
    metricLabel: 'booking conversions',
    metrics: [
      { value: -15, label: 'driver wait times' },
      { value: 12, label: 'booking conversions' }
    ]
  },
  // {
  //   id: 3,
  //   title: 'Demand forecasting & inventory planning for a leading CPG brand',
  //   description: [
  //     'The CPG brand was able to pair Digital Atlas\' real-world signals with an AI model tuned to each store and SKU—seeing ',
  //     'With that clarity on what really moves demand (weather, local events, neighborhood shifts, competition) they forecasted and better allocated across 20,000+ outlets, and lowered logistics and inventory costs.'
  //   ],
  //   image: '/Case Study 3.gif',
  //   metricValue: 12,
  //   metricLabel: 'sales uplift',
  //   metrics: [
  //     { value: 12, label: 'sales uplift' },
  //     { value: 10.5, label: 'effective calls' }
  //   ]
  // },
  {
    id: 4,
    title: 'Product recommendations & field-rep enablement',
    description: [
      'The brand was able to fuse its sales data with Digital Atlas real-world signals—(demographics, anchor POIs etc ) —to score SKU potential and deliver a ranked, outlet-specific list for reps.',
      'They was able to pilot, refine, and scale what worked—growing basket size, easing over-reliance on top SKUs, and accelerating new SKU penetration across large retailers.'
    ],
    image: '/Users/neha/Desktop/Propheus/props/revamp_test/public/Case study 4.mp4',
    metricValue: 12,
    metricLabel: 'sales uplift',
    metrics: [
      { value: 12, label: 'sales uplift' },
      { value: 10.5, label: 'effective recommendations' }
    ]
  }
];

const CaseStudySubPart = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const counterRef = useRef<HTMLDivElement | null>(null);
  const counterInView = useInView(counterRef, { once: false, amount: 0.8 });

  const currentStudy = caseStudies[currentIndex];
  const [showMore, setShowMore] = useState(false);

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

  // Removed count-up animation; numbers fade in when entering viewport

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden bg-black">
      {/* Background Elements - Glowing Grid Pattern */}
      <div className="absolute inset-0 bg-black z-0">
        {/* Grid lines with glow */}
        <div 
          className="absolute inset-0 opacity-90"
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
          className="absolute inset-0 opacity-100"
          style={{
            backgroundImage: 'radial-gradient(circle at 0 0, rgba(120, 220, 255, 0.8) 2px, transparent 2px)',
            backgroundSize: '80px 80px',
            filter: 'blur(1px)'
          }}
        />
      </div>

      <div 
        className={`relative z-10 max-w-7xl mx-auto px-6 sm:px-8 transition-opacity duration-100 ease-linear ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
      >
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-16">
          
          {/* Left: Text (on mobile we'll order this after the media) */}
          <div className="flex-1 pr-0 lg:pr-8 xl:pr-12 order-2 lg:order-1">
            <div className="inline-flex items-center px-3 py-1 rounded-md bg-teal-900/40 case-study-badge-gradient border border-teal-700/30 text-teal-400 text-sm font-medium mb-6">
              <span className="mr-1"></span> Case Study
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-4xl font-normal text-white leading-tight">
              {currentStudy.title}
            </h2>
            
            <div className="space-y-4 mt-5">
              <div>
                <p className="text-base sm:text-lg font-normal text-gray-300 leading-relaxed">{currentStudy.description[0]}</p>
                {currentStudy.description.length > 1 && (
                  <>
                    {!showMore && (
                      <button
                        onClick={() => setShowMore(true)}
                        className="mt-3 text-sm text-teal-400 hover:underline"
                        aria-expanded={showMore}
                      >
                        Read more
                      </button>
                    )}

                    {showMore && (
                      <div className="mt-3 space-y-3">
                        {currentStudy.description.slice(1).map((para, idx) => (
                          <p key={idx} className="text-base sm:text-lg font-normal text-gray-300 leading-relaxed">{para}</p>
                        ))}
                        <button
                          onClick={() => setShowMore(false)}
                          className="mt-1 text-sm text-teal-400 hover:underline"
                          aria-expanded={showMore}
                        >
                          Show less
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Metric Counter(s) */}
            <div ref={counterRef} className="mt-5">
              {currentStudy.metrics && currentStudy.metrics.length > 0 ? (
                <div className="flex flex-col sm:flex-row items-baseline gap-y-3 sm:gap-x-10 w-full overflow-x-auto">
                  {currentStudy.metrics.map((m, i) => (
                    <div key={i} className="flex items-baseline gap-3 whitespace-nowrap">
                      <motion.span
                        className={`text-lg sm:text-xl md:text-2xl font-bold text-teal-400 tracking-tight`}
                        aria-label={`${m.value} percent ${m.label}`}
                        initial={{ opacity: 0, y: 4 }}
                        animate={counterInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
                        transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1], delay: i * 0.06 }}
                      >
                        {m.prefix ? <span className="mr-1">{m.prefix}</span> : null}
                        {m.value > 0 ? '+' : ''}{Math.round(m.value)}
                        <span className="ml-1">{m.suffix ? m.suffix : '%'}</span>
                      </motion.span>
                      <span className="text-sm sm:text-base md:text-lg font-normal text-teal-400 whitespace-nowrap">{m.label}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-baseline gap-4 whitespace-nowrap">
                  <motion.span 
                    className={`text-3xl sm:text-4xl md:text-5xl font-bold text-teal-400 tracking-tight`}
                    aria-label="percentage metric"
                    initial={{ opacity: 0, y: 4 }}
                    animate={counterInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
                    transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                  >
                    {Math.round(currentStudy.metricValue)}
                    <span className="ml-1">%</span>
                  </motion.span>
                  <span className="text-sm sm:text-base md:text-lg font-normal text-teal-400 whitespace-nowrap">{currentStudy.metricLabel}</span>
                </div>
              )}
            </div>

            {/* Removed pop keyframe animation since counters now fade in */}

            {/* Navigation Arrows: left aligned below description */}
            <div className="mt-6 flex gap-3">
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

          {/* Right: Image / Media (mobile-first ordering) */}
          <div className="flex-1 relative mt-6 lg:mt-0 order-1 lg:order-2">
            <div className="rounded-xl overflow-hidden shadow-lg">
              {/* Case Study Video/GIF implementation */}
              {currentStudy.image.endsWith('.webm') ? (
                <video
                  key={currentStudy.id}
                  className="w-full h-48 sm:h-64 md:h-80 lg:h-[420px] object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src={currentStudy.image} type="video/webm" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <Image
                  src={currentStudy.image}
                  alt="Case Study metrics visualization"
                  width={1200}
                  height={1200}
                  className="w-full h-56 sm:h-72 md:h-80 lg:h-[420px] object-cover"
                  priority
                  unoptimized
                />
              )}
            </div>
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-8">
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
        {/* No modal: decorative autoplay video used on mobile and desktop */}
      </div>
    </section>
  );
};

export default CaseStudySubPart;