'use client';
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import FlipCard from './FlipCard';
import './flipCard.css';

const ValuePropositionSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const cards = [
    {
      icon: (
        <svg className="w-12 h-12 mx-auto mb-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h18v18H3V3zm12 6h3m-3 4h3m-3 4h3M9 9h1m-1 4h1m-1 4h1" />
        </svg>
      ),
      title: "Retail & Restaurants",
      description: "Optimize your physical presence and operations with data-driven insights.",
      points: [
        "Physical Observability for stores",
        "Market Potential Analysis",
        "Strategic Site Selection",
        "Smart Demand Planning",
        "Promotion Recommendation"
      ]
    },
    {
      icon: (
        <svg className="w-12 h-12 mx-auto mb-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 3h5v5M21 3l-7 7M21 14v3a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4h3m4 8l2-2m-2 2l-2-2m2 2l2 2m-2-2l-2 2" />
        </svg>
      ),
      title: "CPG",
      description: "Maximize market impact and optimize product strategies.",
      points: [
        "Market Potential Analysis",
        "Strategic Retailer Selection",
        "Demand Planning",
        "Product Recommendation",
        "Promotion Recommendation"
      ]
    },
    {
      icon: (
        <svg className="w-12 h-12 mx-auto mb-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1-2-1v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5" />
        </svg>
      ),
      title: "Online to Offline",
      description: "Bridge digital and physical retail experiences seamlessly.",
      points: [
        "Physical Observability for zones & stores",
        "Demand Planning",
        "Dynamic Pricing",
        "Product Assortment Optimization"
      ]
    },
    {
      icon: (
        <svg className="w-12 h-12 mx-auto mb-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      title: "Travel",
      description: "Transform property insights into exceptional guest experiences.",
      points: [
        "Physical Observability for properties",
        "Personalized Discovery & Recommendations",
        "Dynamic Pricing & Bundling"
      ]
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          ref={ref}
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6 leading-tight">
            Industry Solutions
          </h3>
          <p className="text-lg md:text-xl text-slate-700 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Tailored insights and analytics for your industry's unique challenges and opportunities.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: [0.23, 1, 0.32, 1] as any // Custom cubic bezier for snappy animation
              }}
            >
              <FlipCard
                frontIcon={card.icon}
                frontTitle={card.title}
                frontDescription={card.description}
                backPoints={card.points}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuePropositionSection;
