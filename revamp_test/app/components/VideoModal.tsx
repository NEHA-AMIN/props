"use client";

import React, { useEffect } from 'react';

interface VideoModalProps {
  src: string;
  onClose: () => void;
}

export default function VideoModal({ src, onClose }: VideoModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="relative w-full max-w-3xl mx-4">
        <button
          onClick={onClose}
          aria-label="Close video"
          className="absolute top-3 right-3 z-50 p-2 rounded-full bg-black/40 text-white"
        >
          ✕
        </button>

        <div className="rounded-lg overflow-hidden shadow-lg">
          <video src={src} controls autoPlay className="w-full h-auto bg-black" />
        </div>
      </div>
    </div>
  );
}
