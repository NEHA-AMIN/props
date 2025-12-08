'use client';

import React from 'react';

export default function PlaygroundPage() {
  return (
    <div className="fixed inset-0 top-20 bg-gray-950">
      <iframe 
        src="https://playground.alchemy-propheus.ai/" 
        className="w-full h-full"
        title="Propheus Playground"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        loading="lazy"
      />
    </div>
  );
}