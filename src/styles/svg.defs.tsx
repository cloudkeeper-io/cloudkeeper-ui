import React from 'react'

export default () => (
  <svg style={{ width: 0, height: 0 }}>
    <defs>
      <linearGradient id="dark-spinner-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#129F7C" />
        <stop offset="100%" stopColor="#6F20A0" />
      </linearGradient>
      <linearGradient id="light-spinner-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#2FF6F5" />
        <stop offset="100%" stopColor="#0470FE" />
      </linearGradient>


      <linearGradient id="lightLine" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#2FF6F5" />
        <stop offset="100%" stopColor="#0470FE" />
      </linearGradient>
      <linearGradient id="lightLineSecondary" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#FFAA6E" />
        <stop offset="100%" stopColor="#FF5F99" />
      </linearGradient>

      <linearGradient id="darkLine" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#B9FFEC" />
        <stop offset="100%" stopColor="#B9FFEC" />
      </linearGradient>
      <linearGradient id="darkLineSecondary" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#DB60FF" />
        <stop offset="100%" stopColor="#DB60FF" />
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
    </defs>
  </svg>
)
