'use client';

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

export default function ClientPageWrapper() {
  return (
    <>
      <HeroSection />
      <MissionSection />
      <DigitalAtlasSection />
      <FeatureSection />
      {/* <HowItWorksSection /> */}
      {/* <CommandCenterSection /> */}
      <CaseStudySection />
      <CaseStudySubPart />
      <SignalSection />
      <ScrollToTop />

    </>
  );
}