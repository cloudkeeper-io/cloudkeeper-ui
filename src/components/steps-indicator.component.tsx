import React from 'react'
import styled from 'styled-components/macro'
import { transparentize } from 'polished'
import times from 'lodash/times'
import noop from 'lodash/noop'


const Wrapper = styled.div`
  display: flex;
`
const Step = styled.div<{ active: boolean, cursor: string }>`
  width: ${p => (p.active ? '35px' : '20px')};
  height: 2px;
  border-radius: 1px;
  //margin: 0 5px;
  padding: 10px 7px;
  transition: 0.5s width;
  cursor: ${p => p.cursor}
`
const StepLine = styled.div<{ active: boolean }>`
  height: 2px;
  border-radius: 1px;
  background: ${p => (p.active ? p.theme.colors.primary : transparentize(0.6, p.theme.colors.primary))};
  box-shadow: 0 0 2px ${p => (p.active ? p.theme.colors.primary : transparentize(0.6, p.theme.colors.primary))};
  transition: 0.5s background;
`

interface StepsIndicatorProps {
  steps: number,
  index: number,
  onClick?: (index: number) => void,
}

export default ({ steps, index, onClick = noop }: StepsIndicatorProps) => (
  <Wrapper>
    {times(steps, i => (
      <Step key={i} active={i === index} onClick={() => onClick(i)} cursor={onClick === noop ? '' : 'pointer'}>
        <StepLine active={i === index} />
      </Step>
    ))}
  </Wrapper>
)
