import * as React from 'react'
import styled, { keyframes } from 'styled-components/macro'

const spinnerDash = keyframes`
  0% {
    stroke-dasharray: 1,200;
  }
  100% {
    stroke-dasharray: 124,200;
  }
`

const Svg = styled.svg`
  height: 100%;
  transform-origin: center center;
  width: 100%;
`
const Circle = styled.circle<{ time: number }>`
  animation: ${spinnerDash} ${p => `${p.time}s`} ease-in-out forwards;
  stroke-dasharray: 1,200;
  stroke-linecap: round;
  stroke: ${props => props.color || props.theme.colors.spinner};
`

interface SpinnerProps {
  style?: object
  size?: number | string
  strokeWidth?: number
  color?: string
  time?: number
  className?: string
  resetAnimation?: any
}

export default ({ size = 50, color = '', strokeWidth = 2, className, time = 10 }: SpinnerProps) => (
  <Svg className={className} style={{ width: size, height: size }} viewBox="25 25 50 50">
    <Circle
      time={time}
      color={color}
      cx="50"
      cy="50"
      r="20"
      fill="none"
      strokeWidth={strokeWidth}
      strokeMiterlimit="10"
    />
  </Svg>
)
