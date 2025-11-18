import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Define the case study type
interface CaseStudy {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

// Props for the component
interface CaseStudyCarouselProps {
  caseStudies: CaseStudy[];
  scaleDelta?: number;
  opacityDelta?: number;
  transitionDuration?: number;
  autoScrollInterval?: number;
}

const CaseStudyCarousel: React.FC<CaseStudyCarouselProps> = ({
  caseStudies,
  scaleDelta = 0.08,
  opacityDelta = 0.25,
  transitionDuration = 0.5,
  autoScrollInterval = 4000,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const autoScrollTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setIsPaused(false);
      return;
    }
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      // Swipe left = next card
      navigateToCard((activeIndex + 1) % caseStudies.length);
    } else if (isRightSwipe) {
      // Swipe right = previous card
      navigateToCard(activeIndex === 0 ? caseStudies.length - 1 : activeIndex - 1);
    } else {
      // No significant swipe, resume auto-scroll
      setTimeout(() => setIsPaused(false), 1000);
    }
  };

  // Auto-scroll functionality - moves right to left (increments index)
  useEffect(() => {
    // Clear any existing interval
    if (autoScrollTimerRef.current) {
      clearInterval(autoScrollTimerRef.current);
      autoScrollTimerRef.current = null;
    }
    
    // Only start auto-scroll if not paused
    if (!isPaused) {
      autoScrollTimerRef.current = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % caseStudies.length);
      }, autoScrollInterval);
    }

    return () => {
      if (autoScrollTimerRef.current) {
        clearInterval(autoScrollTimerRef.current);
        autoScrollTimerRef.current = null;
      }
    };
  }, [isPaused, caseStudies.length, autoScrollInterval]);

  // Navigate to specific card
  const navigateToCard = (index: number) => {
    setActiveIndex(index);
    setIsPaused(true);
    
    // Resume auto-scroll after manual navigation
    if (autoScrollTimerRef.current) {
      clearInterval(autoScrollTimerRef.current);
    }
    setTimeout(() => setIsPaused(false), 3000);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        navigateToCard(activeIndex === 0 ? caseStudies.length - 1 : activeIndex - 1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        navigateToCard((activeIndex + 1) % caseStudies.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, caseStudies.length]);

  // Calculate card styles based on distance from active card
  const getCardStyle = (index: number) => {
    const distance = Math.abs(index - activeIndex);
    const scale = 1 - (distance * scaleDelta);
    const opacity = 1 - (distance * opacityDelta);
    const blur = distance > 0 ? distance * 3 : 0; // 3px blur per step away from center
    
    return {
      scale: Math.max(scale, 0.7),
      opacity: Math.max(opacity, 0.3),
      blur: blur,
      zIndex: 10 - distance, // Reduced from 100 to 10 to stay below navbar (z-100)
    };
  };

  return (
    <div 
      className="relative w-full overflow-hidden py-4 md:py-8"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Navigation buttons - Hidden on mobile */}
      <div className="hidden md:flex justify-between absolute top-1/2 left-2 right-2 md:left-4 md:right-4 z-10 -translate-y-1/2 pointer-events-none">
        <button 
          onClick={() => navigateToCard(activeIndex === 0 ? caseStudies.length - 1 : activeIndex - 1)}
          className="bg-slate-800/80 hover:bg-slate-700/90 text-white p-2 md:p-3 rounded-full pointer-events-auto transition-all hover:scale-110"
          aria-label="Previous case study"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <button 
          onClick={() => navigateToCard((activeIndex + 1) % caseStudies.length)}
          className="bg-slate-800/80 hover:bg-slate-700/90 text-white p-2 md:p-3 rounded-full pointer-events-auto transition-all hover:scale-110"
          aria-label="Next case study"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
      
      {/* Cards container */}
      <div className="relative flex justify-center items-center min-h-[400px] sm:min-h-[500px] md:min-h-[600px]">
        {caseStudies.map((study, index) => {
          // Calculate position offset from center
          let rawOffset = index - activeIndex;
          
          // Wrap around for infinite effect - choose shortest path
          if (rawOffset > caseStudies.length / 2) {
            rawOffset -= caseStudies.length;
          } else if (rawOffset < -caseStudies.length / 2) {
            rawOffset += caseStudies.length;
          }
          
          const distance = Math.abs(rawOffset);
          
          // Don't render cards that are too far away
          if (distance > 3) {
            return null;
          }
          
          const scale = 1 - (distance * scaleDelta);
          const opacity = 1 - (distance * opacityDelta);
          const blur = distance > 0 ? distance * 3 : 0;
          const zIndex = 10 - distance;
          
          // Card is active if it's at the center
          const isActive = distance === 0;
          
          // Use smaller offset on mobile for tighter spacing
          const offsetMultiplier = isMobile ? 105 : 110;
          
          // Calculate if card should be visible (not during wrap jump)
          const shouldBeVisible = distance <= 2;
          
          return (
            <motion.div
              key={study.id}
              className="absolute w-[85vw] sm:w-[75vw] md:w-[70vw] lg:w-[60vw] max-w-[500px]"
              animate={{
                x: `${rawOffset * offsetMultiplier}%`,
                scale: Math.max(scale, 0.7),
                opacity: shouldBeVisible ? Math.max(opacity, 0.3) : 0,
                filter: `blur(${blur}px)`,
              }}
              style={{ 
                zIndex: zIndex,
                pointerEvents: isActive ? 'auto' : 'none',
                visibility: shouldBeVisible ? 'visible' : 'hidden',
              }}
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                scale: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                filter: { duration: 0.2 },
              }}
              whileHover={{ 
                scale: isActive ? 1.03 : Math.max(scale, 0.7) + 0.02 
              }}
              onMouseEnter={() => !isMobile && isActive && setIsPaused(true)}
              onMouseLeave={() => !isMobile && isActive && setIsPaused(false)}
            >
              <div className="w-full rounded-lg md:rounded-xl overflow-hidden shadow-2xl transition-shadow">
                <div className="relative w-full bg-slate-900 text-white">
                  <img 
                    src={study.imageUrl} 
                    alt={`${study.title} case study`}
                    className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover"
                  />
                  <div className="p-4 sm:p-5 md:p-6">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">{study.title}</h3>
                    <p className="text-sm sm:text-base text-slate-300 mb-3 md:mb-4 whitespace-normal break-words leading-relaxed">{study.description}</p>
                    <a 
                      href={study.link} 
                      className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors"
                      tabIndex={isActive ? 0 : -1}
                    >
                      View Case Study
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {/* Dot indicators */}
      <div className="flex justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8">
        {caseStudies.map((_, index) => (
          <button
            key={index}
            onClick={() => navigateToCard(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === activeIndex 
                ? 'bg-teal-500 w-8' 
                : 'bg-slate-600 hover:bg-slate-500'
            }`}
            aria-label={`Go to case study ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// Sample case studies data
export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "cs1",
    title: "AI-Powered Retail Analytics",
    description: "How we helped a major retailer increase sales by 27% using predictive analytics and customer behavior modeling.",
    imageUrl: "https://placehold.co/800x400/0f172a/e2e8f0?text=Retail+Analytics",
    link: "#retail-case-study"
  },
  {
    id: "cs2",
    title: "Healthcare Data Transformation",
    description: "Transforming patient care with AI-driven insights that reduced readmission rates by 32%.",
    imageUrl: "https://placehold.co/800x400/0f172a/e2e8f0?text=Healthcare+Data",
    link: "#healthcare-case-study"
  },
  {
    id: "cs3",
    title: "Financial Services Automation",
    description: "Automating compliance processes saved this bank 15,000 hours annually while improving accuracy.",
    imageUrl: "https://placehold.co/800x400/0f172a/e2e8f0?text=Financial+Services",
    link: "#finance-case-study"
  },
  {
    id: "cs4",
    title: "CPG Supply Chain Optimization",
    description: "Reducing inventory costs by 18% while maintaining 99.8% fulfillment rates during global disruptions.",
    imageUrl: "https://placehold.co/800x400/0f172a/e2e8f0?text=Supply+Chain",
    link: "#cpg-case-study"
  },
  {
    id: "cs5",
    title: "Real Estate Market Intelligence",
    description: "Providing predictive insights that helped developers identify emerging neighborhood trends 18 months ahead of competitors.",
    imageUrl: "https://placehold.co/800x400/0f172a/e2e8f0?text=Real+Estate",
    link: "#real-estate-case-study"
  },
  {
    id: "cs6",
    title: "Travel Industry Personalization",
    description: "Creating hyper-personalized experiences that increased customer retention by 42% for this global travel platform.",
    imageUrl: "https://placehold.co/800x400/0f172a/e2e8f0?text=Travel+Industry",
    link: "#travel-case-study"
  }
];

export default CaseStudyCarousel;