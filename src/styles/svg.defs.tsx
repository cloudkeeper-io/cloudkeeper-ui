import React from 'react'

export default () => (
  <svg style={{ width: 0, height: 0, position: 'absolute', top: 0 }}>
    <defs>
      <linearGradient id="dark-spinner-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#48E385" />
        <stop offset="100%" stopColor="#018EFF" />
      </linearGradient>
      <linearGradient id="light-spinner-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#2FF6F5" />
        <stop offset="100%" stopColor="#0470FE" />
      </linearGradient>


      <linearGradient id="lightLine" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#FFAA6E" />
        <stop offset="100%" stopColor="#FF5F99" />
      </linearGradient>
      <linearGradient id="lightLineSecondary" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#2FF6F5" />
        <stop offset="100%" stopColor="#0470FE" />
      </linearGradient>

      <linearGradient id="darkLine" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#48E385" />
        <stop offset="100%" stopColor="#018EFF" />
      </linearGradient>
      <linearGradient id="darkLineSecondary" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#FFFC00" />
        <stop offset="100%" stopColor="#00B81D" />
      </linearGradient>

      <filter id="lightLineShadow" x="0" y="-150px" width="200%" height="300px">
        <feOffset result="offOut" in="SourceGraphic" dx="0" dy="10" />
        <feGaussianBlur result="blurOut" in="offOut" stdDeviation="3" />
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.4" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id="darkLineShadow" x="0" y="-150px" width="200%" height="300px">
        <feOffset result="offOut" in="SourceGraphic" dx="0" dy="10" />
        <feGaussianBlur result="blurOut" in="offOut" stdDeviation="3" />
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.25" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <filter id="strokeShadow" x="-180%" y="-1000%" width="500%" height="2000%">
        <feOffset result="offOut" in="SourceGraphic" dx="0" dy="10" />
        <feGaussianBlur result="blurOut" in="offOut" stdDeviation="3" />
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.25" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <linearGradient id="lightAreaChart" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#2FF6F5" />
        <stop offset="100%" stopColor="#0470FE" />
      </linearGradient>

      <linearGradient id="darkAreaChart" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#48E385" />
        <stop offset="100%" stopColor="#018EFF" />
      </linearGradient>

      <linearGradient id="fadeGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="white" stopOpacity={0.3} />
        <stop offset="100%" stopColor="white" stopOpacity={0} />
      </linearGradient>

      <mask id="fadeMask" maskContentUnits="objectBoundingBox">
        <rect width="1" height="1" fill="url(#fadeGradient)" />
      </mask>
    </defs>
  </svg>
)
