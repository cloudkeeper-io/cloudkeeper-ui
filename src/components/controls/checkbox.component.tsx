import React from 'react'
import styled from 'styled-components/macro'

import { getInput, getLabel } from './controls.styles'

const ControlIndicator = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  min-height: 15px;
  min-width: 15px;
  border: 1px solid ${(p) => p.theme.controls.color};
  border-radius: 2px;
  transform: translateY(-50%);
  transition: all 0.3s;
  &:after {
    box-sizing: initial;
    content: '';
    position: absolute;
    display: none;
    left: 5px;
    top: 2px;
    width: 3px;
    height: 7px;
    border: solid ${(p) => p.theme.controls.secondaryActiveColor};
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`

interface CheckboxProps {
  label?: any
  className?: string
  name?: string
  type?: string
  disabled?: boolean
  defaultChecked?: boolean
  checked?: boolean
  style?: object
  onChange?: (e?: any) => void
}

const Input = getInput(ControlIndicator)
const Label = getLabel(ControlIndicator, Input)

export default ({ label, disabled, className, ...props }: CheckboxProps) => (
  <Label disabled={disabled} className={className}>
    {label}
    <Input disabled={disabled} type="checkbox" {...props} />
    <ControlIndicator />
  </Label>
)
