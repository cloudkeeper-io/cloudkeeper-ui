import React from 'react'
import styled from 'styled-components/macro'
import { Field as FormField } from 'react-final-form'
import { Checkbox, FormControlLabel } from '@material-ui/core'
import { CheckboxProps } from '@material-ui/core/Checkbox'

import Error from './error-message.component'

const StyledFormControlLabel = styled(FormControlLabel)`
  user-select: none;
`
const ErrorMessage = styled(Error)`
  font-size: 12px;
  line-height: 12px;
  margin: 5px 0 0 5px;
  color: #ff1744;
`

interface FieldProps extends CheckboxProps {
  name: string
  label?: string
  className?: string
}

export default ({ name, label, ...props }: FieldProps) => (
  <FormField name={name} type="checkbox">
    {({ input, meta }) => (
      <>
        <StyledFormControlLabel
          control={
            <Checkbox checked={input.value} {...input as CheckboxProps} {...props} />
          }
          label={label}
        />
        {meta.error && meta.touched && <ErrorMessage>{meta.error}</ErrorMessage>}
      </>
    )}
  </FormField>
)
