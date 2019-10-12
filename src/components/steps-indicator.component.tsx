import React from 'react'
import styled from 'styled-components/macro'
import { transparentize } from 'polished'
import times from 'lodash-es/times'
import noop from 'lodash-es/noop'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  box-sizing: initial;
`
const Circle = styled.div<{ active: boolean }>`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${(p) => (p.active ? p.theme.colors.active : p.theme.controls.color)};
  opacity: ${(p) => (p.active ? 0 : 1)};
  transform: translate(-50%,-50%);
  transition: all 0.4s ease-in-out 0s;
`
const Step = styled.div<{ active: boolean, cursor: string }>`
  position: relative;
  width: ${(p) => (p.active ? '24px' : '6px')};
  height: 6px;
  border-radius: 6px;
  padding: 10px 7px;
  transition: width 0.5s ease-in-out 0s;
  cursor: ${(p) => p.cursor};
`
const StepLine = styled.div<{ active: boolean }>`
  height: 6px;
  border-radius: 6px;
  background: ${(p) => p.color || p.theme.controls.activeGradient};
  box-shadow: ${(p) => `0px 6px 12px ${p.active && transparentize(0.6, p.color || p.theme.colors.active)}`};
  opacity: ${(p) => (p.active ? 1 : 0)};
  transition: all 0.5s ease-in-out 0s;
`

interface StepsIndicatorProps {
  steps: number,
  index: number,
  color?: string,
  className?: string,
  onClick?: (index: number) => void,
}

export default ({ steps, index, className, onClick = noop }: StepsIndicatorProps) => (
  <Wrapper className={className}>
    {times(steps, (i) => (
      <Step key={i} active={i === index} onClick={() => onClick(i)} cursor={onClick === noop ? '' : 'pointer'}>
        <StepLine active={i === index} />
        <Circle active={i === index} />
      </Step>
    ))}
  </Wrapper>
)
