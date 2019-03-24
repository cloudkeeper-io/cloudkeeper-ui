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
  width: ${p => (p.active ? '35px' : '20px')};
  height: 2px;
  border-radius: 1px;
  padding: 10px 7px;
  transition: 0.5s width;
  cursor: ${p => p.cursor}
`
const StepLine = styled.div<{ active: boolean, color?: string }>`
  height: 2px;
  border-radius: 1px;
  background: ${p => (p.active ?
    p.color || p.theme.colors.primary :
    transparentize(0.6, p.color || p.theme.colors.primary)
  )};
  box-shadow: 0 0 2px ${p => (p.active ?
    p.color || p.theme.colors.primary :
    transparentize(0.6, p.color || p.theme.colors.primary)
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
