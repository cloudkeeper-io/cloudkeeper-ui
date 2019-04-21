import styled from 'styled-components'
import ReactSelect from 'react-select'
import { Props } from 'react-select/lib/Select'
import React from 'react'

export const SelectWrapper = styled.div`
  height: 50px;
  .react-select__control {
    background: transparent;
    border-color: ${p => p.theme.colors.borderColor} !important;
    border-radius: 0;
    border-width: 2px;
      box-shadow: 0 0 4px ${p => p.theme.card.shadow} !important;
  }
  .react-select__single-value, .react-select__input, .react-select__menu-notice {
    color: ${p => p.theme.select.color} !important;
  }
  .react-select__menu-list {
    background: ${p => p.theme.select.listBackground};
    border: 1px solid ${p => p.theme.colors.borderColor};
  }
  .react-select__option--is-focused {
    background: ${p => p.theme.select.focusedListBackground};
  }
  .react-select__option--is-selected {
    background: ${p => p.theme.select.selectedListBackground};
  }
  .react-select__placeholder {
    color: ${p => p.theme.input.placeholder};
  }
`

interface SelectProps extends Props {
  className?: string,
  onChange?: any
}

export default ({ className, options, children, onChange, ...props }: SelectProps) => (
  <SelectWrapper className={className}>
    <ReactSelect
      {...props}
      classNamePrefix="react-select"
      options={options}
      onChange={onChange}
    />
    {children}
  </SelectWrapper>
)
