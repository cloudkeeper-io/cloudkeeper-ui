/* eslint-disable no-nested-ternary */
import React from 'react'
import styled from 'styled-components/macro'
import { transparentize } from 'polished'
import times from 'lodash/times'
import noop from 'lodash/noop'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`
const Step = styled.div<{ active: boolean, cursor: string }>`
  width: ${p => (p.active ? '24px' : '6px')};
  height: 6px;
  border-radius: 1px;
  padding: 10px 7px;
  transition: 0.5s width;
  cursor: ${p => p.cursor}
`
const StepLine = styled.div<{ active: boolean, color?: string }>`
  height: 6px;
  border-radius: 6px;
  background: ${p => (p.active ?
    p.color || p.theme.steps.activeColor :
    p.color ? transparentize(0.6, p.color) : p.theme.steps.color
  )};
  box-shadow: 0 0 4px ${p => (p.active ?
    (p.color ? transparentize(0.6, p.color) : p.theme.steps.shadow) :
    'transparent'
  )};
  transition: 0.5s background;
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
        <StepLine color={color} active={i === index} />
      </Step>
    ))}
  </Wrapper>
)
