'use client';

import React from 'react';

export default function PlaygroundPage() {
  return (
    <div className="min-h-screen bg-gray-950 pt-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* <h1 className="text-4xl md:text-5xl font-light text-white mb-8 text-center">
          <span className="text-cyan-400">Playground</span>
        </h1> */}
        
        <div className="w-full rounded-lg overflow-hidden border border-cyan-500/20 shadow-2xl">
          <iframe 
            src="https://playground.alchemy-propheus.ai/" 
            className="w-full h-[calc(100vh-200px)] min-h-[600px]"
            title="Propheus Playground"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}