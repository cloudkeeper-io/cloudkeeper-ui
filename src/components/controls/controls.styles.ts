import { darken, opacify } from 'polished'
import styled from 'styled-components/macro'

interface LabelProps {
  disabled?: boolean
}

export const getLabel = (ControlIndicator: any, Input: any) => styled.label<LabelProps>`
  display: block;
  position: relative;
  padding-left: 30px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  &:hover {
    ${ControlIndicator} {
      background: ${(p) => opacify(0.15, p.theme.controls.color)};
    }
    ${Input}:not([disabled]):checked {
      ~ ${ControlIndicator} {
        background: ${(p) => darken(0.2, p.theme.controls.activeColor)};
      }
    }
  }
`

export const getInput = (ControlIndicator: any) => styled.input`
  position: absolute;
  z-index: -1;
  opacity: 0;
  &:focus {
    ~ ${ControlIndicator} {
      background: ${(p) => p.theme.controls.color};
   }
  }
  &:checked {
   ~ ${ControlIndicator} {
      background: ${(p) => p.theme.controls.activeColor};
      &:after {
        display: block;
      }
   }
  }
  &:checked:focus {
   ~ ${ControlIndicator} {
      background: ${(p) => p.theme.controls.activeColor};
   }
  }
  &:disabled {
   ~ ${ControlIndicator} {
      background: #e6e6e6;
      opacity: 0.6;
      pointer-events: none;
      &:after {
        background: #7b7b7b;
      }
    }
  }
`
