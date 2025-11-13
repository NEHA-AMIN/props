
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SignalSection from '../components/SignalSection';

const TEAM_MEMBERS = [
  {
    name: 'Sarah Chen',
    role: 'CEO & Co-Founder',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
    bio: 'Former VP at leading GeoTech company. PhD in Spatial Computing from MIT.'
  },
  {
    name: 'Marcus Rodriguez',
    role: 'CTO & Co-Founder',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    bio: 'AI researcher with 15+ years building large-scale systems at Google and Amazon.'
  },
  {
    name: 'Elena Vasquez',
    role: 'Head of Product',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face',
    bio: 'Product leader who scaled analytics products from 0 to 1000+ enterprise customers.'
  },
  {
    name: 'David Kim',
    role: 'Head of Data Science',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    bio: 'PhD in Machine Learning. Published researcher in spatial AI and pattern recognition.'
  }
];

const VALUES = [
  {
    title: 'Innovation First',
    description: 'We push the boundaries of what\'s possible with location intelligence and AI.',
    icon: '🚀'
  },
  {
    title: 'Data Integrity',
    description: 'Accuracy and reliability are non-negotiable in everything we build.',
    icon: '🎯'
  },
  {
    title: 'Customer Success',
    description: 'Your wins are our wins. We\'re invested in your long-term success.',
    icon: '🤝'
  },
  {
    title: 'Continuous Learning',
    description: 'We stay curious, adapt quickly, and embrace new challenges.',
    icon: '📚'
  }
];

export default function AboutPage() {
  return (
    <>
      <main className="bg-slate-950 text-slate-100 min-h-screen">
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-teal-900/20 to-transparent" />
        
        <div className="relative z-10 container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-slate-100 mb-6 leading-tight">
              We're <span className="animated-teal-gradient">Mapping</span> the Future
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed">
              Propheus was founded on a simple belief: the physical world holds untapped intelligence that can transform how businesses make decisions.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-slate-100 mb-8 text-center">
              Our Story
            </h2>
            <div className="space-y-6 text-lg text-slate-400 leading-relaxed">
              <p>
                In 2020, our founders saw businesses struggling to make sense of an increasingly complex physical world. Traditional data sources were static, siloed, and disconnected from the real-time signals that matter most.
              </p>
              <p>
                We set out to build something different: a <span className="text-teal-400 font-semibold">living map</span> that continuously learns, adapts, and provides actionable intelligence about the world around us.
              </p>
              <p>
                Today, we power decisions for hundreds of companies across retail, travel, logistics, and real estate—helping them understand not just where things are, but what they mean.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-slate-100 mb-6">
              Physical AI
            </h2>
            <p className="text-2xl text-teal-400 font-semibold leading-relaxed max-w-3xl mx-auto">
              "To make the physical world computable, so AI agents can reason about location, context, and human behavior with unprecedented precision."
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-100 mb-4">Our Values</h2>
            <p className="text-lg text-slate-400">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-xl p-6 hover:border-teal-500/30 transition-all duration-300">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-slate-100 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-100 mb-4">Meet the Team</h2>
            <p className="text-lg text-slate-400">World-class experts in AI, geospatial tech, and enterprise software</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM_MEMBERS.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 hover:border-teal-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/10">
                  <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-teal-500/20 group-hover:border-teal-500/50 transition-colors duration-300">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-slate-100 text-center mb-1">
                    {member.name}
                  </h3>
                  <p className="text-teal-400 text-sm text-center mb-3 font-semibold">
                    {member.role}
                  </p>
                  <p className="text-slate-400 text-sm text-center leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
      <SignalSection />
    </>
  );
}
