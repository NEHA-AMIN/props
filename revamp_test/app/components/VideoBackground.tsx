"use client";

import { useEffect, useRef, useState } from "react";
import FoldingCubeLoader from "./FoldingCubeLoader";

interface VideoBackgroundProps {
  src: string;
  className?: string;
  onLoad?: () => void;
}

export default function VideoBackground({ src, className = "", onLoad }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isMountedRef = useRef(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    
    if (!video) return;
    
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
        // Don't clear src on cleanup to avoid issues with navigation
        // video.src = "";
        // video.load();
      }
    };
  }, [src, onLoad]);

  return (
    <div className={`relative w-full h-full overflow-hidden bg-black ${className}`}>
      {/* Fallback background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-black z-0" />

      {/* Loader overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 z-[30] flex items-center justify-center bg-black/60">
          <div className="w-20 h-20">
            <FoldingCubeLoader />
          </div>
        </div>
      )}

      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full z-[10] transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center center'
        }}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}