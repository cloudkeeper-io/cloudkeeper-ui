import * as React from 'react'
import styled from 'styled-components'
import { Field as FormField } from 'react-final-form'

const StyledInput = styled.input`
  background: transparent !important;
  width: 100%;
  height: 52px;
  mix-blend-mode: normal;
  box-sizing: border-box;
  border: solid ${p => p.theme.input.border};
  border-width: 0 0 1px 0;
  color: ${p => p.theme.input.color};
  font-weight: 500;
  line-height: 20px;
  font-size: 16px;
  padding: 0 32px;
  &:focus {
   outline: none;
  }
  &:-webkit-autofill,
  &:-webkit-autofill:hover, 
  &:-webkit-autofill:focus, 
  &:-webkit-autofill:active  {
    -webkit-box-shadow: 0 0 0 30px ${p => p.theme.input.background} inset !important;
    -webkit-text-fill-color: ${p => p.theme.input.color} !important;
  }
`
const InputWrapper = styled.div`
  width: 100%;
  margin-bottom: 10px;
  min-height: 77px;
`
const ErrorMessage = styled.div`
  font-size: 12px;
  line-height: 12px;
  margin: 5px 0 0 5px;
  color: #ff1744;
  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
`

interface FieldProps {
  name: string
  type?: string
  label?: string
  placeholder?: string
  className?: string
  autoComplete?: string
}

export default ({ name, label, placeholder, type = 'text', className, ...props }: FieldProps) => (
  <FormField name={name} className={className}>
    {({ input, meta }) => (
      <InputWrapper>
        {label && <div>{label}</div>}
        <StyledInput {...input} type={type} placeholder={placeholder} {...props} />
        {meta.error && meta.touched && <ErrorMessage>{meta.error}</ErrorMessage>}
      </InputWrapper>
    )}
  </FormField>
)
