import React from 'react';

export const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    className={`animate-pulse bg-gradient-to-r from-slate-300 via-slate-200 to-slate-300 dark:from-slate-800/50 dark:via-slate-700/50 dark:to-slate-800/50 bg-[length:200%_100%] rounded ${className}`}
    style={{
      animation: 'shimmer 2s ease-in-out infinite',
    }}
  />
);

export const SkeletonText: React.FC<{ lines?: number; className?: string }> = ({ 
  lines = 3, 
  className = '' 
}) => (
  <div className={`space-y-3 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton 
        key={i} 
        className={`h-4 ${i === lines - 1 ? 'w-3/4' : 'w-full'}`} 
      />
    ))}
  </div>
);

export const SkeletonCard: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`rounded-xl border border-slate-800/50 bg-slate-900/50 p-6 ${className}`}>
    <Skeleton className="h-8 w-3/4 mb-4" />
    <SkeletonText lines={3} />
    <Skeleton className="h-10 w-32 mt-6" />
  </div>
);

// Case Study Card Skeleton (for CaseStudiesGrid)
export const SkeletonCaseStudyCard: React.FC = () => (
  <div className="rounded-xl overflow-hidden backdrop-blur-md bg-black/30 border border-white/10 min-h-[450px] flex flex-col">
    <div className="flex-1 relative">
      <Skeleton className="absolute inset-0" />
    </div>
    <div className="p-6 bg-black/70 backdrop-blur-sm border-t border-white/10">
      <Skeleton className="h-3 w-20 mb-2" />
      <Skeleton className="h-6 w-full mb-2" />
      <Skeleton className="h-4 w-24" />
    </div>
  </div>
);

// Resource Card Skeleton (for Resources/Industries pages)
export const SkeletonResourceCard: React.FC = () => (
  <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-xl overflow-hidden hover:border-teal-500/30 transition-all duration-300">
    <Skeleton className="w-full h-48" />
    <div className="p-6">
      <Skeleton className="h-3 w-24 mb-3" />
      <Skeleton className="h-6 w-full mb-3" />
      <SkeletonText lines={2} />
    </div>
  </div>
);

// Team Member Card Skeleton
export const SkeletonTeamCard: React.FC = () => (
  <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">
    <Skeleton className="w-32 h-32 mx-auto mb-4 rounded-full" />
    <Skeleton className="h-6 w-32 mx-auto mb-2" />
    <Skeleton className="h-4 w-24 mx-auto mb-3" />
    <SkeletonText lines={2} className="text-center" />
  </div>
);

// Hero Section Skeleton
export const SkeletonHero: React.FC = () => (
  <div className="h-screen w-full bg-black flex flex-col items-start justify-center px-4 sm:px-6 lg:px-8">
    <div className="max-w-4xl">
      <Skeleton className="h-16 w-full md:h-24 mb-6" />
      <Skeleton className="h-12 w-3/4 md:h-16 mb-6" />
      <SkeletonText lines={2} className="max-w-3xl mb-12" />
      <div className="flex gap-6">
        <Skeleton className="h-12 w-40 rounded-full" />
        <Skeleton className="h-12 w-40 rounded-full" />
      </div>
    </div>
  </div>
);

// Full Section with Cards
export const SkeletonSection: React.FC<{ 
  cards?: number; 
  columns?: 2 | 3 | 4;
  title?: boolean;
}> = ({ cards = 3, columns = 3, title = true }) => {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4'
  };

  return (
    <section className="py-20 bg-slate-950">
      <div className="container mx-auto px-6">
        {title && <Skeleton className="h-12 w-96 mx-auto mb-12" />}
        <div className={`grid grid-cols-1 ${gridCols[columns]} gap-6`}>
          {Array.from({ length: cards }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Filter Bar Skeleton (for Resources/Industries)
export const SkeletonFilterBar: React.FC = () => (
  <div className="mb-16 px-6 sm:px-8">
    <div className="flex gap-5 justify-center">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-12 w-32 rounded-full" />
      ))}
    </div>
  </div>
);
