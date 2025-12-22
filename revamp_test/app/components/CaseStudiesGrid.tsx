import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
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
  videoUrl?: string;
  type: 'Case Studies' | 'Use Cases';
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
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1` : null;
  const iframeRef = useRef<HTMLIFrameElement>(null);

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

  // Prevent body scroll when modal is open and cleanup on unmount
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
      // Stop video playback when component unmounts
      if (iframeRef.current) {
        iframeRef.current.src = '';
      }
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
              ref={iframeRef}
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

// PDF Modal Component
const PDFModal: React.FC<{
  pdfUrl: string;
  title: string;
  onClose: () => void;
}> = ({ pdfUrl, title, onClose }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Prevent body scroll and hide navbar
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    
    const navbar = document.querySelector('nav');
    const originalDisplay = navbar ? (navbar as HTMLElement).style.display : '';
    if (navbar) {
      (navbar as HTMLElement).style.display = 'none';
    }
    
    return () => {
      document.body.style.overflow = originalOverflow;
      if (navbar) {
        (navbar as HTMLElement).style.display = originalDisplay;
      }
    };
  }, []);

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[10000] bg-black"
      onClick={handleBackdropClick}
    >
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div
          className="relative w-full h-full max-w-7xl max-h-[95vh] bg-gray-900 rounded-lg overflow-hidden shadow-2xl flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-gray-800 border-b border-gray-700 flex-shrink-0 relative z-[10001]">
            <h3 className="text-xl font-semibold text-white truncate pr-4">
              {title}
            </h3>
            {/* Close Button */}
            <button
              type="button"
              onClick={handleClose}
              onMouseDown={handleClose}
              className="p-2.5 rounded-lg hover:bg-gray-700 transition-colors group cursor-pointer flex-shrink-0"
              aria-label="Close"
            >
              <svg
                className="w-5 h-5 text-gray-300 group-hover:text-white pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* PDF Viewer */}
          <div className="flex-1 w-full bg-gray-800 overflow-auto relative">
            <iframe
              src={pdfUrl}
              title={title}
              className="w-full h-full min-h-[5000px]"
              style={{ border: 'none' }}
            />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export type CaseStudiesGridProps = {
  caseStudies?: CaseStudy[];
  selectedType?: 'Case Studies' | 'Use Cases';
  initialCategory?: string;
};

export const defaultCaseStudies: CaseStudy[] = [
  // Case Studies
  {
    id: "1",
    title: "How a Global Snack Manufacturer Unlocked $48M in Revenue with Al-Powered Product Recommendations",
    category: "CPG",
    description: "Discover how AI-powered product recommendations transformed a global snack manufacturer's revenue strategy",
    date: "December 22, 2025",
    imageGradient: "from-amber-600 via-orange-500 to-red-600",
    tagline: "$48M Revenue\nUnlocked",
    href: "/Product Recommendation Case Study (3).pdf",
    type: "Case Studies",
  },
  // Use Cases with image URLs and video URLs
  {
    id: "4",
    title: "Physical Observability for Retail & Restaurants",
    category: "Retail",
    description: "Retail decisions that are rooted in the real-world",
    date: "November 10, 2025",
    imageGradient: "from-purple-600 via-pink-500 to-red-500",
    tagline: "Physical Observability\nFor Retail",
    href: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "https://youtu.be/hlE7HSJluDU",
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
    href: "https://images.unsplash.com/photo-1523294587484-bae6cc870010?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "https://youtu.be/BnLJsd5J-8A",
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
    href: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "https://youtu.be/7BfC4T_BfZ4",
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
    href: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "https://youtu.be/4VoVeaXUneY",
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
  onPdfClick?: (study: CaseStudy) => void;
}> = ({ study, onHover, isActive, onVideoClick, onPdfClick }) => {
  const [spotX, setSpotX] = useState(0);
  const [spotY, setSpotY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    setSpotX(e.clientX - rect.left);
    setSpotY(e.clientY - rect.top);
  };

  // Check if this has a YouTube video
  const hasVideo = study.videoUrl && (study.videoUrl.includes('youtube.com') || study.videoUrl.includes('youtu.be'));
  
  // Check if this is a PDF file
  const isPDF = study.href && study.href.endsWith('.pdf');
  
  // Get background image from href (unless it's a PDF)
  const backgroundImageUrl = isPDF ? undefined : study.href;

  const handleClick = (e: React.MouseEvent) => {
    if (hasVideo && onVideoClick) {
      e.preventDefault();
      // Create a temporary study object with href as videoUrl for the modal
      onVideoClick({ ...study, href: study.videoUrl });
    } else if (isPDF && onPdfClick) {
      e.preventDefault();
      // Open PDF in modal
      onPdfClick(study);
    }
  };

  const cardContent = (
    <div
      onMouseEnter={() => onHover(study.id)}
      onMouseLeave={() => onHover(null)}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      className={`group cursor-pointer rounded-xl overflow-hidden backdrop-blur-md bg-black/30 border border-white/10 hover:border-teal-500/50 hover:bg-black/40 transition-all duration-300 min-h-[380px] sm:min-h-[420px] md:min-h-[450px] flex flex-col hover:shadow-xl hover:shadow-teal-500/10 relative ${
        isActive ? "z-50 scale-[1.01]" : "z-10"
      }`}
    >

      <div className="absolute inset-0 flex flex-col overflow-hidden">
        {/* Background Image - blurs on hover */}
        <div className="absolute inset-0 overflow-hidden transition-all duration-[2000ms] ease-out group-hover:blur-md">
          {backgroundImageUrl ? (
            <img 
              src={backgroundImageUrl} 
              alt={study.title}
              className="w-full h-full object-cover object-center"
            />
          ) : study.tagline ? (
            <div className="absolute inset-0 flex items-center justify-center pb-[40%] px-6">
              <h3 className="text-white text-xl md:text-2xl font-bold text-center drop-shadow-2xl leading-snug whitespace-pre-line">
                {study.tagline}
              </h3>
            </div>
          ) : null}
        </div>

        {/* Content Section - Expands from bottom on hover */}
        <div className="absolute bottom-0 left-0 right-0 backdrop-blur-sm bg-black/70 transition-[height] duration-[1000ms] ease-out min-h-[40%] group-hover:h-[70%] p-5 sm:p-6 flex flex-col z-20 border-t border-white/10">
          {/* Category Label */}
          <p className="text-xs font-semibold text-teal-400 uppercase tracking-wide mb-2">
            {study.category}
          </p>

          {/* Title */}
          <h3 className="text-base sm:text-lg font-bold text-gray-100 leading-snug group-hover:text-teal-300 transition-colors duration-700 mb-2">
            {study.title}
          </h3>

          {/* Description - Hidden by default, shown on hover */}
          <div className="overflow-hidden transition-all duration-700 ease-in-out max-h-0 opacity-0 group-hover:max-h-48 group-hover:opacity-100 mb-3">
            <p className="text-sm text-gray-300 leading-relaxed mt-2">
              {study.description}
            </p>
          </div>

          {/* Date */}
          <p className="text-xs sm:text-sm text-gray-400 mb-2">{study.date}</p>

          {/* Read More Button - Shown on hover */}
          <div className="overflow-hidden transition-all duration-700 ease-in-out max-h-0 opacity-0 group-hover:max-h-16 group-hover:opacity-100">
            <button className="mt-2 text-sm font-bold text-gray-100 hover:text-teal-300 transition-colors duration-200 flex items-center gap-1">
              {hasVideo ? 'Watch Now ↓' : isPDF ? 'View & Download ↓' : 'Read More ↓'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // If it's a PDF or video, handle click event directly
  if (isPDF || hasVideo) {
    return cardContent;
  }

  // If not a video or PDF, wrap in an anchor tag for external links
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

  return cardContent;
};

export const CaseStudiesGrid: React.FC<CaseStudiesGridProps> = ({
  caseStudies = defaultCaseStudies,
  selectedType,
  initialCategory,
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [highlightScroll, setHighlightScroll] = useState(false);
  const [videoModalData, setVideoModalData] = useState<CaseStudy | null>(null);
  const [pdfModalData, setPdfModalData] = useState<CaseStudy | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // First filter by type (Case Studies, Use Cases, or Blogs)
  const typeFilteredStudies = selectedType 
    ? caseStudies.filter((study) => study.type === selectedType)
    : caseStudies; // Show all case studies when no type is selected

  // Then filter by selected categories (multiple selection)
  const filteredCaseStudies =
    selectedCategories.length === 0
      ? typeFilteredStudies
      : typeFilteredStudies.filter((study) => selectedCategories.includes(study.category));

  // Reset selected categories when selectedType changes
  useEffect(() => {
    setSelectedCategories([]);
    setIsDropdownOpen(false);
  }, [selectedType]);

  // Cleanup: Close modal when component unmounts (user navigates away)
  useEffect(() => {
    return () => {
      setVideoModalData(null);
      setPdfModalData(null);
    };
  }, []);

  // Sync when initial category changes (e.g., via query params)
  useEffect(() => {
    if (initialCategory && initialCategory !== "All") {
      setSelectedCategories([initialCategory]);
    }
  }, [initialCategory]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle category selection toggle
  const handleCategoryToggle = (category: string) => {
    if (!selectedType) {
      setHighlightScroll(true);
      setTimeout(() => setHighlightScroll(false), 2000);
      return;
    }

    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      } else {
        return [...prev, category];
      }
    });
    
    // Close dropdown after selection
    setIsDropdownOpen(false);
  };

  // Clear all filters
  const handleClearAll = () => {
    setSelectedCategories([]);
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

      {/* PDF Modal */}
      <AnimatePresence>
        {pdfModalData && (
          <PDFModal
            pdfUrl={pdfModalData.href || ''}
            title={pdfModalData.title}
            onClose={() => setPdfModalData(null)}
          />
        )}
      </AnimatePresence>

      <div className="w-full">
        {/* Filter Dropdown */}
        <motion.div
          id="resources-grid"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16 px-6 sm:px-8"
        >
          <div className="flex items-center justify-center gap-4">
            <span className="text-gray-300 font-medium">Refine by:</span>
            
            <div className="relative" ref={dropdownRef}>
              {/* Dropdown Button */}
              <button
                onClick={() => selectedType && setIsDropdownOpen(!isDropdownOpen)}
                disabled={!selectedType}
                className={`min-w-[280px] px-6 py-3 rounded-full text-base font-normal transition-all duration-300 flex items-center justify-between ${
                  selectedType
                    ? "bg-gray-800/60 text-gray-300 hover:bg-gray-700/80 hover:text-white border border-gray-700/50 cursor-pointer"
                    : "bg-gray-800/30 text-gray-400 border border-gray-700/30 cursor-pointer hover:bg-gray-800/40"
                }`}
              >
                <span>
                  {!selectedType
                    ? "Select a type above to filter"
                    : selectedCategories.length === 0
                    ? "Select categories"
                    : `${selectedCategories.length} selected`}
                </span>
                <svg
                  className={`w-5 h-5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && selectedType && (
                <div className="absolute top-full mt-2 w-full bg-gray-900/95 backdrop-blur-md border border-gray-700/50 rounded-xl shadow-2xl shadow-black/50 z-50 overflow-hidden">
                  {/* Clear All Button */}
                  {selectedCategories.length > 0 && (
                    <button
                      onClick={handleClearAll}
                      className="w-full px-4 py-2 text-sm text-teal-400 hover:bg-gray-800/50 transition-colors text-left border-b border-gray-700/50"
                    >
                      Clear all
                    </button>
                  )}
                  
                  {/* Category Options */}
                  <div className="max-h-64 overflow-y-auto">
                    {categories.filter(c => c !== "All").map((category) => (
                      <label
                        key={category}
                        className="flex items-center px-4 py-3 hover:bg-gray-800/50 transition-colors cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={() => handleCategoryToggle(category)}
                          className="w-4 h-4 rounded border-gray-600 bg-gray-800 cursor-pointer accent-teal-500"
                        />
                        <span className="ml-3 text-gray-300">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Selected Pills - hidden on small screens, visible on md+ */}
            {selectedCategories.length > 0 && (
              <div className="hidden md:flex flex-wrap gap-2 md:ml-4">
                {selectedCategories.map((category) => (
                  <span
                    key={category}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/20 border border-teal-500/30 rounded-full text-sm text-teal-300"
                  >
                    {category}
                    <button
                      onClick={() => handleCategoryToggle(category)}
                      className="hover:text-teal-100 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Case Studies Grid with Gaps and Dividers */}
        <div className="px-6 sm:px-8 lg:px-12 relative">
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategories.join(",")}
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
                    onPdfClick={setPdfModalData}
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
                  No {selectedType ? selectedType.toLowerCase() : 'content'} found for this category.
                </p>
              </motion.div>
            )}
          </>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesGrid;