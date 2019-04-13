import React from 'react'
import styled from 'styled-components/macro'
import { Field as FormField } from 'react-final-form'

import Checkbox from '../controls/checkbox.component'
import Error from './error-message.components'

const ErrorMessage = styled(Error)`
  font-size: 12px;
  line-height: 12px;
  margin: 5px 0 0 5px;
  color: #ff1744;
`

interface FieldProps {
  name: string
  type?: string
  label?: string
  placeholder?: string
  className?: string
  autoComplete?: string
}

export default ({ name, label, type = 'checkbox', ...props }: FieldProps) => (
  <FormField name={name} type="checkbox">
    {({ input, meta }) =>
      (
        <>
          <Checkbox label={label} checked={input.value} {...input} type={type} {...props} />
          {meta.error && meta.touched && <ErrorMessage>{meta.error}</ErrorMessage>}
        </>
      )}
  </FormField>
)
