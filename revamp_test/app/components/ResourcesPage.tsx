"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { BackgroundPaths } from "@/components/ui/shadcn-io/background-paths";
import { useTheme } from "../providers/ThemeProvider";
import CaseStudiesGrid from "./CaseStudiesGrid";
import { useSearchParams } from "next/navigation";

export type Resource = {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  date?: string;
  href?: string;
  ctaLabel?: string;
};

export type ResourcesPageProps = {
  resources?: Resource[];
  footerSlot?: React.ReactNode;
};

// Simple Button Component for Hero Section
interface HeroButtonProps {
  label: string;
  onClick: () => void;
  isActive: boolean;
}

const HeroButton: React.FC<HeroButtonProps> = ({ label, onClick, isActive }) => {
  return (
    <button
      onClick={onClick}
      className={`group px-6 sm:px-8 py-3 sm:py-6 text-md sm:text-lg font-normal backdrop-blur-md 
        transition-all duration-300 rounded-full min-w-[160px] sm:min-w-[220px]
        ${isActive 
          ? 'bg-teal-500 border-teal-400 text-white shadow-lg shadow-teal-500/30' 
          : 'bg-transparent hover:bg-gray-900/30 border border-teal-500/30 hover:border-teal-400/50 text-white hover:shadow-md hover:shadow-teal-500/20'
        }`}
    >
      <span className={`transition-opacity ${isActive ? 'opacity-100' : 'opacity-90 group-hover:opacity-100'} capitalize`}>
        {label}
      </span>
    </button>
  );
};

export const ResourcesPage: React.FC<ResourcesPageProps> = ({
  resources = [
    {
      id: "1",
      title: "From Purchase to Pickup — Seamless",
      category: "Retail",
      excerpt:
        "Automated post‑purchase support, real‑time order insights, and seamless experiences.",
      date: "July 14, 2025",
      href: "#",
      ctaLabel: "Know more",
    },
    {
      id: "2",
      title: "AI Explained: Foundation Models for Commerce",
      category: "AI Explained",
      excerpt: "A practical walkthrough of how foundation models drive outcomes.",
      date: "June 30, 2025",
      href: "#",
      ctaLabel: "Read",
    },
  ],
  footerSlot,
}) => {
  const { theme, resolvedTheme } = useTheme();
  const [isThemeTransitioning, setIsThemeTransitioning] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [selectedType, setSelectedType] = useState<'Case Studies' | 'Use Cases' | 'Blogs' | undefined>(undefined);
  const [initialCategory, setInitialCategory] = useState<string | undefined>(undefined);
  const searchParams = useSearchParams();

  const buttonCategories = ['Case Studies', 'Use Cases', 'Blogs'];

  // Handle SSR hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize from query params (e.g., /resources?type=Use%20Cases&category=Retail)
  useEffect(() => {
    const type = searchParams.get('type');
    const category = searchParams.get('category');
    if (type === 'Use Cases' || type === 'Case Studies' || type === 'Blogs') {
      setSelectedType(type as 'Case Studies' | 'Use Cases' | 'Blogs');
    }
    if (category) {
      setInitialCategory(category);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Listen for theme changes and handle transitions
  useEffect(() => {
    const handleThemeChange = () => {
      setIsThemeTransitioning(true);
      setTimeout(() => setIsThemeTransitioning(false), 500);
    };

    window.addEventListener('theme-change', handleThemeChange);
    return () => window.removeEventListener('theme-change', handleThemeChange);
  }, []);

  const handleButtonClick = (category: string) => {
    setSelectedType(category as 'Case Studies' | 'Use Cases' | 'Blogs');
  };
  
  return (
    <div 
      className="relative min-h-screen bg-black text-white transition-colors duration-300"
      data-theme={mounted ? resolvedTheme : 'light'}
      data-theme-preference={mounted ? theme : 'system'}
    >
      {/* Global grid overlay background (same as Industries hero) */}
      <div className="home-grid-overlay absolute inset-0 z-0" />
      
      {/* Hero Section with Overlay Dropdowns */}
      <div className="relative">
        <BackgroundPaths title="Resources Hub" />
        
        {/* Button Overlay on Hero - positioned below title */}
        <div className="absolute inset-0 flex items-start justify-center z-20 pt-[60vh] sm:pt-0 sm:items-center">
          <div className="container mx-auto px-4 md:px-6 text-center">
            {/* Buttons positioned below the title with responsive vertical padding */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center sm:mt-32 md:mt-40 lg:mt-48 xl:mt-56">
              {buttonCategories.map((category) => (
                <HeroButton
                  key={category}
                  label={category}
                  onClick={() => handleButtonClick(category)}
                  isActive={selectedType === category}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content Section */}
      <section className="relative bg-black transition-colors duration-500 z-10">
        {/* Case Studies Grid Section */}
        <CaseStudiesGrid selectedType={selectedType} initialCategory={initialCategory} />

        {/* Footer slot */}
        {footerSlot && (
          <footer className="py-8 text-sm text-gray-300 transition-colors duration-500 bg-gray-900/50">
            <div className="mx-auto max-w-7xl px-6 sm:px-8">
              {footerSlot}
            </div>
          </footer>
        )}
      </section>
    </div>
  );
};

export default ResourcesPage;