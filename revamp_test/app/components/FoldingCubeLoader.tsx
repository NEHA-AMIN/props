'use client';

import React from 'react';

export const FoldingCubeLoader: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`sk-folding-cube ${className}`}>
      <div className="sk-cube1 sk-cube"></div>
      <div className="sk-cube2 sk-cube"></div>
      <div className="sk-cube4 sk-cube"></div>
      <div className="sk-cube3 sk-cube"></div>
      
      <style jsx>{`
        .sk-folding-cube {
          margin: 20px auto;
          width: 60px;
          height: 60px;
          position: relative;
          transform: rotateZ(45deg);
        }

        .sk-folding-cube .sk-cube {
          float: left;
          width: 50%;
          height: 50%;
          position: relative;
          transform: scale(1.1);
        }

        .sk-folding-cube .sk-cube:before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%);
          animation: sk-foldCubeAngle 2.4s infinite linear both;
          transform-origin: 100% 100%;
        }

        .sk-folding-cube .sk-cube2 {
          transform: scale(1.1) rotateZ(90deg);
        }

        .sk-folding-cube .sk-cube3 {
          transform: scale(1.1) rotateZ(180deg);
        }

        .sk-folding-cube .sk-cube4 {
          transform: scale(1.1) rotateZ(270deg);
        }

        .sk-folding-cube .sk-cube2:before {
          animation-delay: 0.3s;
        }

        .sk-folding-cube .sk-cube3:before {
          animation-delay: 0.6s;
        }

        .sk-folding-cube .sk-cube4:before {
          animation-delay: 0.9s;
        }

        @keyframes sk-foldCubeAngle {
          0%, 10% {
            transform: perspective(140px) rotateX(-180deg);
            opacity: 0;
          }
          25%, 75% {
            transform: perspective(140px) rotateX(0deg);
            opacity: 1;
          }
          90%, 100% {
            transform: perspective(140px) rotateY(180deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default FoldingCubeLoader;
