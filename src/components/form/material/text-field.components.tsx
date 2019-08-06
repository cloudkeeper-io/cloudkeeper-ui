import React from 'react'
import { FieldRenderProps } from 'react-final-form'
import Field from '@material-ui/core/TextField'

export const TextField = (props: FieldRenderProps<any, any>) => {
  const { input: { name, onChange, value, ...restInput }, meta, ...rest } = props
  const showError = ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) && meta.touched

  return (
    <Field
      {...rest}
      name={name}
      helperText={showError ? meta.error || meta.submitError : undefined}
      error={showError}
      inputProps={restInput}
      onChange={onChange}
      value={value}
    />
  )
}
