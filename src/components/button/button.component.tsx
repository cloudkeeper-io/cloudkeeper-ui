/* eslint-disable max-len */
import styled, { css } from 'styled-components/macro'
import { tint } from 'polished'

import Icon from '../icon.component'

export default styled.button<{ loading?: boolean, background?: string, color?: string }>`
  cursor: pointer;
  width: 200px;
  height: 50px;
  position: relative;
  top: 2px;
  left: 2px;
  background: ${p => (p.disabled ? p.theme.buttons.primary.disabled : p.background || p.theme.buttons.primary.background)};
  box-sizing: border-box;
  border-radius: ${p => p.theme.buttons.borderRadius};
  border: none;
  color: ${p => (p.disabled ? p.theme.buttons.primary.disabledText : p.color || p.theme.buttons.primary.color)};
  font-weight: 500;
  font-size: 16px;
  clip-path: ${p => p.theme.buttons.clipPath};
  transition: 0.5s background;
  ${Icon} {
    color: ${p => (p.disabled ? p.theme.buttons.primary.disabledText : p.color || p.theme.buttons.primary.color)};
  }
  &:focus {
   outline: none;
  }
  &:hover {
   background:  ${p => (p.disabled ? p.theme.buttons.primary.disabled : tint(0.2, p.background || p.theme.buttons.primary.background))};
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
      min-width: 24px;
      min-height: 24px;
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
