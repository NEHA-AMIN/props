import React, { useState, useEffect } from "react";
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

// Helper function to extract YouTube video ID
const getYouTubeVideoId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    /youtube\.com\/embed\/([^&\n?#]+)/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
};

// Video Popup Modal Component
const VideoModal: React.FC<{
  videoUrl: string;
  title: string;
  onClose: () => void;
}> = ({ videoUrl, title, onClose }) => {
  const videoId = getYouTubeVideoId(videoUrl);
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : null;

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
const handleCloseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // console.log('Close button clicked');
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
      onClick={handleBackdropClick}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-5xl bg-gray-900 rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gray-800/50 border-b border-gray-700 relative">
          <h3 className="text-lg font-semibold text-white truncate pr-4">
            {title}
          </h3>
          <button
            type="button"
            onClick={handleCloseClick}
            onMouseDown={handleCloseClick}
            className="p-2 rounded-full hover:bg-gray-700 transition-colors group cursor-pointer flex-shrink-0"
            aria-label="Close video"
            style={{ position: 'relative', zIndex: 99999 }}
          >
            <svg className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ pointerEvents: 'none' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Video Container */}
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={title}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <p>Unable to load video</p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export type CaseStudiesGridProps = {
  caseStudies?: CaseStudy[];
  selectedType?: 'Case Studies' | 'Use Cases' | 'Blogs';
  initialCategory?: string;
};

export const defaultCaseStudies: CaseStudy[] = [
  // Use Cases with YouTube links only
  {
    id: "4",
    title: "Physical Observability for Retail & Restaurants",
    category: "Retail",
    description: "Retail decisions that are rooted in the real-world",
    date: "November 10, 2025",
    imageGradient: "from-purple-600 via-pink-500 to-red-500",
    tagline: "Physical Observability\nFor Retail",
    href: "https://youtu.be/hlE7HSJluDU",
    type: "Use Cases",
  },
  {
    id: "5",
    title: "AI Product Recommendation for CPG Brands",
    category: "CPG",
    description: "Recommend product assortments that aligns with consumer behaviour and demand",
    date: "November 10, 2025",
    imageGradient: "from-orange-500 via-red-500 to-pink-600",
    tagline: "AI Product\nRecommendation",
    href: "https://youtu.be/BnLJsd5J-8A",
    type: "Use Cases",
  },
  {
    id: "6",
    title: "Physical Observability - Online to Offline",
    category: "O2O",
    description: "Real-world intelligence for online to offline businesses",
    date: "November 12, 2025",
    imageGradient: "from-teal-600 via-cyan-500 to-blue-600",
    tagline: "Physical Observability\nOnline to Offline",
    href: "https://youtu.be/7BfC4T_BfZ4",
    type: "Use Cases",
  },
  {
    id: "7",
    title: "Market Potential for Retail",
    category: "Retail",
    description: "Identify high-potential markets and opportunities for retail expansion",
    date: "November 13, 2025",
    imageGradient: "from-blue-600 via-indigo-500 to-purple-600",
    tagline: "Market Potential\nFor Retail",
    href: "https://youtu.be/4VoVeaXUneY",
    type: "Use Cases",
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
  onVideoClick?: (study: CaseStudy) => void;
}> = ({ study, onHover, isActive, onVideoClick }) => {
  const [spotX, setSpotX] = useState(0);
  const [spotY, setSpotY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    setSpotX(e.clientX - rect.left);
    setSpotY(e.clientY - rect.top);
  };

  // Check if this is a YouTube video
  const isYouTubeVideo = study.href?.includes('youtube.com') || study.href?.includes('youtu.be');
  
  // Get YouTube thumbnail
  const videoId = study.href ? getYouTubeVideoId(study.href) : null;
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;

  const handleClick = (e: React.MouseEvent) => {
    if (isYouTubeVideo && onVideoClick) {
      e.preventDefault();
      onVideoClick(study);
    }
  };

  const cardContent = (
    <div
      onMouseEnter={() => onHover(study.id)}
      onMouseLeave={() => onHover(null)}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      className={`group cursor-pointer rounded-xl overflow-hidden backdrop-blur-md bg-black/30 border border-white/10 hover:border-teal-500/50 hover:bg-black/40 transition-all duration-300 min-h-[450px] flex flex-col hover:shadow-xl hover:shadow-teal-500/10 relative ${
        isActive ? "z-50 scale-[1.01]" : "z-10"
      }`}
    >

      <div className="h-full min-h-[420px] flex flex-col relative overflow-hidden">
        {/* YouTube Thumbnail Background - blurs on hover */}
        <div className="absolute inset-0 overflow-hidden transition-all duration-700 ease-in-out group-hover:blur-md">
          {thumbnailUrl ? (
            <img 
              src={thumbnailUrl} 
              alt={study.title}
              className="w-full h-full object-cover"
            />
          ) : study.tagline ? (
            <div className="absolute inset-0 flex items-center justify-center pb-[40%] px-6">
              <h3 className="text-white text-xl md:text-2xl font-bold text-center drop-shadow-2xl leading-snug whitespace-pre-line">
                {study.tagline}
              </h3>
            </div>
          ) : null}
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
    </div>
  );

  // If not a video, wrap in an anchor tag
  if (!isYouTubeVideo) {
    return (
      <a
        key={study.id}
        href={study.href || "#"}
        target="_blank"
        rel="noopener noreferrer"
      >
        {cardContent}
      </a>
    );
  }

  return cardContent;
};

export const CaseStudiesGrid: React.FC<CaseStudiesGridProps> = ({
  caseStudies = defaultCaseStudies,
  selectedType,
  initialCategory,
}) => {
  const [activeFilter, setActiveFilter] = useState(initialCategory || "All");
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [highlightScroll, setHighlightScroll] = useState(false);
  const [videoModalData, setVideoModalData] = useState<CaseStudy | null>(null);

  // First filter by type (Case Studies, Use Cases, or Blogs)
  const typeFilteredStudies = selectedType 
    ? caseStudies.filter((study) => study.type === selectedType)
    : [];

  // Then filter by category (All, Retail, CPG, etc.)
  const filteredCaseStudies =
    activeFilter === "All"
      ? typeFilteredStudies
      : typeFilteredStudies.filter((study) => study.category === activeFilter);

  // Sync when initial category changes (e.g., via query params)
  useEffect(() => {
    if (initialCategory) setActiveFilter(initialCategory);
  }, [initialCategory]);

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
      {/* Video Modal */}
      <AnimatePresence>
        {videoModalData && (
          <VideoModal
            videoUrl={videoModalData.href || ''}
            title={videoModalData.title}
            onClose={() => setVideoModalData(null)}
          />
        )}
      </AnimatePresence>

      <div className="w-full">
        {/* Filter Bar with Divider Lines */}
        <motion.div
          id="resources-grid"
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
                  className={`min-w-[110px] px-4 py-3 rounded-full text-base font-normal transition-all duration-300 whitespace-nowrap ${
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
                      onVideoClick={setVideoModalData}
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