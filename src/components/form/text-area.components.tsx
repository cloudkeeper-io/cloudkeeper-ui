import React from 'react'
import styled from 'styled-components/macro'
import { Field as FormField } from 'react-final-form'

import ErrorMessage from './error-message.components'

const StyledInput = styled.textarea`
  background: transparent !important;
  width: 100%;
  height: 80px;
  mix-blend-mode: normal;
  box-sizing: border-box;
  border: 2px solid ${p => p.theme.input.border};
  box-shadow: 0 0 4px ${p => p.theme.card.shadow};
  color: ${p => p.theme.input.color};
  font-weight: 500;
  line-height: 18px;
  font-size: 12px;
  padding: 5px 10px;
  resize: none;
  &:focus {
   outline: none;
  }
  &:-webkit-autofill,
  &:-webkit-autofill:hover, 
  &:-webkit-autofill:focus, 
  &:-webkit-autofill:active  {
    -webkit-box-shadow: 0 0 0 30px ${p => p.theme.input.background} inset !important;
    -webkit-text-fill-color: ${p => p.theme.input.color} !important;
    transition: background-color 999999999s ease-in-out 0s;
  }
  ::placeholder {
    color: ${p => p.theme.input.placeholder};
  }
`
const InputWrapper = styled.div`
  width: 100%;
  margin-bottom: 10px;
  min-height: 104px;
`

interface FieldProps {
  name: string
  type?: string
  label?: string
  placeholder?: string
  className?: string
  autoComplete?: string
}

export default ({ name, label, placeholder, className, ...props }: FieldProps) => (
  <FormField name={name} className={className}>
    {({ input, meta }) => (
      <InputWrapper>
        {label && <div>{label}</div>}
        <StyledInput {...input} placeholder={placeholder} {...props} />
        {meta.error && meta.touched && <ErrorMessage>{meta.error}</ErrorMessage>}
      </InputWrapper>
    )}
  </FormField>
)
