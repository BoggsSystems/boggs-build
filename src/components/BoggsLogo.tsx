import React from 'react';

interface BoggsLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const BoggsLogo: React.FC<BoggsLogoProps> = ({
  className = '',
  size = 36,
  showText = true,
}) => {
  return (
    <div
      className={`inline-flex items-center gap-3 select-none ${className}`}
      style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        <defs>
          <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#c084fc" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Hex Shield */}
        <polygon
          points="50,6 90,28 90,72 50,94 10,72 10,28"
          stroke="url(#bgGrad)"
          strokeWidth="4"
          fill="#0c1322"
          filter="url(#glow)"
        />

        {/* Inner Isometric Building Block Nodes */}
        <path
          d="M50 20 L80 37 L50 54 L20 37 Z"
          fill="url(#bgGrad)"
          opacity="0.85"
        />
        <path
          d="M20 43 L50 60 L50 82 L20 65 Z"
          fill="#38bdf8"
          opacity="0.65"
        />
        <path
          d="M50 60 L80 43 L80 65 L50 82 Z"
          fill="#818cf8"
          opacity="0.75"
        />

        {/* Core Velocity Node */}
        <circle cx="50" cy="40" r="4" fill="#ffffff" filter="url(#glow)" />
      </svg>

      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
          <span
            style={{
              fontWeight: 800,
              fontSize: '1.15rem',
              letterSpacing: '-0.02em',
              background: 'linear-gradient(135deg, #ffffff 40%, #94a3b8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            BOGGS SYSTEMS
          </span>
          <span
            style={{
              fontSize: '0.68rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              color: '#38bdf8',
              textTransform: 'uppercase',
            }}
          >
            boggs.build
          </span>
        </div>
      )}
    </div>
  );
};
