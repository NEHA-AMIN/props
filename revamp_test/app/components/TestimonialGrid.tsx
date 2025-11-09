'use client';
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Card, CardHeader, CardContent, CardFooter, Avatar } from './ui';

type TestimonialCard = {
  id: number;
  quote: string;
  name: string;
  title: string;
  company: string;
  avatar: string;
  companyLogo: string;
  size: 'small' | 'medium' | 'large' | 'wide';
  position: { row: number; col: number };
};

const testimonialData: TestimonialCard[] = [
  {
    id: 1,
    quote: "This platform transformed our retail strategy completely. ROI increased by 340% in just 6 months.",
    name: "Sarah Chen",
    title: "VP of Operations",
    company: "RetailMax",
    avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&h=400&fit=crop&crop=face",
    companyLogo: "🏪",
    size: 'small',
    position: { row: 0, col: 0 }
  },
  {
    id: 2,
    quote: "The demand planning accuracy went from 65% to 94%. This is the future of retail intelligence and data-driven decision making.",
    name: "Marcus Rodriguez",
    title: "Chief Analytics Officer",
    company: "GlobalMart",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    companyLogo: "🌐",
    size: 'large',
    position: { row: 0, col: 1 }
  },
  {
    id: 3,
    quote: "Finally, a solution that understands our industry. Site selection has never been this precise.",
    name: "Elena Vasquez",
    title: "Director of Expansion",
    company: "FoodChain Plus",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
    companyLogo: "🍔",
    size: 'medium',
    position: { row: 0, col: 2 }
  },
  {
    id: 4,
    quote: "Market potential insights are incredibly accurate. We've optimized our entire supply chain.",
    name: "David Kim",
    title: "Head of Strategy",
    company: "CPG Innovations",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    companyLogo: "📦",
    size: 'small',
    position: { row: 0, col: 3 }
  },
  {
    id: 5,
    quote: "Dynamic pricing recommendations increased our profit margins by 28% while maintaining customer satisfaction.",
    name: "Lisa Thompson",
    title: "Revenue Operations Manager",
    company: "TravelTech Solutions",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face",
    companyLogo: "✈️",
    size: 'small',
    position: { row: 1, col: 0 }
  },
  {
    id: 6,
    quote: "Game-changing platform for retail analytics and business intelligence.",
    name: "Alex Johnson",
    title: "CEO",
    company: "Smart Retail Co",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
    companyLogo: "🛍️",
    size: 'medium',
    position: { row: 1, col: 1 }
  },
  {
    id: 7,
    quote: "The physical observability features give us insights we never had before. Every store location decision is now data-driven and profitable, leading to unprecedented growth.",
    name: "Rachel Park",
    title: "VP of Real Estate",
    company: "Fashion Forward",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
    companyLogo: "👗",
    size: 'wide',
    position: { row: 1, col: 2 }
  },
  {
    id: 8,
    quote: "Implementation was seamless and the results were immediate. Our customer satisfaction scores have never been higher.",
    name: "Michael Chang",
    title: "Customer Experience Director",
    company: "Tech Retail",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    companyLogo: "💻",
    size: 'small',
    position: { row: 1, col: 3 }
  }
];

function TestimonialCard({ testimonial, index }: { testimonial: TestimonialCard; index: number }) {
  // Adjust card height based on content length
  const getCardHeight = () => {
    const quoteLength = testimonial.quote.length;
    if (testimonial.size === 'wide') return 'min-h-[220px]';
    if (quoteLength > 150) return 'min-h-[280px]';
    if (quoteLength > 100) return 'min-h-[240px]';
    return 'min-h-[200px]';
  };

  const sizeClasses = {
    small: 'w-full',
    medium: 'w-full',
    large: 'w-full',
    wide: 'w-full'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1] as any,
        delay: index * 0.1
      }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as any }
      }}
      className="h-full"
    >
      <Card className={`${sizeClasses[testimonial.size]} ${getCardHeight()} overflow-hidden backdrop-blur-sm h-full flex flex-col`}>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-3">
            <Avatar
              src={testimonial.avatar}
              alt={testimonial.name}
              fallback={testimonial.name}
            />
            <div>
              <p className="text-white text-sm font-semibold">{testimonial.name}</p>
              <p className="text-gray-400 text-xs">{testimonial.title}</p>
              <p className="text-teal-400 text-xs font-medium uppercase tracking-wider">{testimonial.company}</p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1">
          <p className="text-gray-200 text-sm leading-relaxed">
            {testimonial.quote}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function TestimonialGrid() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // Group testimonials by column for masonry layout
  const column1 = testimonialData.filter(t => t.position.col === 0);
  const column2 = testimonialData.filter(t => t.position.col === 1);
  const column3 = testimonialData.filter(t => t.position.col === 2);
  const column4 = testimonialData.filter(t => t.position.col === 3);

  return (
    <section ref={sectionRef} className="w-full py-12 md:py-16 bg-slate-950 relative overflow-hidden">
      {/* Section Header */}
      <div className="container mx-auto px-4 md:px-6 mb-12">
        <div className="mx-auto max-w-3xl text-center" />
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Column 1 */}
          <div className="flex flex-col gap-6">
            {column1.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                index={index}
              />
            ))}
          </div>
          
          {/* Column 2 */}
          <div className="flex flex-col gap-6 md:mt-16">
            {column2.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                index={index + column1.length}
              />
            ))}
          </div>
          
          {/* Column 3 - Wide testimonial */}
          <div className="flex flex-col gap-6 lg:mt-8 hidden lg:block lg:col-span-2 xl:col-span-1">
            {column3.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                index={index + column1.length + column2.length}
              />
            ))}
          </div>
          
          {/* Column 4 */}
          <div className="flex flex-col gap-6 xl:mt-24 hidden xl:block">
            {column4.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                index={index + column1.length + column2.length + column3.length}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
