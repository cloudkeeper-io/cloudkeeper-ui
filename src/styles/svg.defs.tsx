import React from 'react'

export default () => (
  <svg style={{ width: 0, height: 0 }}>
    <defs>
      <linearGradient id="lightLine" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#FFAA6E" />
        <stop offset="100%" stopColor="#FF5F99" />
      </linearGradient>
      <linearGradient id="lightLineSecondary" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#2FF6F5" />
        <stop offset="100%" stopColor="#0470FE" />
      </linearGradient>
      <linearGradient id="darkLine" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#B9FFEC" />
        <stop offset="100%" stopColor="#B9FFEC" />
      </linearGradient>
      <linearGradient id="darkLineSecondary" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#DB60FF" />
        <stop offset="100%" stopColor="#DB60FF" />
      </linearGradient>
    </defs>
  </svg>
)
