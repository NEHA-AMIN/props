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
};

export type CaseStudiesGridProps = {
  caseStudies?: CaseStudy[];
};

const defaultCaseStudies: CaseStudy[] = [
  {
    id: "1",
    title: "From Routine Calls to Real Recovery: AI for Collections Teams",
    category: "Banking and Financial Services",
    description: "Voice AI Agents for Debt Collection",
    date: "September 9, 2025",
    imageGradient: "from-blue-600 via-teal-600 to-blue-700",
    tagline: "Voice AI Agents\nFor Debt Collection",
    href: "https://www.example.com/case-studies/banking-debt-collection",
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
  },
  {
    id: "4",
    title: "Nurix AI: Qualify Smarter, Enroll Faster",
    category: "Education",
    description: "Qualify Smarter Enroll Faster",
    date: "August 4, 2025",
    imageGradient: "from-blue-600 via-indigo-600 to-blue-700",
    tagline: "Qualify Smarter\nEnroll Faster",
    href: "https://www.example.com/case-studies/education-enrollment",
  },
  {
    id: "5",
    title: "How Nurix AI Streamlined Hiring for Airline Operations Staff",
    category: "Recruitment",
    description: "Hiring Ground Staff, Made Frictionless",
    date: "August 5, 2025",
    imageGradient: "from-teal-500 via-cyan-500 to-green-400",
    tagline: "Hiring Ground Staff,\nMade Frictionless",
    href: "https://www.example.com/case-studies/recruitment-airline",
  },
  {
    id: "6",
    title: "How Nurix AI Transformed FNOL Filing for Property & Casualty Insurance",
    category: "Insurance",
    description: "Filing a Claim, Made Effortless",
    date: "July 30, 2025",
    imageGradient: "from-blue-700 via-blue-600 to-indigo-700",
    tagline: "Filing a Claim,\nMade Effortless",
    href: "https://www.example.com/case-studies/insurance-fnol",
  },
];

const categories = [
  "All",
  "Banking and Financial Services",
  "Retail",
  "Insurance",
  "Education",
  "Home Services",
  "Health & Fitness",
  "Recruitment",
  "Other",
];

export const CaseStudiesGrid: React.FC<CaseStudiesGridProps> = ({
  caseStudies = defaultCaseStudies,
}) => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredCaseStudies =
    activeFilter === "All"
      ? caseStudies
      : caseStudies.filter((study) => study.category === activeFilter);

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
          {/* Top Divider Line */}
          <div className="w-full h-px bg-gray-700/40 mb-8" />
          
          {/* Filter Buttons */}
          <div className="overflow-x-auto pb-4 -mx-2">
            <div className="flex gap-5 justify-start md:justify-center min-w-max md:min-w-0 px-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    activeFilter === category
                      ? "bg-teal-500 text-white shadow-lg shadow-teal-500/30"
                      : "bg-gray-800/60 text-gray-300 hover:bg-gray-700/80 hover:text-white border border-gray-700/50"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          {/* Bottom Divider Line */}
          <div className="w-full h-px bg-gray-700/40 mt-8" />
        </motion.div>

        {/* Case Studies Grid with Gaps and Dividers */}
        <div className="px-6 sm:px-8 lg:px-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
            {filteredCaseStudies.map((study, index) => (
              <a
                key={study.id}
                href={study.href || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="group cursor-pointer rounded-xl overflow-hidden backdrop-blur-md bg-gray-900/30 border border-gray-700/50 hover:border-teal-500/70 hover:bg-gray-900/40 transition-all duration-300 min-h-[450px] flex flex-col hover:shadow-xl hover:shadow-teal-500/10"
              >
                <div className="h-full min-h-[420px] flex flex-col relative overflow-hidden">
                  {/* Glass Background Section */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-800/20 via-gray-900/30 to-black/40 overflow-hidden">
                    {/* Subtle overlay for depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    
                    {/* Tagline overlay - Centered in visible area (above content section) */}
                    {study.tagline && (
                      <div className="absolute inset-0 flex items-center justify-center pb-[40%] px-6">
                        <h3 className="text-white text-xl md:text-2xl font-bold text-center drop-shadow-2xl leading-snug whitespace-pre-line">
                          {study.tagline}
                        </h3>
                      </div>
                    )}
                  </div>

                  {/* Content Section - Expands from bottom to cover entire card on hover */}
                  <div className="relative mt-auto backdrop-blur-sm bg-gray-900/90 transition-all duration-700 ease-in-out h-auto min-h-[50%] max-h-[50%] group-hover:max-h-full group-hover:h-full p-6 flex flex-col z-20 border-t border-gray-700/30">
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
            ))}
          </motion.div>
        </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredCaseStudies.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 border border-gray-700/30 rounded-lg mx-6 sm:mx-8"
          >
            <p className="text-gray-400 text-lg">
              No case studies found for this category.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CaseStudiesGrid;