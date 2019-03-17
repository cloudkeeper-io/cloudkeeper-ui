import React from 'react'
import styled, { css } from 'styled-components/macro'

import Icon from '../icon.component'

const Wrapper = styled.div<{ width: string, height: string}>`
  position: relative;
  width: ${p => p.width};
  height: ${p => p.height};
`
const Border = styled.div<{ disabled?: boolean }>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  padding: 2px;
  background: ${p => (p.disabled ? p.theme.buttons.primary.borderDisabled : p.theme.buttons.primary.borderColor)};
  clip-path: ${p => p.theme.buttons.borderClipPath};
`
const Button = styled.button<{ loading?: boolean }>`
  cursor: pointer;
  width: calc(100%);
  height: calc(100% + 1px);
  position: relative;
  top: 1.5px;
  left: 2px;
  background: ${p => (p.disabled ? p.theme.buttons.primary.disabled : p.theme.buttons.primary.background)};
  box-sizing: border-box;
  border-radius: ${p => p.theme.buttons.borderRadius};
  border: none;
  color: ${p => (p.disabled ? p.theme.buttons.primary.disabledText : p.theme.buttons.primary.color)};
  font-weight: 500;
  font-size: 16px;
  clip-path: ${p => p.theme.buttons.clipPath};
  transition: 0.5s background;
  ${Icon.Wrapper} {
    color: ${p => (p.disabled ? p.theme.buttons.primary.disabledText : p.theme.buttons.primary.color)};
  }
  &:focus {
   outline: none;
  }
  &:hover {
   background:  ${p => (p.disabled ? p.theme.buttons.primary.disabled : p.theme.buttons.primary.active)};
  }
  &::-moz-focus-inner {
    border: 0;
  }
   ${props => (props.loading ? css`
    position: relative;
    color: transparent;
    transition: none;
    &:before,
    &:after {
      position: absolute;
      content: '';
      top: 50%;
      left: 50%;
      margin: -12px 0 0 -12px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 4px solid rgba(0,0,0,.15);
    }
    &:after {
      border: 4px solid;
      border-color: #fff transparent transparent;
      animation: button-spin .6s linear;
      animation-iteration-count: infinite;
    }
    @keyframes button-spin {
      from {
        transform:rotate(0)
      }
      to {
        transform:rotate(360deg)
      }
    }
  ` : '')}
`

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: JSX.Element | string
  className?: string,
  width?: string,
  height?: string,
  loading?: boolean
}

const ButtonComponent = (
  { children, className, width = '200px', height = '50px', disabled, ...props }: ButtonProps,
) => (
  <Wrapper className={className} width={width} height={height}>
    <Border disabled={disabled} />
    <Button {...props} disabled={disabled}>{children}</Button>
  </Wrapper>
)

ButtonComponent.Border = Border
ButtonComponent.Content = Button

export default ButtonComponent
