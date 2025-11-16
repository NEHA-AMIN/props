'use client';
import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { GradientButton } from '@/components/ui/gradient-button';
import { motion } from 'framer-motion';

// Define the case study type
interface CaseStudy {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string | { pathname: string; query: Record<string, string> };
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
              <div className="w-full rounded-lg md:rounded-xl overflow-hidden shadow-2xl transition-shadow border-[0.5px] border-teal-500/30 hover:border-teal-400/50 animated-teal-border">
                <div className="relative w-full bg-black text-white">
                  <img 
                    src={study.imageUrl} 
                    alt={`${study.title} case study`}
                    className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover"
                  />
                  <div className="p-4 sm:p-5 md:p-6">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">{study.title}</h3>
                    <p className="text-sm sm:text-base text-slate-300 mb-3 md:mb-4 line-clamp-2 sm:line-clamp-3">{study.description}</p>
                    <GradientButton asChild variant="variant" className="no-outline">
                      <Link 
                        href={study.link}
                        prefetch={false}
                        tabIndex={isActive ? 0 : -1}
                        aria-label={`Learn more about ${study.title}`}
                      >
                        Learn More
                      </Link>
                    </GradientButton>
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

// Industry-focused case studies data
export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "retail",
    title: "Retail",
    description: "Turn each store's living context - people movement, weather, neighborhood, and place dynamics - into action. Power demand planning, site selection, promo recommendations, assortment, staffing, and more with Physical AI that understands the world outside your doors.",
    imageUrl: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=1200&auto=format&fit=crop",
    link: "/industries?category=Retail#industries-grid"
  },
  {
    id: "cpg",
    title: "CPG",
    description: "Put each SKU in its real context - people movement, weather, sentiment, and place dynamics—to size market potential, fuel product recommendations, pick the right retailers, and optimize promo strategy and spend.",
    imageUrl: "https://images.squarespace-cdn.com/content/v1/62c81216243f7563e0f792a7/045ea285-1972-4f56-a438-fba5dea4c9db/CPG+Packaging+Design.jpg",
    link: "/industries?category=CPG#industries-grid"
  },
  {
    id: "o2o",
    title: "O2O",
    description: "Harness live context - people movement, events, weather, traffic, and supply - to power physical observability, tune dynamic pricing, sharpen demand planning, and localize product assortment across your O2O pickup, delivery, and ride zones.",
    imageUrl: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=1200&auto=format&fit=crop",
    link: "/industries?category=Online%20to%20Offline#industries-grid"
  },
  {
    id: "travel",
    title: "Travel",
    description: "Use live context—crowds, events, weather, transit and venue status, and local price movements—to power physical observability, personalize discovery and recommendations, and drive dynamic pricing and smart bundling across flights, stays, and experiences.",
    imageUrl: "https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=1200&auto=format&fit=crop",
    link: "/industries?category=Travel#industries-grid"
  }
];

export default CaseStudyCarousel;