"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { GradientButton } from "@/components/ui/gradient-button";
import { defaultCaseStudies } from "./CaseStudiesGrid";

// Resource type definition
type Resource = {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
};

// Resource data with reliable image URLs
const resourcesData: Resource[] = [
  // Retail
  {
    id: "1",
    title: "Physical Observability",
    description:
      "View every store and its competitive context on a live map. Drill into any location for a rich profile store facts, neighbourhood signals (footfall, income, anchors).",
    category: "Retail",
    image: "https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "2",
    title: "Site Selection",
    description:
      "Predict potential sites to open new stores, maximising expected sales while minimising cannibalisation of existing stores, leveraging the Digital Atlas.",
    category: "Retail",
    image: "https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "3",
    title: "Demand Planning",
    description:
      "Forecast store demand more accurately with the Digital Atlas by incorporating external signals and real-world events that impact sales.",
    category: "Retail",
    image: "https://images.pexels.com/photos/95916/pexels-photo-95916.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "4",
    title: "Product Recommendation",
    description:
      "Recommend the right products for each store, shelf, and shopper by leveraging the Digital Atlas.",
    category: "Retail",
    image: "https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "5",
    title: "Promotion Recommendation",
    description:
      "Recommend the right offers, timing, and channels for each store and audience by leveraging the Digital Atlas",
    category: "Retail",
    image: "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=800"
  },

  // CPG
  {
    id: "6",
    title: "Market Potential",
    description:
      "Identify look-alike territories to your highest-performing areas using the Digital Atlas, so you can prioritize expansion and unlock new growth opportunities.",
    category: "CPG",
    image: "https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "7",
    title: "Retailer Selection",
    description:
      "Prioritize the right retail partners and doors using the Digital Atlas—to choose where to list first, sequence launches by market, and maximize velocity and ROI.",
    category: "CPG",
    image: "https://images.pexels.com/photos/1797428/pexels-photo-1797428.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "8",
    title: "Demand Planning",
    description:
      "Forecast demand more accurately across retailers, channels, and regions by leveraging the Digital Atlas—to improve S&OP, reduce stockouts, and raise sell-through.",
    category: "CPG",
    image: "https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "9",
    title: "Product Recommendation",
    description:
      "Recommend the right SKUs, pack sizes, and flavors for each retailer, store, and channel by leveraging the Digital Atlas.",
    category: "CPG",
    image: "https://images.pexels.com/photos/1797428/pexels-photo-1797428.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "10",
    title: "Promotion Recommendation",
    description:
      "Recommend the right offers, timing, mechanics, and channels for each retailer and store by leveraging the Digital Atlas.",
    category: "CPG",
    image: "https://images.pexels.com/photos/3962285/pexels-photo-3962285.jpeg?auto=compress&cs=tinysrgb&w=800"
  },

  // Online to Offline
  {
    id: "11",
    title: "Physical Observability",
    description:
      "View a brand's footprint: zones, restaurants, and stores layered with competitors on a live map.",
    category: "Online to Offline",
    image: "https://images.pexels.com/photos/1092671/pexels-photo-1092671.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "12",
    title: "Demand Planning",
    description:
      "Turn real-world signals into actionable plans: staffing rosters by daypart, kitchen prep lists, inventory allocations.",
    category: "Online to Offline",
    image: "https://images.pexels.com/photos/3184192/pexels-photo-3184192.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "13",
    title: "Dynamic Pricing",
    description:
      "Recommend time-and location-aware prices/offers within brand guardrails to lift margin, conversion, and utilization.",
    category: "Online to Offline",
    image: "https://images.pexels.com/photos/4968630/pexels-photo-4968630.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "14",
    title: "Product Assortment",
    description:
      "Localize menus/SKUs and bundles per micro-market, setting core + local items, facings/portion sizes.",
    category: "Online to Offline",
    image: "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=800"
  },

  // Travel
  {
    id: "15",
    title: "Physical Observability",
    description:
      "View properties and nearby competitors on a live map. Drill into any location for a neighborhood vibe profile.",
    category: "Travel",
    image: "https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "16",
    title: "Personalized Discovery & Recommendations",
    description:
      "Surface contextual signals like neighborhood vibe, proximity to experiences, and real-time demand to match travelers.",
    category: "Travel",
    image: "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "17",
    title: "Dynamic Pricing & Bundling",
    description:
      "AI-driven trip planning: connecting accommodations with nearby experiences, mobility options.",
    category: "Travel",
    image: "https://images.pexels.com/photos/1007657/pexels-photo-1007657.jpeg?auto=compress&cs=tinysrgb&w=800"
  },

  // FinTech
  {
    id: "18",
    title: "Transaction Enrichment & Merchant Intelligence",
    description:
      "Enrich transactions with real-time merchant data, improving customer statements and spending analytics.",
    category: "FinTech",
    image: "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "19",
    title: "Fraud Detection & Risk Management",
    description:
      "Proactively detect fraud by cross-referencing transactions with real-time merchant location and status.",
    category: "FinTech",
    image: "https://images.pexels.com/photos/6777569/pexels-photo-6777569.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "20",
    title: "Merchant Onboarding & Verification",
    description:
      "Automate merchant onboarding and verification, reducing manual efforts and ensuring compliance.",
    category: "FinTech",
    image: "https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "21",
    title: "Personalization",
    description:
      "Deliver hyper-targeted offers based on merchant categories and customer spending for increased engagement.",
    category: "FinTech",
    image: "https://images.pexels.com/photos/5668859/pexels-photo-5668859.jpeg?auto=compress&cs=tinysrgb&w=800"
  },

  // Real Estate
  {
    id: "22",
    title: "Site Selection",
    description:
      "Score locations with footfall/dwell, demographics/income, anchors & transit, safety/noise, zoning, competitor/supply density, and pipeline—prioritize sites and avoid cannibalization.",
    category: "Real Estate",
    image: "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "23",
    title: "Rent Prediction",
    description:
      "Project future market rents by combining historical rent, economic indicators, and local market conditions with real-world signals.",
    category: "Real Estate",
    image: "https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "24",
    title: "Property Valuation",
    description:
      "Estimate dynamic value of a commercial property based on indicators like current and future potential, neighbourhood attractiveness, and change in tenant mix.",
    category: "Real Estate",
    image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800"
  },

  // Telecom
  {
    id: "25",
    title: "Retail Insights",
    description:
      "Overlay real-world signals onto retail and network performance to explain why certain stores underperform or spike, reasoning across subscriber clusters, ARPU bands, device mix, SIM activations, and competitor presence to surface root causes.",
    category: "Telecom",
    image: "https://images.pexels.com/photos/163097/twitter-facebook-together-exchange-of-information-163097.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "26",
    title: "Retailer Selection",
    description:
      "Map current retail channel coverage against demand hotspots to identify opportunities for expansion with the Digital Atlas.",
    category: "Telecom",
    image: "https://images.pexels.com/photos/69432/pexels-photo-69432.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "27",
    title: "Campaign Orchestration",
    description:
      "Automatically orchestrate outbound campaigns (SMS, push, WhatsApp etc) by leveraging behavioral, network, and real-world signals.",
    category: "Telecom",
    image: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800"
  }
];

// Resource Card Component - Mobile Optimized
const ResourceCard: React.FC<{ resource: Resource }> = ({ resource }) => {
  // Map category names to match resources page categories
  const getCategoryForResources = (category: string): string => {
    if (category === "Online to Offline") return "O2O";
    return category;
  };

  // Determine if a matching resource exists in Resources (Use Cases) for this category
  const hasMatchingResource = defaultCaseStudies.some(
    (study) => {
      const resourceCategory = getCategoryForResources(resource.category);
      return study.type === 'Use Cases' && study.category === resourceCategory;
    }
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      key={resource.id}
      className="group"
    >
      <div
        className="relative rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-500 ease-in-out
        hover:scale-[1.02] shadow-2xl shadow-black/50 hover:shadow-teal-500/20 
        min-h-[400px] sm:min-h-[450px] md:min-h-0 md:aspect-square flex flex-col"
      >
        {/* Background Image - Separate layer */}
        <div 
          className="absolute inset-0 transition-all duration-700 ease-in-out group-hover:blur-md group-hover:scale-105"
          style={{
            backgroundImage: `url(${resource.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        {/* Dark overlay - lighter on desktop, darker on mobile */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/30 md:from-black/95 md:via-black/60 md:to-transparent transition-all duration-700 ease-in-out" />
        
        {/* Category Badge - Top Left */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20">
          <span className="inline-block bg-teal-600/90 case-study-badge-gradient text-white text-[10px] sm:text-xs font-medium px-2.5 py-1 sm:px-3 rounded backdrop-blur-sm">
            {resource.category}
          </span>
        </div>
        
        {/* Content Container - Bottom section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6 z-20 transition-all duration-700 ease-in-out md:group-hover:-translate-y-8 lg:group-hover:-translate-y-4">
          <div className="space-y-2.5 sm:space-y-3 pb-14 sm:pb-16 md:pb-12 lg:pb-14">
            {/* Title - Always visible */}
            <h3 className="text-lg sm:text-base md:text-lg lg:text-xl font-bold text-white leading-tight transition-all duration-700 ease-in-out">
              {resource.title}
            </h3>
            
            {/* Description - Always visible on mobile, hover on desktop */}
            <div className="overflow-hidden max-h-32 opacity-100 md:max-h-0 md:opacity-0 transition-all duration-700 ease-in-out md:group-hover:max-h-40 md:group-hover:opacity-100">
              <p className="text-gray-200 text-sm sm:text-xs md:text-sm leading-relaxed">
                {resource.description}
              </p>
            </div>
          </div>
        </div>
        
        {/* Learn More Button - Always visible on mobile, hover on desktop */}
        {hasMatchingResource && (
          <div className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 md:bottom-6 md:right-6 z-30 
            opacity-100 translate-y-0 md:opacity-0 md:translate-y-2 
            transition-all duration-700 ease-in-out md:group-hover:opacity-100 md:group-hover:translate-y-0">
            <GradientButton asChild variant="variant" size="sm" className="no-outline text-xs px-4 py-2">
              <Link
                href={`/resources?type=${encodeURIComponent('Use Cases')}&category=${encodeURIComponent(getCategoryForResources(resource.category))}#resources-grid`}
                prefetch={false}
                aria-label={`Learn more ${resource.category}`}
              >
                Learn More
              </Link>
            </GradientButton>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Filter Categories
const categories = ["Retail", "CPG", "Online to Offline", "Travel", "FinTech", "Real Estate", "Telecom"];

export default function NewIndustriesPage() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [filteredResources, setFilteredResources] = useState(
    resourcesData.filter(resource => resource.category === categories[0])
  );
  // Ref for the horizontal tabs scroll container
  const scrollRef = useRef<HTMLDivElement | null>(null);
  
  // Initialize active category from query string if provided
  useEffect(() => {
    const initial = searchParams.get('category');
    if (initial && categories.includes(initial)) {
      setActiveCategory(initial);
    }
  }, [searchParams]);
  
  // Filter resources when category changes
  useEffect(() => {
    setFilteredResources(
      resourcesData.filter(resource => resource.category === activeCategory)
    );
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section - Mobile Optimized */}
      <section className="relative py-16 sm:py-20 md:py-32 lg:py-40 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Top Label - Mobile optimized */}
            <div className="inline-block mb-6 sm:mb-8">
              <span className="bg-[#0a1b2f] case-study-badge-gradient text-[#8bd3f9] text-[10px] sm:text-xs font-medium px-3 sm:px-4 py-1 sm:py-1.5 rounded-full">
                ✦ Discover your use cases
              </span>
            </div>
            
            {/* Heading - Mobile optimized */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal mb-4 sm:mb-6 md:mb-8 leading-tight px-2">
              <div className="text-white">Real-world intelligence</div>
              <div className="flex items-center justify-center flex-wrap gap-2">
                <span className="text-white">across</span>
                <span className="text-[#00a39a]">Verticals</span>
              </div>
            </h1>
            
            {/* Subheading - Mobile optimized */}
            <p className="text-[#a0a7b1] text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed font-normal px-2 sm:px-4">
              From Retail to Travel, Propheus empowers enterprise teams to effortlessly confront age-old and emerging business challenges through the most comprehensive knowledge of the real world!
            </p>
          </div>
        </div>
        
        {/* Background - Pure Black */}
        <div className="absolute inset-0 bg-black z-0" />
        <div className="home-grid-overlay absolute inset-0 z-0" />
      </section>
      
      {/* Filter Tabs - Mobile Optimized with Horizontal Scroll + Arrows */}
      <section id="industries-grid" className="py-4 sm:py-6 md:py-8 border-y border-gray-800/30">
        <div className="container mx-auto px-2 sm:px-4 md:px-6">
          <div className="relative">
            <div className="flex items-center justify-center">
              {/* Left Arrow */}
              <button
                type="button"
                aria-label="Scroll left"
                onClick={() => {
                  const el = scrollRef.current;
                  if (el) el.scrollBy({ left: -Math.round(el.clientWidth * 0.6), behavior: 'smooth' });
                }}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/40 hover:bg-black/60 text-gray-300 focus:outline-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                  <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M15 5l-7 7 7 7" />
                </svg>
              </button>

              {/* Scrollable tabs - centered */}
              <div
                ref={scrollRef}
                className="flex items-center justify-center space-x-1 sm:space-x-2 md:space-x-4 overflow-x-auto pb-2 scrollbar-hide w-full px-6"
                style={{ WebkitOverflowScrolling: 'touch' }}
              >
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base whitespace-nowrap transition-all duration-300 relative rounded-full flex-shrink-0 mx-2 ${
                      activeCategory === category
                        ? "text-[#00a39a] font-semibold bg-teal-500/10"
                        : "text-gray-400 hover:text-white hover:bg-gray-800/30"
                    }`}
                  >
                    {category}
                    {activeCategory === category && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00a39a] rounded-full"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Right Arrow */}
              <button
                type="button"
                aria-label="Scroll right"
                onClick={() => {
                  const el = scrollRef.current;
                  if (el) el.scrollBy({ left: Math.round(el.clientWidth * 0.6), behavior: 'smooth' });
                }}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/40 hover:bg-black/60 text-gray-300 focus:outline-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                  <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M5 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Resources Grid - Mobile Optimized */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-24">
        <div className="container mx-auto px-3 sm:px-4 md:px-6">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8"
            key={activeCategory}
          >
            {filteredResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </motion.div>
          
          {/* Empty State */}
          {filteredResources.length === 0 && (
            <div className="text-center py-16 sm:py-20">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-300 mb-2">No resources found</h3>
              <p className="text-sm sm:text-base text-gray-500">Try selecting a different category</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}