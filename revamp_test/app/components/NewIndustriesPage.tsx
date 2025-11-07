"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "./ui";

// Resource type definition
type Resource = {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
};

// Resource data based on provided content
// Updated Resource Data with relevant online images
const resourcesData: Resource[] = [
  // Retail resources
  {
    id: "1",
    title: "Physical Observability",
    description: "Select a brand to view all stores with their competitive landscape on a live map. Drill into any store for rich profiles—store facts, neighborhood signals (footfall, income, anchors), and social buzz—to spot gaps, threats, and opportunities.",
    category: "Retail",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "2",
    title: "Site Selection",
    description: "Predict potential sites to open new stores, maximising expected sales while minimising cannibalisation of existing stores, leveraging the Digital Atlas.",
    category: "Retail",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "3",
    title: "Demand Planning",
    description: "Forecast store demand more accurately with the Digital Atlas by incorporating external signals—nearby stores, people movement, traffic, weather shifts, crime, and other real-world events that impact sales.",
    category: "Retail",
    image: "https://images.unsplash.com/photo-1532619187608-e5375cab36aa?q=80&w=1200&auto=format&fit=crop"
  },
  
  

  // CPG resources
  {
    id: "6",
    title: "Market Potential",
    description: "Identify look-alike territories to your highest-performing areas using the Digital Atlas, so you can prioritize expansion and unlock new growth opportunities.",
    category: "CPG",
    image: "https://images.unsplash.com/photo-1565374395542-0ce1321e25eb?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "7",
    title: "Retailer Selection",
    description: "Prioritize the right retail partners and doors using the Digital Atlas—match category fit, shopper overlap, footfall and neighborhood profile, price tiers, promo intensity, and distribution gaps—to choose where to list first, sequence launches by market, and maximize velocity and ROI.",
    category: "CPG",
    image: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "8",
    title: "Demand Planning",
    description: "Forecast demand more accurately across retailers, channels, and regions by leveraging the Digital Atlas—store coverage and footfall, category momentum, promotions and price changes, media and social buzz, weather and events, competitor activity, and inventory/lead-time signals - to improve S&OP, reduce stockouts, and raise sell-through.",
    category: "CPG",
    image: "https://images.unsplash.com/photo-1532619187608-e5375cab36aa?q=80&w=1200&auto=format&fit=crop"
  },
  

  // Online to Offline resources
  {
    id: "11",
    title: "Physical Observability",
    description: "Select a brand to view zones, restaurants, and stores with their competitive landscape on a live map. Drill into any node for site facts, neighborhood vibe (walkability, safety, nightlife/family-friendly), demand heat, and social buzz to guide placement, incentives, and operations.",
    category: "Online to Offline",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "12",
    title: "Demand Planning",
    description: "Turn real-world signals—people mobility, app/search traffic, weather, events, promo calendars, and waittime trends—into actionable plans: staffing rosters by daypart, kitchen prep lists, inventory allocations, rider/supply positioning, order caps, and buffer policies to hit SLAs while minimizing waste and stockouts.",
    category: "Online to Offline",
    image: "https://images.unsplash.com/photo-1532619187608-e5375cab36aa?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "13",
    title: "Dynamic Pricing",
    description: "Recommend time-and location-aware prices/offers across dine-in, takeaway, delivery, and in-store based on elasticity, live demand, competitor moves, inventory age/hold times, and weather/events—within brand guardrails to lift margin, conversion, and utilization.",
    category: "Online to Offline",
    image: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "14",
    title: "Product Assortment",
    description: "Localize menus/SKUs and bundles per micro-market using shopper segments, basket affinities, ratings/reviews, seasonality, and walk-path heatmaps—setting core + local items, facings/portion sizes, and cross-sell packs to boost conversion, sell-through, and contribution.",
    category: "Online to Offline",
    image: "https://images.unsplash.com/photo-1585386959984-a415522316d6?q=80&w=1200&auto=format&fit=crop"
  },

  // Travel resources
  {
    id: "15",
    title: "Physical Observability",
    description: "View properties and nearby competitors on a live map. Drill into any location for a neighborhood vibe profile—walkability, safety, noise/nightlife vs. quiet, family-friendliness, transit access, events, weather patterns, and social sentiment—so travelers can pick the right area, timing, and plan with confidence.",
    category: "Travel",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200&auto=format&fit=crop"
  },
  
  {
    id: "17",
    title: "Dynamic Pricing & Bundling",
    description: "AI-driven trip planning: connecting accommodations with nearby experiences, mobility options, and relevant content, turning passive browsing into a structured, bookable itinerary - all within the platform.",
    category: "Travel",
    image: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?q=80&w=1200&auto=format&fit=crop"
  },

  // FinTech resources
  {
    id: "18",
    title: "Transaction Enrichment & Merchant Intelligence",
    description: "Enrich transactions with real-time merchant data, improving customer statements and spending analytics.",
    category: "FinTech",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "19",
    title: "Fraud Detection & Risk Management",
    description: "Proactively detect fraud by cross-referencing transactions with real-time merchant location and status.",
    category: "FinTech",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "20",
    title: "Merchant Onboarding & Verification",
    description: "Automate merchant onboarding and verification, reducing manual efforts and ensuring compliance.",
    category: "FinTech",
    image: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=1200&auto=format&fit=crop"
  },
  

  // Real Estate resources
  {
    id: "22",
    title: "Site Selection",
    description: "Score locations with footfall/dwell, demographics/income, anchors & transit, safety/noise, zoning, competitor/supply density, and pipeline—prioritize sites and avoid cannibalization.",
    category: "Real Estate",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "23",
    title: "Rent Prediction",
    description: "Project future market rents by combining historical rent, economic indicators, and local market conditions with real-world signals—people mobility/footfall, listings & vacancy velocity, new permits/pipeline, neighborhood vibe (walkability/safety/noise), anchor POIs & transit access, events/seasonality, weather & climate risk—so pricing, renewals, and lease-ups stay ahead of demand.",
    category: "Real Estate",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "24",
    title: "Property Valuation",
    description: "Estimate dynamic value of a commercial property based on several indicators like current and future potential, neighbourhood attractiveness, change in demographics, change in tenant mix etc.",
    category: "Real Estate",
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1200&auto=format&fit=crop"
  },

  // Telecom resources
  {
    id: "25",
    title: "Retail Insights",
    description: "Overlay real-world signals onto retail and network performance to explain why certain stores underperform or spike. Agentic AI reasons across subscriber clusters, ARPU bands, device mix, SIM activations, recharge behavior, network KPIs (coverage, throughput, congestion), and competitor presence to surface root causes and recommend corrective actions.",
    category: "Telecom",
    image: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "26",
    title: "Retailer Selection",
    description: "Map current retail channel coverage against demand hotspots to identify opportunities for expansion. The Digital Atlas combines subscriber density, device upgrade propensity, footfall patterns, competitive presence, neighborhood income tiers, and channel saturation to score micro-markets and recommend the right areas to expand or consolidate retail partners to maximize growth.",
    category: "Telecom",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "27",
    title: "Campaign Orchestration",
    description: "Automatically orchestrate outbound campaigns (SMS, push, WhatsApp etc) by leveraging behavioral, network, and real-world signals. The agent filters campaigns in real-time - approving high-intent targets, queuing those approaching fatigue, and suppressing low-propensity segments, while understanding context like mobility, device lifecycle, churn risk pockets, event spikes, and competitor promotions. Result: higher conversion, lower fatigue, and smarter spend allocation.",
    category: "Telecom",
    image: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?q=80&w=1200&auto=format&fit=crop"
  }
];


// Resource Card Component
const ResourceCard: React.FC<{ resource: Resource }> = ({ resource }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      key={resource.id} // Add key to ensure proper re-rendering
      className="group"
    >
      <div
        className="relative aspect-square rounded-2xl overflow-hidden transition-all duration-500 ease-in-out
        bg-black/40 backdrop-blur-md border border-white/10 hover:bg-black/50 hover:scale-[1.02] shadow-lg shadow-black/30 hover:shadow-teal-500/10"
      >
        
        {/* Category Badge - Show for all cards */}
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-block bg-teal-600/80 text-white text-xs font-medium px-2.5 py-1 rounded-md backdrop-blur-sm">
            {resource.category}
          </span>
        </div>
        
        {/* Learn More Button - Bottom Right Corner */}
        <div className="absolute bottom-6 right-6 z-20">
          <span className="inline-block bg-teal-600/80 text-white text-xs font-medium px-2.5 py-1 rounded-md backdrop-blur-sm cursor-pointer hover:bg-teal-500/90 transition-colors duration-200">
            Learn More
          </span>
        </div>
        
        {/* Content Container with Slide-Up Animation */}
        <div className="absolute bottom-0 left-0 right-0 p-6 pr-28 transition-all duration-500 ease-in-out transform translate-y-0 group-hover:-translate-y-4">
          {/* Title - Slides up with description */}
          <h3 className="text-2xl font-bold text-white mb-3 transition-all duration-500 ease-in-out">
            {resource.title}
          </h3>
          
          {/* Description - Slides up from bottom on hover */}
          <div className="max-h-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:max-h-48">
            <p className="text-gray-200 text-sm leading-relaxed opacity-0 transform translate-y-4 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:translate-y-0">
              {resource.description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Filter Categories (removed 'All')
const categories = ["Retail", "CPG", "Online to Offline", "Travel", "FinTech", "Real Estate", "Telecom"];

export const NewIndustriesPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [filteredResources, setFilteredResources] = useState(
    resourcesData.filter(resource => resource.category === categories[0])
  );
  
  // Filter resources when category changes
  useEffect(() => {
    setFilteredResources(
      resourcesData.filter(resource => resource.category === activeCategory)
    );
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Top Label */}
            <div className="inline-block mb-8">
              <span className="bg-[#0a1b2f] text-[#8bd3f9] text-xs font-medium px-4 py-1.5 rounded-full">
                ✦ Discover your use cases
              </span>
            </div>
            
            {/* Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-normal italic mb-8 leading-tight">
              <div className="text-white">Real-world intelligence</div>
              <div className="flex items-center justify-center">
                <span className="text-white">across</span>
                <span className="text-[#00a39a] ml-4">Verticals</span>
              </div>
            </h1>
            
            {/* Subheading */}
            <p className="text-[#a0a7b1] text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-normal italic">
              From Retail to Automotive, Propheus empowers data teams to effortlessly confront age-old and emerging business challenges through our end to end solutions.
            </p>
          </div>
        </div>
        
        {/* Background - Pure Black (base) */}
        <div className="absolute inset-0 bg-black z-0" />
        {/* Grid overlay updated to match home page reference */}
        <div className="home-grid-overlay absolute inset-0 z-0" />
      </section>
      
      {/* Filter Tabs */}
      <section className="py-8 border-y border-gray-800/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-center space-x-1 md:space-x-4 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-sm md:text-base whitespace-nowrap transition-all duration-300 relative ${
                  activeCategory === category
                    ? "text-[#00a39a] font-semibold"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {category}
                {activeCategory === category && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00a39a]"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Resources Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
            key={activeCategory} // Add key to force re-render when category changes
          >
            {filteredResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </motion.div>
          
          {/* Empty State */}
          {filteredResources.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-2xl font-semibold text-gray-300 mb-2">No resources found</h3>
              <p className="text-gray-500">Try selecting a different category</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default NewIndustriesPage;
