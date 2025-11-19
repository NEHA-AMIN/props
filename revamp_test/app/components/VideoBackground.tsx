"use client";

import { useEffect, useRef, useState } from "react";
import FoldingCubeLoader from "./FoldingCubeLoader";

interface VideoBackgroundProps {
  src: string;
  className?: string;
}

export default function VideoBackground({ src, className = "" }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Use a ref to track component mount status
  const isMountedRef = useRef(true);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    
    if (!video) return;
    
    // Set mounted flag
    isMountedRef.current = true;
    
    // Reset loaded state when src changes
    setIsLoaded(false);

    // Force load the video
    video.load();
    
    // Function to handle video playback
    const playVideo = async () => {
      try {
        // Check if component is still mounted
        if (!isMountedRef.current || !document.body.contains(video)) return;
        
        // Ensure video is properly loaded
        if (video.readyState < 2) { // HAVE_CURRENT_DATA or higher
          await new Promise((resolve) => {
            const loadHandler = () => {
              if (isMountedRef.current) resolve(undefined);
              video.removeEventListener('loadeddata', loadHandler);
            };
            video.addEventListener('loadeddata', loadHandler);
          });
        }
        
        // Check again if component is still mounted
        if (!isMountedRef.current || !document.body.contains(video)) return;
        
        // Start playing
        await video.play();
        // Mark video as loaded once playback starts
        if (isMountedRef.current) setIsLoaded(true);
        
        // Ensure video is not stuck at the beginning
        if (video.currentTime === 0) {
          video.currentTime = 0.01;
        }
      } catch (error) {
        // Only log errors if component is still mounted
        if (isMountedRef.current && error instanceof Error) {
          // Silent error handling to avoid console noise
        }
      }
    };
    
    // Play video immediately
    playVideo();
    // If the video is already in a ready state (from cache), mark as loaded
    if (video.readyState >= 2) {
      setIsLoaded(true);
    }
    
    // Add event listeners for various scenarios
    const events = ['click', 'touchstart', 'keydown'];
    const handleUserInteraction = () => {
      playVideo();
      events.forEach(event => document.removeEventListener(event, handleUserInteraction));
    };
    
    events.forEach(event => document.addEventListener(event, handleUserInteraction));
    
    // Handle visibility changes
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        playVideo();
      } else {
        video.pause();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Handle video errors - with more graceful recovery
    const handleVideoError = () => {
      // Don't log error to console to avoid React DevTools noise
      setTimeout(() => {
        if (video && document.body.contains(video)) {
          video.load();
          playVideo();
        }
      }, 300);
    };
    
    // When the video has enough data to play, mark as loaded so the loader can hide
    const onLoadedData = () => setIsLoaded(true);
    video.addEventListener('loadeddata', onLoadedData);
    video.addEventListener('canplay', onLoadedData);
    video.addEventListener('error', handleVideoError);
    
    // Cleanup
    return () => {
      events.forEach(event => document.removeEventListener(event, handleUserInteraction));
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      video.removeEventListener('error', handleVideoError);
      video.removeEventListener('loadeddata', onLoadedData);
      video.removeEventListener('canplay', onLoadedData);
      video.pause();
      video.src = "";
      video.load();
    };
  }, [src]);

  return (
    <div className={`relative w-full h-full overflow-hidden bg-black ${className}`}>
      {/* Fallback background gradient when video can't play */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-black z-0" />

      {/* Loader overlay - visible until video reports it's ready */}
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
          // Fill the parent container
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
