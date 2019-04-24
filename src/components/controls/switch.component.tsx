import React from 'react'
import styled from 'styled-components/macro'
import { lighten } from 'polished'

const Label = styled.label<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  color: ${props => (props.disabled ? 'grey' : 'black')};
`

const ControlIndicator = styled.div<{ disabled: boolean }>`
  position: relative;
  display: block;
  font-weight: 500;
  text-align: left;
  margin: 0;
  padding: 16px 0 16px 44px;
  &:after,
  &:before {
    content: "";
    position: absolute;
    margin: 0;
    outline: 0;
    top: 50%;
    -ms-transform: translate(0, -50%);
    -webkit-transform: translate(0, -50%);
    transform: translate(0, -50%);
    -webkit-transition: all 0.3s ease;
    transition: all 0.3s ease;
  }

  &:before {
    left: 1px;
    width: 34px;
    height: 14px;
    background-color: #9E9E9E;
    border-radius: 8px;
  }

  &:after {
    left: 0;
    width: 20px;
    height: 20px;
    background-color: ${p => (p.disabled ? 'grey' : '#FAFAFA')};
    border-radius: 50%;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.14), 0 2px 2px 0 rgba(0, 0, 0, 0.098), 0 1px 5px 0 rgba(0, 0, 0, 0.084);
  }
`

const Input = styled.input`
  display: none;

  &:checked + ${ControlIndicator}:after {
    background-color: ${p => p.theme.colors.primary};
    -ms-transform: translate(80%, -50%);
    -webkit-transform: translate(80%, -50%);
    transform: translate(80%, -50%);
  }

  &:checked + ${ControlIndicator}:before {
    background-color: ${p => lighten(0.35, p.theme.colors.primary)};
  }
`
const Wrapper = styled.div``

interface SwitchProps {
  label?: any
  className?: string
  name?: string
  disabled?: boolean
  defaultChecked?: boolean
  checked?: boolean
  onChange?: (event: any) => void
}

export default ({ label = '', disabled = false, className, ...props }: SwitchProps) => (
  <Wrapper>
    <Label className={className} disabled={disabled}>
      <Input type="checkbox" {...props} disabled={disabled} />
      <ControlIndicator disabled={disabled} />
      {label}
    </Label>
  </Wrapper>
)
