import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type CaseStudy = {
  id: string;
  title: string;
  category: string;
  description: string;
  date: string;
  imageGradient: string;
  tagline?: string;
  href?: string;
  type: 'Case Studies' | 'Use Cases' | 'Blogs';
};

export type CaseStudiesGridProps = {
  caseStudies?: CaseStudy[];
  selectedType?: 'Case Studies' | 'Use Cases' | 'Blogs';
};

const defaultCaseStudies: CaseStudy[] = [
  // Case Studies
  {
    id: "1",
    title: "From Routine Calls to Real Recovery: AI for Collections Teams",
    category: "Banking and Financial Services",
    description: "Voice AI Agents for Debt Collection",
    date: "September 9, 2025",
    imageGradient: "from-blue-600 via-teal-600 to-blue-700",
    tagline: "Voice AI Agents\nFor Debt Collection",
    href: "https://www.example.com/case-studies/banking-debt-collection",
    type: "Case Studies",
  },
  {
    id: "2",
    title: "How Nurix AI Is Simplifying Shopping with Voice & Chat",
    category: "Retail",
    description: "Discover Products Faster & Shop Smarter with AI",
    date: "September 22, 2025",
    imageGradient: "from-green-500 via-lime-400 to-green-600",
    tagline: "Discover Products Faster\n& Shop Smarter with AI",
    href: "https://www.example.com/case-studies/retail-shopping-ai",
    type: "Case Studies",
  },
  {
    id: "3",
    title: "Nurix AI: Automating Lead Qualification for Health & Wellness Brands",
    category: "Health & Fitness",
    description: "Wellness Clients Qualified While Interest Is Hot",
    date: "August 6, 2025",
    imageGradient: "from-blue-500 via-cyan-400 to-green-500",
    tagline: "Wellness Clients Qualified\nWhile Interest Is Hot",
    href: "https://www.example.com/case-studies/health-wellness-leads",
    type: "Case Studies",
  },
  
  // Use Cases
  {
    id: "4",
    title: "AI-Powered Customer Service for E-Commerce",
    category: "Retail",
    description: "24/7 automated support handling 10,000+ queries daily",
    date: "October 15, 2025",
    imageGradient: "from-purple-600 via-pink-500 to-red-500",
    tagline: "24/7 Customer Support\nAt Scale",
    href: "https://www.example.com/use-cases/ecommerce-support",
    type: "Use Cases",
  },
  {
    id: "5",
    title: "Predictive Maintenance for Manufacturing",
    category: "CPG",
    description: "Reducing downtime by 40% with AI predictions",
    date: "October 10, 2025",
    imageGradient: "from-orange-500 via-red-500 to-pink-600",
    tagline: "Predict & Prevent\nEquipment Failures",
    href: "https://www.example.com/use-cases/predictive-maintenance",
    type: "Use Cases",
  },
  {
    id: "6",
    title: "Smart Inventory Management for Restaurants",
    category: "O2O",
    description: "Optimizing stock levels and reducing waste by 35%",
    date: "October 5, 2025",
    imageGradient: "from-yellow-500 via-orange-400 to-red-500",
    tagline: "Zero Waste\nSmart Inventory",
    href: "https://www.example.com/use-cases/restaurant-inventory",
    type: "Use Cases",
  },
  
  // Blogs
  {
    id: "7",
    title: "The Future of AI in Retail: Trends for 2026",
    category: "Retail",
    description: "Exploring the latest AI innovations transforming retail experiences",
    date: "November 1, 2025",
    imageGradient: "from-cyan-500 via-blue-500 to-indigo-600",
    tagline: "AI Trends\nShaping Retail",
    href: "https://www.example.com/blog/ai-retail-trends-2026",
    type: "Blogs",
  },
  {
    id: "8",
    title: "Building Conversational AI: Best Practices",
    category: "Travel",
    description: "A comprehensive guide to creating effective AI chatbots",
    date: "October 28, 2025",
    imageGradient: "from-teal-500 via-green-500 to-emerald-600",
    tagline: "Master Conversational\nAI Design",
    href: "https://www.example.com/blog/conversational-ai-guide",
    type: "Blogs",
  },
  {
    id: "9",
    title: "How Physical AI is Revolutionizing Industries",
    category: "CPG",
    description: "Understanding the impact of AI on physical world interactions",
    date: "October 20, 2025",
    imageGradient: "from-indigo-600 via-purple-500 to-pink-500",
    tagline: "Physical AI\nRevolution",
    href: "https://www.example.com/blog/physical-ai-revolution",
    type: "Blogs",
  },
];

const categories = [
  "All",
  "Retail",
  "CPG",
  "O2O",
  "Travel",
];

// Single Case Study Card with per-card spotlight following cursor
const CaseStudyCard: React.FC<{
  study: CaseStudy;
  onHover: (id: string | null) => void;
  isActive: boolean;
}> = ({ study, onHover, isActive }) => {
  const [spotX, setSpotX] = useState(0);
  const [spotY, setSpotY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = (e.currentTarget as HTMLAnchorElement).getBoundingClientRect();
    setSpotX(e.clientX - rect.left);
    setSpotY(e.clientY - rect.top);
  };

  return (
    <a
      key={study.id}
      href={study.href || "#"}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => onHover(study.id)}
      onMouseLeave={() => onHover(null)}
      onMouseMove={handleMouseMove}
      className={`group cursor-pointer rounded-xl overflow-hidden backdrop-blur-md bg-black/30 border border-white/10 hover:border-teal-500/50 hover:bg-black/40 transition-all duration-300 min-h-[450px] flex flex-col hover:shadow-xl hover:shadow-teal-500/10 relative ${
        isActive ? "z-50 scale-[1.01]" : "z-10"
      }`}
    >

      <div className="h-full min-h-[420px] flex flex-col relative overflow-hidden">
        {/* Glass Background Section - transparent to let pure black show through */}
        <div className="absolute inset-0 overflow-hidden">
          {study.tagline && (
            <div className="absolute inset-0 flex items-center justify-center pb-[40%] px-6">
              <h3 className="text-white text-xl md:text-2xl font-bold text-center drop-shadow-2xl leading-snug whitespace-pre-line">
                {study.tagline}
              </h3>
            </div>
          )}
        </div>

        {/* Content Section - Expands from bottom to cover entire card on hover */}
        <div className="relative mt-auto backdrop-blur-sm bg-black/70 transition-all duration-700 ease-in-out h-auto min-h-[50%] max-h-[50%] group-hover:max-h-full group-hover:h-full p-6 flex flex-col z-20 border-t border-white/10">
          {/* Category Label */}
          <p className="text-xs font-semibold text-teal-400 uppercase tracking-wide mb-2">
            {study.category}
          </p>

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-100 leading-snug group-hover:text-teal-300 transition-colors duration-700 mb-2">
            {study.title}
          </h3>

          {/* Description - Hidden by default, shown on hover */}
          <div className="overflow-hidden transition-all duration-700 ease-in-out max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 mb-3">
            <p className="text-sm text-gray-300 leading-relaxed mt-2">
              {study.description}
            </p>
          </div>

          {/* Date */}
          <p className="text-sm text-gray-400 mb-2">{study.date}</p>

          {/* Read More Button - Shown on hover */}
          <div className="overflow-hidden transition-all duration-700 ease-in-out max-h-0 opacity-0 group-hover:max-h-16 group-hover:opacity-100">
            <button className="mt-2 text-sm font-bold text-gray-100 hover:text-teal-300 transition-colors duration-200 flex items-center gap-1">
              READ MORE ↓
            </button>
          </div>
        </div>
      </div>
    </a>
  );
};

export const CaseStudiesGrid: React.FC<CaseStudiesGridProps> = ({
  caseStudies = defaultCaseStudies,
  selectedType,
}) => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [highlightScroll, setHighlightScroll] = useState(false);

  // First filter by type (Case Studies, Use Cases, or Blogs)
  const typeFilteredStudies = selectedType 
    ? caseStudies.filter((study) => study.type === selectedType)
    : [];

  // Then filter by category (All, Retail, CPG, etc.)
  const filteredCaseStudies =
    activeFilter === "All"
      ? typeFilteredStudies
      : typeFilteredStudies.filter((study) => study.category === activeFilter);

  // Handle category filter click
  const handleCategoryClick = (category: string) => {
    if (selectedType) {
      setActiveFilter(category);
    } else {
      // Highlight the scroll up message
      setHighlightScroll(true);
      setTimeout(() => setHighlightScroll(false), 2000);
    }
  };

  return (
    <section className="relative bg-black py-16 sm:py-24 w-full">
      <div className="w-full">
        {/* Filter Bar with Divider Lines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16 px-6 sm:px-8"
        >
          {/* Filter Buttons */}
          <div className="overflow-x-auto pb-4 -mx-2">
            <div className="flex gap-5 justify-start md:justify-center min-w-max md:min-w-0 px-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`min-w-[110px] px-4 py-3 rounded-full text-base font-normal italic transition-all duration-300 whitespace-nowrap ${
                    activeFilter === category && selectedType
                      ? "bg-teal-500 text-white shadow-lg shadow-teal-500/30"
                      : "bg-gray-800/60 text-gray-300 hover:bg-gray-700/80 hover:text-white border border-gray-700/50"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Case Studies Grid with Gaps and Dividers */}
        <div className="px-6 sm:px-8 lg:px-12 relative">
          {!selectedType ? (
            /* Show message when no type is selected */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-24"
            >
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-teal-500/20 to-teal-600/20 border border-teal-500/30 flex items-center justify-center">
                  <svg className="w-10 h-10 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Select a Type to Get Started
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Please choose one of the buttons above (Case Studies, Use Cases, or Blogs) to view relevant content.
                </p>
                <motion.div 
                  className={`inline-flex items-center gap-3 text-teal-400 text-sm cursor-pointer group px-6 py-3 rounded-full transition-all duration-300 ${
                    highlightScroll 
                      ? 'border-2 border-teal-400 bg-teal-400/10 shadow-lg shadow-teal-500/30' 
                      : 'border-2 border-transparent'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  animate={highlightScroll ? { 
                    scale: [1, 1.1, 1],
                  } : {}}
                >
                  <motion.svg 
                    className="w-5 h-5 group-hover:text-teal-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </motion.svg>
                  <span className="font-semibold group-hover:text-teal-300 transition-colors duration-200">Scroll up to select</span>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <>
              {/* Backdrop blur overlay when hovering any card */}
              <AnimatePresence>
                {hoveredCardId && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 bg-black/40 backdrop-blur-md z-40 pointer-events-none"
                  />
                )}
              </AnimatePresence>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFilter}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {filteredCaseStudies.map((study) => (
                    <CaseStudyCard
                      key={study.id}
                      study={study}
                      onHover={setHoveredCardId}
                      isActive={hoveredCardId === study.id}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Empty State */}
              {filteredCaseStudies.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16 border border-gray-700/30 rounded-lg"
                >
                  <p className="text-gray-400 text-lg">
                    No {selectedType.toLowerCase()} found for this category.
                  </p>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesGrid;