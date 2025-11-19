// ============================================
// ClientPageWrapper.tsx
// ============================================
'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSection from './HeroSection';
import MissionSection from './MissionSection';
import FeatureSection from './FeatureSection';
import DigitalAtlasSection from './DigitalAtlasSection';
import HowItWorksSection from './HowItWorksSection';
import CommandCenterSection from './CommandCenterSection';
import CaseStudySection from './CaseStudySection';
import CaseStudySubPart from './CaseStudySubPart';
import SignalSection from './SignalSection';
import ScrollToTop from './ScrollToTop';
import FoldingCubeLoader from './FoldingCubeLoader';

export default function ClientPageWrapper() {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);

  useEffect(() => {
    // Ensure loader shows for at least 1 second for better UX
    const timer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Hide loader when both video is loaded and minimum time has elapsed
    if (videoLoaded && minTimeElapsed) {
      setIsPageLoaded(true);
    }
  }, [videoLoaded, minTimeElapsed]);

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  return (
    <>
      {/* Global Full-Page Loader */}
      <AnimatePresence>
        {!isPageLoaded && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-24 h-24">
              <FoldingCubeLoader />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isPageLoaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <HeroSection onVideoLoad={handleVideoLoad} />
        <MissionSection />
        <DigitalAtlasSection />
        <FeatureSection />
        {/* <HowItWorksSection /> */}
        {/* <CommandCenterSection /> */}
        <CaseStudySection />
        <CaseStudySubPart />
        <SignalSection />
        <ScrollToTop />
      </motion.div>
    </>
  );
}