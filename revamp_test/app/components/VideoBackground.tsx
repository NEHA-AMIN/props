"use client";

import { useEffect, useRef, useState } from "react";
import FoldingCubeLoader from "./FoldingCubeLoader";

interface VideoBackgroundProps {
  videoSources?: {
    highest: string;
    high: string;
    medium: string;
    low: string;
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

  useEffect(() => {
    const selectOptimalVideo = (): string => {
      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
      
      const connection = (navigator as any).connection || 
                        (navigator as any).mozConnection || 
                        (navigator as any).webkitConnection;

      console.log('🌐 Network Info:', connection || 'No connection info available');
      
      let connectionSpeed: ConnectionSpeed = 'medium';
      
      if (connection) {
        const effectiveType = connection.effectiveType;
        const downlink = connection.downlink;
        const saveData = connection.saveData;
        
        if (saveData) {
          connectionSpeed = 'slow';
        }
        else if (effectiveType === '4g' && downlink > 10) {
          connectionSpeed = 'very-fast';
        } else if (effectiveType === '4g' || (effectiveType === '3g' && downlink > 5)) {
          connectionSpeed = 'fast';
        } else if (effectiveType === '3g' || downlink > 2) {
          connectionSpeed = 'medium';
        } else {
          connectionSpeed = 'slow';
        }
      } else {
        if (isMobile) {
          connectionSpeed = 'slow';
        } else if (isTablet) {
          connectionSpeed = 'medium';
        } else {
          connectionSpeed = 'fast';
        }
      }
      
      if (isMobile) {
        if (connectionSpeed === 'very-fast' || connectionSpeed === 'fast') {
          return videoSources.medium;
        } else {
          return videoSources.low;
        }
      } else if (isTablet) {
        if (connectionSpeed === 'very-fast' || connectionSpeed === 'fast') {
          return videoSources.medium;
        } else {
          return videoSources.low;
        }
      } else {
        if (connectionSpeed === 'very-fast') {
          return videoSources.highest;
        } else if (connectionSpeed === 'fast') {
          return videoSources.high;
        } else if (connectionSpeed === 'medium') {
          return videoSources.medium;
        } else {
          return videoSources.low;
        }
      }
    };
    
    const optimalVideo = selectOptimalVideo();
    setSelectedVideoSrc(optimalVideo);
    
    console.log('🎥 Video Quality Selected:', {
      source: optimalVideo,
      device: window.innerWidth < 768 ? 'mobile' : window.innerWidth < 1024 ? 'tablet' : 'desktop',
      connection: (navigator as any).connection?.effectiveType || 'unknown',
      downlink: (navigator as any).connection?.downlink || 'unknown'
    });
    
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
    
    isMountedRef.current = true;
    setIsLoaded(false);

    const playVideo = async () => {
      try {
        if (!isMountedRef.current || !video || !document.body.contains(video)) return;
        
        if (video.readyState < 2) {
          await new Promise<void>((resolve) => {
            const loadHandler = () => {
              video.removeEventListener('loadeddata', loadHandler);
              if (isMountedRef.current) resolve();
            };
            video.addEventListener('loadeddata', loadHandler);
            if (video.networkState === 0 || video.networkState === 3) {
              video.load();
            }
          });
        }
        
        if (!isMountedRef.current || !video || !document.body.contains(video)) return;
        
        await video.play();
        
        if (isMountedRef.current) {
          setIsLoaded(true);
          onLoad?.();
        }
        
        if (video.currentTime === 0) {
          video.currentTime = 0.01;
        }
      } catch (error) {
        if (isMountedRef.current && video) {
          setTimeout(() => {
            if (isMountedRef.current && video && document.body.contains(video)) {
              video.play().catch(() => {});
            }
          }, 100);
        }
      }
    };
    
    playVideo();
    
    if (video.readyState >= 2) {
      setIsLoaded(true);
      onLoad?.();
    }
    
    const events = ['click', 'touchstart', 'keydown'];
    const handleUserInteraction = () => {
      if (video && isMountedRef.current) {
        playVideo();
      }
    };
    
    events.forEach(event => document.addEventListener(event, handleUserInteraction, { once: true }));
    
    const handleVisibilityChange = () => {
      if (!video || !isMountedRef.current) return;
      
      if (document.visibilityState === 'visible') {
        playVideo();
      } else {
        video.pause();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    const handleVideoError = () => {
      if (!isMountedRef.current || !video) return;
      
      setTimeout(() => {
        if (video && isMountedRef.current && document.body.contains(video)) {
          video.load();
          playVideo();
        }
      }, 300);
    };
    
    const onLoadedData = () => {
      if (isMountedRef.current) {
        setIsLoaded(true);
        onLoad?.();
      }
    };
    
    video.addEventListener('loadeddata', onLoadedData);
    video.addEventListener('canplay', onLoadedData);
    video.addEventListener('error', handleVideoError);
    
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
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-black z-0" />

      {poster && !isLoaded && (
        <div 
          className="absolute inset-0 z-[5] bg-cover bg-center"
          style={{ backgroundImage: `url(${poster})` }}
        />
      )}

      {!isLoaded && shouldLoadVideo && (
        <div className="absolute inset-0 z-[30] flex items-center justify-center bg-black/60">
          <div className="w-20 h-20">
            <FoldingCubeLoader />
          </div>
        </div>
      )}

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
