import React from 'react'
import styled, { keyframes, css } from 'styled-components/macro'

import FaIcon from './icons/fa-icon.component'

const spinnerDash = keyframes`
  0% {
    stroke-dasharray: 1,200;
  }
  100% {
    stroke-dasharray: 124,200;
  }
`

const Wrapper = styled.div<{ size: number }>`
  position: relative;
  width: ${p => `${p.size}px`};
  height: ${p => `${p.size}px`};
  cursor: pointer;
`
const Svg = styled.svg`
  height: 100%;
  width: 100%;
  transform-origin: center center;
  transform: rotate(-90deg);
`
const Circle = styled.circle<{ time: number, active: boolean }>`
  animation: ${p => (p.active ? css`${spinnerDash} ${`${p.time}ms`} ease-in-out forwards` : 'none')};
  opacity: ${p => (p.active ? 1 : 0)};
  stroke-dasharray: 1,200;
  stroke-linecap: round;
  stroke: ${props => props.color || props.theme.colors.primary};
`
const ActiveIcon = styled(FaIcon)<{ fontSize: number }>`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: ${p => `${p.fontSize / 3}px`};
  transition: 0.5s all;
`

interface TimerProps {
  style?: object
  size?: number
  active: boolean
  strokeWidth?: number
  color?: string
  time?: number
  className?: string
  onClick?: () => void
}

export default ({ size = 50, color = '', strokeWidth = 2, className, onClick, active, time = 10000 }: TimerProps) => (
  <Wrapper size={size} className={className} onClick={onClick}>
    <Svg style={{ width: size, height: size }} viewBox="25 25 50 50">
      <Circle
        active={active}
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
    <ActiveIcon fontSize={size} icon={active ? 'pause' : 'play'} />
  </Wrapper>
)
