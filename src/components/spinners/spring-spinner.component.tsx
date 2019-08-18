import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { animated, useSpring } from 'react-spring'
import { useInterval } from '../../hooks'

const Wrapper = styled.div<{ size: number }>`
  width: ${(p) => `${p.size}px`};
  height: ${(p) => `${p.size}px`};
`

const Svg = styled.svg`
  height: 100%;
  transform-origin: center center;
  width: 100%;
`
const Circle = styled(animated.circle)`
  stroke-linecap: round;
  stroke: ${(props) => props.color || props.theme.colors.spinner};
`

interface SpringSpinnerProps {
  style?: object
  size?: number
  color?: string
  strokeWidth?: number
  className?: string
}

export default ({ size = 50, color = '', strokeWidth = 4, className }: SpringSpinnerProps) => {
  const [toggle, set] = useState(true)
  const springProps = useSpring({
    opacity: toggle ? 1 : 0,
    from: { opacity: toggle ? 0 : 1 },
  })

  useInterval(() => set(!toggle), 1000)

  return (
    <Wrapper className={className} size={size}>
      <Svg className={className} style={{ width: size, height: size }} viewBox="25 25 50 50">
        <Circle
          style={springProps}
          color={color}
          cx="50"
          cy="50"
          r="20"
          fill="none"
          strokeWidth={strokeWidth}
        />
      </Svg>
    </Wrapper>
  )
}
