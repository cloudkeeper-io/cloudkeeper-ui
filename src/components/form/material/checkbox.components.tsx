import React from 'react'
import styled from 'styled-components/macro'
import MaterialCheckbox from '@material-ui/core/Checkbox'
import { FieldRenderProps } from 'react-final-form'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const StyledFormControlLabel = styled(FormControlLabel)`
  user-select: none;
`

interface FormCheckboxProps extends FieldRenderProps<any, any>{
  label?: string
}

export const Checkbox = (props: FormCheckboxProps) => {
  const { label, input: { checked, name, onChange, ...restInput }, meta, ...rest } = props

  return (
    <>
      <StyledFormControlLabel
        control={(
          <MaterialCheckbox
            {...rest}
            name={name}
            inputProps={restInput}
            onChange={onChange}
            checked={checked}
            color="primary"
          />
        )}
        label={label}
      />

      {meta.error && meta.touched && <FormHelperText>{meta.error}</FormHelperText>}
    </>
  )
}
