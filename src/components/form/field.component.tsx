import React from 'react'
import styled from 'styled-components/macro'
import { Field as FormField } from 'react-final-form'

import Error from './error-message.component'
import Input from './input.component'

const InputWrapper = styled.div`
  width: 100%;
  min-height: 90px;
`
const ErrorMessage = styled(Error)`
  font-size: 12px;
  line-height: 12px;
  margin: 0 0 0 5px;
  color: ${(p) => p.theme.palette.error.main}
`

interface FieldProps {
  name: string
  type?: string
  label?: string
  placeholder?: string
  className?: string
  autoComplete?: string
  component?: any,
  icon?: string,
}

const Field = ({ name, label, placeholder, type = 'text', className, component, ...props }: FieldProps) => {
  const InputComponent = component || Input
  return (
    <FormField name={name}>
      {({ input, meta }) => (
        <InputWrapper className={className}>
          {label && <div>{label}</div>}
          <InputComponent key={name} {...input} type={type} placeholder={placeholder} {...props} />
          {meta.error && meta.touched && <ErrorMessage>{meta.error}</ErrorMessage>}
        </InputWrapper>
      )}
    </FormField>
  )
}

export default Field

export const SmallField = styled(Field)`
  height: 42px;
  min-height: 42px;
  ${Input} {
    height: 37px;
    padding: 0 8px;
    font-size: 12px;
  }
`
