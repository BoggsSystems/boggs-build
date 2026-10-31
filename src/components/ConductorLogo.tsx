import React from 'react';
import './ConductorLogo.css';

interface ConductorLogoProps {
  className?: string;
  isThinking?: boolean;
  size?: number;
}

export const ConductorLogo: React.FC<ConductorLogoProps> = ({ 
  className = '', 
  isThinking = false,
  size = 48
}) => {
  return (
    <div 
      className={`conductor-logo-container ${className} ${isThinking ? 'thinking' : ''}`}
      style={{ width: size, height: size }}
    >
      <svg 
        viewBox="0 0 100 100" 
        className="conductor-logo-svg"
        style={{ width: '100%', height: '100%' }}
      >
        <defs>
          <linearGradient id="logo-blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00aaff" />
            <stop offset="100%" stopColor="#0055ff" />
          </linearGradient>
          <linearGradient id="logo-purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#b026ff" />
            <stop offset="100%" stopColor="#7000ff" />
          </linearGradient>
          <linearGradient id="logo-redGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff2a5f" />
            <stop offset="100%" stopColor="#e60000" />
          </linearGradient>
          <linearGradient id="logo-greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00ff88" />
            <stop offset="100%" stopColor="#00b359" />
          </linearGradient>
          
          <filter id="logo-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <g filter="url(#logo-glow)">
          {/* Top Left Arrow (Blue) */}
          <g transform="rotate(-90 50 50)">
            <path d="M 50 12 A 38 38 0 0 1 82 28 L 89 21 L 92 43 L 69 38 L 76 32 A 28 28 0 0 0 50 22 Z" fill="url(#logo-blueGrad)" />
          </g>

          {/* Top Right Arrow (Purple) */}
          <g transform="rotate(0 50 50)">
            <path d="M 50 12 A 38 38 0 0 1 82 28 L 89 21 L 92 43 L 69 38 L 76 32 A 28 28 0 0 0 50 22 Z" fill="url(#logo-purpleGrad)" />
          </g>

          {/* Bottom Right Arrow (Red) */}
          <g transform="rotate(90 50 50)">
            <path d="M 50 12 A 38 38 0 0 1 82 28 L 89 21 L 92 43 L 69 38 L 76 32 A 28 28 0 0 0 50 22 Z" fill="url(#logo-redGrad)" />
          </g>

          {/* Bottom Left Arrow (Green) */}
          <g transform="rotate(180 50 50)">
            <path d="M 50 12 A 38 38 0 0 1 82 28 L 89 21 L 92 43 L 69 38 L 76 32 A 28 28 0 0 0 50 22 Z" fill="url(#logo-greenGrad)" />
          </g>
        </g>
      </svg>
    </div>
  );
};
