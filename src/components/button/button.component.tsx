import React, { useContext } from 'react'
import styled, { css } from 'styled-components/macro'
import { tint } from 'polished'

import Icon from '../icon.component'
import { ThemeContext } from '../../contexts'

const Wrapper = styled.div<{ width: string, height: string }>`
  position: relative;
  width: ${p => p.width};
  height: ${p => p.height};
`
const Button = styled.button<{ loading?: boolean, background?: string, color?: string }>`
  cursor: pointer;
  width: calc(100%);
  height: 100%;
  position: relative;
  top: 2px;
  left: 2px;
  background: ${p => (p.disabled ? p.theme.buttons.primary.disabled : p.background)};
  box-sizing: border-box;
  border-radius: ${p => p.theme.buttons.borderRadius};
  border: none;
  color: ${p => (p.disabled ? p.theme.buttons.primary.disabledText : p.color)};
  font-weight: 500;
  font-size: 16px;
  clip-path: ${p => p.theme.buttons.clipPath};
  transition: 0.5s background;
  ${Icon} {
    color: ${p => (p.disabled ? p.theme.buttons.primary.disabledText : p.color)};
  }
  &:focus {
   outline: none;
  }
  &:hover {
   background:  ${p => (p.disabled ? p.theme.buttons.primary.disabled : tint(0.2, p.background!))};
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
  background?: string
  color?: string
  showBorder?: boolean
}

const ButtonComponent = ({ ...buttonProps }: ButtonProps) => {
  const { theme } = useContext(ThemeContext)
  const {
    children,
    className,
    width = '200px',
    height = '50px',
    disabled,
    background = buttonProps.background || theme.buttons.primary.background,
    color = buttonProps.color || theme.buttons.primary.color,
    ...props
  } = buttonProps

  return (
    <Wrapper className={className} width={width} height={height}>
      <Button {...props} disabled={disabled} background={background} color={color}>{children}</Button>
    </Wrapper>
  )
}

ButtonComponent.Content = Button

export default ButtonComponent
