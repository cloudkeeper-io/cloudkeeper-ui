import React from 'react'
import styled from 'styled-components/macro'

import { getInput, getLabel } from './controls.styles'

const ControlIndicator = styled.div`
  position: absolute;
  top: 3px;
  left: 0;
  min-height: 15px;
  min-width: 15px;
  background: ${p => p.theme.controls.color};
  border-radius: 50%;
  transition: all 0.3s;
  box-shadow: 0 0 4px ${p => p.theme.controls.shadow};
  &:after {
    content: '';
    box-sizing: initial;
    position: absolute;
    display: none;
    left: 5px;
    top: 5px;
    height: 5px;
    width: 5px;
    border-radius: 50%;
    background: ${p => p.theme.controls.secondaryActiveColor};
  }
`

interface RadioButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: any
  className?: string
  name?: string
  disabled?: boolean
  defaultChecked?: boolean
}

const Input = getInput(ControlIndicator)
const Label = getLabel(ControlIndicator, Input)

export default ({ label, disabled, className, ...props }: RadioButtonProps) => (
  <Label disabled={disabled} className={className}>
    {label}
    <Input disabled={disabled} type="radio" {...props} />
    <ControlIndicator />
  </Label>
)
