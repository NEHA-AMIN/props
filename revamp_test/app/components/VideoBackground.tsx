"use client";

import { useEffect, useRef, useState } from "react";
import FoldingCubeLoader from "./FoldingCubeLoader";

interface VideoBackgroundProps {
  // Multiple video sources for adaptive quality
  videoSources?: {
    highest: string;      // 47MB - Only for very fast connections
    high: string;         // 26MB - For good connections
    medium: string;       // 14MB - Default for most cases
    low: string;          // 7.8MB - For mobile/slow connections
  };
  poster?: string;
  className?: string;
  onLoad?: () => void;
}

type ConnectionSpeed = 'very-fast' | 'fast' | 'medium' | 'slow';

export default function VideoBackground({ 
  videoSources = {
    highest: '/hero-background.mp4',
    high: '/hero-background-1.mp4',
    medium: '/hero-background-2.mp4',
    low: '/hero-background-3.mp4'
  },
  poster,
  className = "", 
  onLoad 
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isMountedRef = useRef(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedVideoSrc, setSelectedVideoSrc] = useState<string>('');
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  // Intelligent video quality selection based on device and connection
  useEffect(() => {
    const selectOptimalVideo = (): string => {
      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
      
      // Get connection information
      const connection = (navigator as any).connection || 
                        (navigator as any).mozConnection || 
                        (navigator as any).webkitConnection;
      
      // Determine connection speed
      let connectionSpeed: ConnectionSpeed = 'medium';
      
      if (connection) {
        const effectiveType = connection.effectiveType;
        const downlink = connection.downlink; // Mbps
        const saveData = connection.saveData;
        
        // If user has data saver on, use lowest quality
        if (saveData) {
          connectionSpeed = 'slow';
        }
        // Determine speed based on effective type and downlink
        else if (effectiveType === '4g' && downlink > 10) {
          connectionSpeed = 'very-fast'; // 10+ Mbps
        } else if (effectiveType === '4g' || (effectiveType === '3g' && downlink > 5)) {
          connectionSpeed = 'fast'; // 5-10 Mbps
        } else if (effectiveType === '3g' || downlink > 2) {
          connectionSpeed = 'medium'; // 2-5 Mbps
        } else {
          connectionSpeed = 'slow'; // < 2 Mbps
        }
      } else {
        // Fallback: estimate based on device type
        if (isMobile) {
          connectionSpeed = 'slow';
        } else if (isTablet) {
          connectionSpeed = 'medium';
        } else {
          connectionSpeed = 'fast';
        }
      }
      
      // Select video based on device and connection speed
      // Priority: Use medium (14MB) and low (7.8MB) for most cases
      
      if (isMobile) {
        // Mobile devices: Always use low or medium
        if (connectionSpeed === 'very-fast' || connectionSpeed === 'fast') {
          return videoSources.medium; // 14MB for fast mobile
        } else {
          return videoSources.low; // 7.8MB for normal/slow mobile
        }
      } else if (isTablet) {
        // Tablets: Use medium or low
        if (connectionSpeed === 'very-fast' || connectionSpeed === 'fast') {
          return videoSources.medium; // 14MB
        } else {
          return videoSources.low; // 7.8MB
        }
      } else {
        // Desktop: Use medium for most cases, high/highest only for very fast
        if (connectionSpeed === 'very-fast') {
          // Only use highest quality (47MB) for very fast connections (10+ Mbps)
          return videoSources.highest; // 47MB
        } else if (connectionSpeed === 'fast') {
          // Use high quality (26MB) for fast connections (5-10 Mbps)
          return videoSources.high; // 26MB
        } else if (connectionSpeed === 'medium') {
          // DEFAULT: Use medium quality (14MB) for most desktop users
          return videoSources.medium; // 14MB
        } else {
          // Use low quality (7.8MB) for slow connections
          return videoSources.low; // 7.8MB
        }
      }
    };
    
    // Select the optimal video
    const optimalVideo = selectOptimalVideo();
    setSelectedVideoSrc(optimalVideo);
    
    // Log selection for debugging (remove in production)
    console.log('🎥 Video Quality Selected:', {
      source: optimalVideo,
      device: window.innerWidth < 768 ? 'mobile' : window.innerWidth < 1024 ? 'tablet' : 'desktop',
      connection: (navigator as any).connection?.effectiveType || 'unknown',
      downlink: (navigator as any).connection?.downlink || 'unknown'
    });
    
    // Delay video load slightly on mobile for better initial page load
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      const timer = setTimeout(() => setShouldLoadVideo(true), 500);
      return () => clearTimeout(timer);
    } else {
      setShouldLoadVideo(true);
    }
  }, [videoSources]);

  useEffect(() => {
    const video = videoRef.current;
    
    if (!video || !shouldLoadVideo || !selectedVideoSrc) return;
    
    // Set mounted flag
    isMountedRef.current = true;
    
    // Reset loaded state when component mounts or src changes
    setIsLoaded(false);

    // Function to handle video playback
    const playVideo = async () => {
      try {
        if (!isMountedRef.current || !video || !document.body.contains(video)) return;
        
        // Wait for video to be ready if it isn't already
        if (video.readyState < 2) {
          await new Promise<void>((resolve) => {
            const loadHandler = () => {
              video.removeEventListener('loadeddata', loadHandler);
              if (isMountedRef.current) resolve();
            };
            video.addEventListener('loadeddata', loadHandler);
            // Trigger load if not already loading
            if (video.networkState === 0 || video.networkState === 3) {
              video.load();
            }
          });
        }
        
        if (!isMountedRef.current || !video || !document.body.contains(video)) return;
        
        await video.play();
        
        if (isMountedRef.current) {
          setIsLoaded(true);
          // Call onLoad callback when video is loaded
          onLoad?.();
        }
        
        // Ensure video starts playing
        if (video.currentTime === 0) {
          video.currentTime = 0.01;
        }
      } catch (error) {
        // Silent error handling
        if (isMountedRef.current && video) {
          // Retry after a short delay
          setTimeout(() => {
            if (isMountedRef.current && video && document.body.contains(video)) {
              video.play().catch(() => {});
            }
          }, 100);
        }
      }
    };
    
    // Initial play attempt
    playVideo();
    
    // If video is already ready (cached), mark as loaded
    if (video.readyState >= 2) {
      setIsLoaded(true);
      onLoad?.();
    }
    
    // User interaction handlers
    const events = ['click', 'touchstart', 'keydown'];
    const handleUserInteraction = () => {
      if (video && isMountedRef.current) {
        playVideo();
      }
    };
    
    events.forEach(event => document.addEventListener(event, handleUserInteraction, { once: true }));
    
    // Visibility change handler
    const handleVisibilityChange = () => {
      if (!video || !isMountedRef.current) return;
      
      if (document.visibilityState === 'visible') {
        playVideo();
      } else {
        video.pause();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Video error handler
    const handleVideoError = () => {
      if (!isMountedRef.current || !video) return;
      
      setTimeout(() => {
        if (video && isMountedRef.current && document.body.contains(video)) {
          video.load();
          playVideo();
        }
      }, 300);
    };
    
    // Video ready handlers
    const onLoadedData = () => {
      if (isMountedRef.current) {
        setIsLoaded(true);
        onLoad?.();
      }
    };
    
    video.addEventListener('loadeddata', onLoadedData);
    video.addEventListener('canplay', onLoadedData);
    video.addEventListener('error', handleVideoError);
    
    // Cleanup function
    return () => {
      isMountedRef.current = false;
      
      events.forEach(event => document.removeEventListener(event, handleUserInteraction));
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      
      if (video) {
        video.removeEventListener('error', handleVideoError);
        video.removeEventListener('loadeddata', onLoadedData);
        video.removeEventListener('canplay', onLoadedData);
        video.pause();
      }
    };
  }, [selectedVideoSrc, onLoad, shouldLoadVideo]);

  return (
    <div className={`relative w-full h-full overflow-hidden bg-black ${className}`}>
      {/* Fallback background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-black z-0" />

      {/* Poster image for instant display */}
      {poster && !isLoaded && (
        <div 
          className="absolute inset-0 z-[5] bg-cover bg-center"
          style={{ backgroundImage: `url(${poster})` }}
        />
      )}

      {/* Loader overlay */}
      {!isLoaded && shouldLoadVideo && (
        <div className="absolute inset-0 z-[30] flex items-center justify-center bg-black/60">
          <div className="w-20 h-20">
            <FoldingCubeLoader />
          </div>
        </div>
      )}

      {/* Only render video when shouldLoadVideo is true and video is selected */}
      {shouldLoadVideo && selectedVideoSrc && (
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full z-[10] transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          autoPlay
          muted
          loop
          playsInline
          preload={window.innerWidth < 768 ? "metadata" : "auto"}
          poster={poster}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center'
          }}
        >
          <source src={selectedVideoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
}

// Made with Bob
