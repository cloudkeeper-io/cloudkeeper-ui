import React from 'react'
import styled from 'styled-components/macro'
import ReactSelect from 'react-select'
import { Field } from 'react-final-form'
import find from 'lodash/find'

import Error from './error-message.components'

const ErrorMessage = styled(Error)`
  margin-top: 5px;
`

interface Option {
  label: string
  value: string
}

interface SelectInputProps {
  name: string
  options: Option []
  placeholder?: string
  className?: string
}

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

const SelectInput = ({ name, options, className, placeholder }: SelectInputProps) => (
  <Field
    name={name}
    parse={option => option && option.value}
    format={value => find(options, o => o.value === value)}
  >
    {({ input, meta }) => (
      <SelectWrapper className={className}>
        <ReactSelect
          {...input}
          classNamePrefix="react-select"
          options={options}
          placeholder={placeholder}
          onChange={input.onChange as any}
        />
        {meta.error && meta.touched && <ErrorMessage>{meta.error}</ErrorMessage>}
      </SelectWrapper>
    )}
  </Field>
)

export default styled(SelectInput)``
