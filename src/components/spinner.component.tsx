import React from 'react'
import styled, { keyframes } from 'styled-components/macro'

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const spinnerDash = keyframes`
  0% {
    stroke-dasharray: 1,200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89,200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89,200;
    stroke-dashoffset: -124px;
  }
`

const Svg = styled.svg`
  animation: ${rotate360} 2s linear infinite;
  height: 100%;
  transform-origin: center center;
  width: 100%;
`

const Circle = styled.circle`
  animation: ${spinnerDash} 1.5s ease-in-out infinite;
  stroke-dasharray: 1,200;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  stroke: ${props => props.color || props.theme.colors.spinner};
`

interface SpinnerProps {
  style?: object
  size?: number | string
  strokeWidth?: number
  color?: string
  className?: string
}

export default ({ size = 50, color = '', strokeWidth = 2, className }: SpinnerProps) => (
  <Svg className={className} style={{ width: size, height: size }} viewBox="25 25 50 50">
    <defs>
      <linearGradient id="spinner-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#129F7C" />
        <stop offset="100%" stopColor="#6F20A0" />
      </linearGradient>
    </defs>
    <Circle color={color} cx="50" cy="50" r="20" fill="none" strokeWidth={strokeWidth} strokeMiterlimit="10" />
  </Svg>
)
