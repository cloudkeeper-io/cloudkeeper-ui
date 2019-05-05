import React from 'react'
import styled, { keyframes } from 'styled-components/macro'
import times from 'lodash/times'

const gridScale = keyframes`
  0%, 70%, 100% {
    transform: scale3D(1, 1, 1);
  } 
  35% {
    transform: scale3D(0, 0, 1);
  } 
`

const getDelay = (cubeIndex: number) => {
  switch (cubeIndex) {
    case 0:
      return '0.2s'
    case 1:
      return '0.3s'
    case 2:
      return '0.4s'
    case 3:
      return '0.1s'
    case 4:
      return '0.2s'
    case 5:
      return '0.3s'
    case 6:
      return '0s'
    case 7:
      return '0.1s'
    case 8:
      return '0.2s'
    default:
      return 'none'
  }
}

const Wrapper = styled.div<{ size: number }>`
  width: ${p => `${p.size}px`};
  height: ${p => `${p.size}px`};
`
const Cube = styled.div<{ index: number, color: string }>`
  width: 33%;
  height: 33%;
  background: ${p => p.color || p.theme.colors.primary};
  float: left;
  animation: ${gridScale} 1.3s infinite ease-in-out; 
  animation-delay: ${p => getDelay(p.index)};
`

interface SquareSpinnerProps {
  style?: object
  size?: number
  color?: string
  className?: string
}

export default ({ size = 50, color = '', className }: SquareSpinnerProps) => (
  <Wrapper className={className} size={size}>
    {times(9, index => <Cube index={index} color={color} />)}
  </Wrapper>
)
