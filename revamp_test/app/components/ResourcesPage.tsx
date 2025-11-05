
"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { BackgroundPaths } from "@/components/ui/shadcn-io/background-paths";
import { useTheme } from "../providers/ThemeProvider";
import CaseStudiesGrid from "./CaseStudiesGrid";

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

// Dropdown Component for Hero Section
interface DropdownProps {
  label: string;
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const HeroDropdown: React.FC<DropdownProps> = ({
  label,
  options,
  selectedOption,
  onSelect,
  isOpen,
  onToggle,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        if (!(event.target as Element)?.closest('[data-dropdown-button]')) {
          onToggle();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onToggle]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Hero Style Dropdown Button - Matching image */}
      <div
        className="inline-block group relative bg-gradient-to-b from-teal-500/20 to-teal-600/10 
          p-px rounded-2xl backdrop-blur-lg overflow-hidden shadow-lg shadow-teal-500/20 
          hover:shadow-xl hover:shadow-teal-500/30 transition-shadow duration-300"
      >
        <button
          data-dropdown-button
          onClick={onToggle}
          className="rounded-[1.15rem] px-8 py-6 text-lg font-semibold backdrop-blur-md 
            bg-gray-900/80 hover:bg-gray-900/90 border border-teal-500/30 hover:border-teal-400/50
            text-white transition-all duration-300 group-hover:-translate-y-0.5 
            hover:shadow-md hover:shadow-teal-500/20 min-w-[220px] flex items-center justify-between"
        >
          <span className="opacity-90 group-hover:opacity-100 transition-opacity capitalize">
            {label}
          </span>
          <svg
            className={`ml-3 h-5 w-5 transition-all duration-300 text-teal-300 ${
              isOpen ? 'rotate-180 group-hover:translate-x-0' : 'group-hover:translate-x-1.5'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            )}
          </svg>
        </button>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-4 w-full bg-gray-900/95 backdrop-blur-md border border-teal-500/30 rounded-2xl shadow-xl shadow-teal-500/20 z-50 overflow-hidden">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onSelect(option);
                onToggle();
              }}
              className={`w-full px-6 py-4 text-left text-base transition-all duration-200 hover:bg-gray-800/60 hover:shadow-inner ${
                selectedOption === option
                  ? 'bg-teal-600/20 text-teal-300 border-l-4 border-teal-500'
                  : 'text-gray-200'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
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

  // Dropdown states
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState({
    'case studies': 'All',
    'use cases': 'All',
    'blogs': 'All',
  });

  const dropdownOptions = ['All', 'Retail', 'CPG', 'O2O', 'Travel'];

  // Handle SSR hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Listen for theme changes and handle transitions
  useEffect(() => {
    const handleThemeChange = () => {
      setIsThemeTransitioning(true);
      setTimeout(() => setIsThemeTransitioning(false), 500);
    };

    window.addEventListener('theme-change', handleThemeChange);
    return () => window.removeEventListener('theme-change', handleThemeChange);
  }, []);

  const handleDropdownToggle = (dropdownName: string) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const handleFilterSelect = (category: string, option: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: option
    }));
  };
  
  return (
    <div 
      className="relative min-h-screen bg-black text-white transition-colors duration-300"
      data-theme={mounted ? resolvedTheme : 'light'}
      data-theme-preference={mounted ? theme : 'system'}
    >
      {/* Hero Section with Overlay Dropdowns */}
      <div className="relative">
        <BackgroundPaths title="Resources Hub" />
        
        {/* Dropdown Overlay on Hero */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="container mx-auto px-4 md:px-6 text-center">
            {/* Dropdowns positioned below the title */}
            <div className="mt-32 flex flex-col sm:flex-row gap-6 justify-center items-center">
              {Object.keys(selectedFilters).map((category) => (
                <HeroDropdown
                  key={category}
                  label={category}
                  options={dropdownOptions}
                  selectedOption={selectedFilters[category as keyof typeof selectedFilters]}
                  onSelect={(option) => handleFilterSelect(category, option)}
                  isOpen={openDropdown === category}
                  onToggle={() => handleDropdownToggle(category)}
                />
              ))}
            </div>

            {/* Active Filters Display */}
            <div className="mt-8 flex flex-wrap gap-2 justify-center">
              {Object.entries(selectedFilters).map(([category, filter]) => 
                filter !== 'All' && (
                  <span
                    key={`${category}-${filter}`}
                    className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-teal-600/20 text-teal-300 border border-teal-500/30 backdrop-blur-md"
                  >
                    {category}: {filter}
                    <button
                      onClick={() => handleFilterSelect(category, 'All')}
                      className="ml-3 hover:text-white transition-colors text-lg leading-none"
                    >
                      ×
                    </button>
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content Section */}
      <section className="relative bg-black transition-colors duration-500">
        {/* <div className="mx-auto max-w-7xl px-6 sm:px-8 py-16 sm:py-24"> */}
          {/* Page Header - THIS IS WHAT YOU'RE LOOKING FOR */}
          {/* <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-400 via-teal-500 to-teal-300 bg-clip-text text-transparent tracking-tight">
              Resources page
            </h2>
            <p className="mt-4 text-base md:text-lg bg-gradient-to-r from-teal-200 via-teal-400 to-teal-200 bg-clip-text text-transparent">
              Find out more about Propheus in action
            </p>
            <p className="mt-1 text-base md:text-lg bg-gradient-to-r from-teal-200 via-teal-400 to-teal-200 bg-clip-text text-transparent">
              from our archive of blogs, videos and more
            </p>
          </motion.div> */}

          {/* Rest of your content... */}

          {/* Featured Content */}
          {/* <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-6 md:gap-8 mb-12"> */}
            {/* Left visual */}
            {/* <div className="rounded-2xl bg-gradient-to-br from-teal-900 via-teal-800 to-teal-700 p-6 md:p-8 shadow-sm transition-all duration-500 hover:shadow-lg">
              <div className="aspect-[16/9] rounded-xl bg-black/40 backdrop-blur-sm ring-1 ring-teal-500/30 flex items-center justify-center text-gray-200 transition-colors duration-300">
                <span className="text-sm">Featured visual placeholder</span>
              </div>
            </div> */}

            {/* Right content */}
            {/* <div className="rounded-2xl border border-gray-700 bg-gray-900/60 backdrop-blur-sm p-6 md:p-8 transition-all duration-500 hover:shadow-lg hover:bg-gray-900/80">
              <p className="text-xs font-semibold text-teal-300 mb-2">
                {resources[0]?.category}
              </p>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-100 mb-3">
                {resources[0]?.title}
              </h3>
              <p className="text-sm md:text-base text-gray-300 mb-4">
                {resources[0]?.excerpt}
              </p>
              <p className="text-xs text-gray-400 mb-5">
                {resources[0]?.date}
              </p>
              <a
                href={resources[0]?.href ?? "#"}
                className="inline-flex items-center rounded-full bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 text-sm font-medium shadow-sm transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
              >
                {resources[0]?.ctaLabel ?? "Read"} →
              </a>
            </div> */}
          {/* </div> */}

          {/* Category filter buttons removed per request */}
        {/* </div> */}

        {/* Case Studies Grid Section */}
        <CaseStudiesGrid />

        {/* Footer slot */}
        {footerSlot && (
          <footer className="border-t border-gray-800 py-8 text-sm text-gray-300 transition-colors duration-500 bg-gray-900/50">
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