/* eslint-disable no-nested-ternary */
import React from 'react'
import styled from 'styled-components/macro'
import { transparentize } from 'polished'
import times from 'lodash/times'
import noop from 'lodash/noop'

const getBackground = (p: any) => {
  if (p.active) {
    return p.color || p.theme.colors.primary
  }
  return p.color ? transparentize(0.6, p.color) : p.theme.controls.color
}

const getBoxShadow = (p: any) => {
  if (p.active) {
    return p.color ? transparentize(0.4, p.color) : p.theme.controls.shadow
  }
  return 'transparent'
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  box-sizing: initial;
`
const Step = styled.div<{ active: boolean, cursor: string }>`
  position: relative;
  width: ${p => (p.active ? '24px' : '6px')};
  height: 6px;
  border-radius: 6px;
  padding: 10px 7px;
  transition: width 0.5s ease-in-out 0s;
  cursor: ${p => p.cursor};
`
const StepLine = styled.div<{ active: boolean, color?: string }>`
  height: 6px;
  border-radius: 6px;
  background: ${p => getBackground(p)};
  box-shadow: ${p => getBoxShadow(p)};
  transition: all 0.5s ease-in-out 0s;
`

interface StepsIndicatorProps {
  steps: number,
  index: number,
  color?: string,
  className?: string,
  onClick?: (index: number) => void,
}

export default ({ steps, index, className, color, onClick = noop }: StepsIndicatorProps) => (
  <Wrapper className={className}>
    {times(steps, i => (
      <Step key={i} active={i === index} onClick={() => onClick(i)} cursor={onClick === noop ? '' : 'pointer'}>
        <StepLine active={i === index} color={color} />
      </Step>
    ))}
  </Wrapper>
)
