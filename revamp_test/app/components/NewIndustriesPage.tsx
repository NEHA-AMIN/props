"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

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
      "View every store and its competitive context on a live map. Drill into any location for a rich profile—store facts, neighbourhood signals (footfall, income, anchors).",
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
      "Recommend the right products for each store, shelf, and shopper by leveraging the Digital Atlas, to boost conversion, basket size, and sell-through across channels.",
    category: "Retail",
    image: "https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "5",
    title: "Promotion Recommendation",
    description:
      "Recommend the right offers, timing, and channels for each store and audience by leveraging the Digital Atlas—to maximize uplift, ROI, and sell-through while minimizing cannibalization.",
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
      "Recommend the right SKUs, pack sizes, and flavors for each retailer, store, and channel by leveraging the Digital Atlas—to optimize assortments, drive cross-sell/upsell, and lift velocity and contribution margin.",
    category: "CPG",
    image: "https://images.pexels.com/photos/1797428/pexels-photo-1797428.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "10",
    title: "Promotion Recommendation",
    description:
      "Recommend the right offers, timing, mechanics, and channels for each retailer and store by leveraging the Digital Atlas—to maximize incremental lift and ROI while minimizing cannibalization and trade spend waste.",
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
      "Turn real-world signals into actionable plans: staffing rosters by daypart, kitchen prep lists, inventory allocations, rider/supply positioning, order caps, and buffer policies to hit SLAs while minimizing waste and stockouts.",
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
      "Localize menus/SKUs and bundles per micro-market, setting core + local items, facings/portion sizes, and cross-sell packs to boost conversion, sell-through, and contribution.",
    category: "Online to Offline",
    image: "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=800"
  },

  // Travel
  {
    id: "15",
    title: "Physical Observability",
    description:
      "View properties and nearby competitors on a live map. Drill into any location for a neighborhood vibe profile, so travelers can pick the right area, timing, and plan with confidence.",
    category: "Travel",
    image: "https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "16",
    title: "Personalized Discovery & Recommendations",
    description:
      "Surface contextual signals like neighborhood vibe, proximity to experiences, and real-time demand to match travelers with the right destinations and stays earlier in their journey.",
    category: "Travel",
    image: "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "17",
    title: "Dynamic Pricing & Bundling",
    description:
      "AI-driven trip planning: connecting accommodations with nearby experiences, mobility options, and relevant content, turning passive browsing into a structured, bookable itinerary—all within the platform.",
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

// Resource Card Component
const ResourceCard: React.FC<{ resource: Resource }> = ({ resource }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      key={resource.id}
      className="group"
    >
      <div
        className="relative aspect-square rounded-2xl overflow-hidden transition-all duration-500 ease-in-out
        hover:scale-[1.02] shadow-2xl shadow-black/50 hover:shadow-teal-500/20"
        style={{
          backgroundImage: `url(${resource.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent" />
        
        {/* Category Badge - Show for all cards */}
        <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-20">
          <span className="inline-block bg-teal-600/80 text-white text-[10px] sm:text-xs font-medium px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md backdrop-blur-sm">
            {resource.category}
          </span>
        </div>
        
        {/* Learn More Button - Bottom Right Corner */}
        <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 md:bottom-5 md:right-5 lg:bottom-6 lg:right-6 z-30">
          <span className="inline-block bg-teal-600/80 text-white text-[10px] sm:text-xs font-medium px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md backdrop-blur-sm cursor-pointer hover:bg-teal-500/90 transition-colors duration-200">
            Learn More
          </span>
        </div>
        
        {/* Content Container with Slide-Up Animation */}
        <div className="absolute bottom-0 left-0 right-0 p-3 pr-14 sm:p-4 sm:pr-20 md:p-5 md:pr-24 lg:p-6 lg:pr-28 transition-all duration-500 ease-in-out transform translate-y-0 group-hover:-translate-y-2 sm:group-hover:-translate-y-4 z-20">
          {/* Title - Slides up with description */}
          <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white mb-1.5 sm:mb-2 md:mb-3 transition-all duration-500 ease-in-out leading-tight">
            {resource.title}
          </h3>
          
          {/* Description - Slides up from bottom on hover */}
          <div className="max-h-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:max-h-32 sm:group-hover:max-h-40 lg:group-hover:max-h-48">
            <p className="text-gray-200 text-[10px] sm:text-xs md:text-xs lg:text-sm leading-relaxed opacity-0 transform translate-y-4 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:translate-y-0">
              {resource.description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Filter Categories
const categories = ["Retail", "CPG", "Online to Offline", "Travel", "FinTech", "Real Estate", "Telecom"];

export default function NewIndustriesPage() {
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
      <section className="relative py-20 sm:py-32 md:py-40 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Top Label */}
            <div className="inline-block mb-8">
              <span className="bg-[#0a1b2f] text-[#8bd3f9] text-xs font-medium px-4 py-1.5 rounded-full">
                ✦ Discover your use cases
              </span>
            </div>
            
            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal mb-6 sm:mb-8 leading-tight">
              <div className="text-white">Real-world intelligence</div>
              <div className="flex items-center justify-center flex-wrap">
                <span className="text-white">across</span>
                <span className="text-[#00a39a] ml-2 sm:ml-4">Verticals</span>
              </div>
            </h1>
            
            {/* Subheading */}
            <p className="text-[#a0a7b1] text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-normal px-4">
              From Retail to Automotive, Propheus empowers data teams to effortlessly confront age-old and emerging business challenges through our end to end solutions.
            </p>
          </div>
        </div>
        
        {/* Background - Pure Black */}
        <div className="absolute inset-0 bg-black z-0" />
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
      <section className="py-12 sm:py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
            key={activeCategory}
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
}