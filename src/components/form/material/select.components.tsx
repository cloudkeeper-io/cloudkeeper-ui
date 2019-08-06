import React from 'react'
import styled from 'styled-components/macro'
import MaterialSelect from '@material-ui/core/Select'
import FormControl, { FormControlProps } from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'

import { FieldRenderProps } from 'react-final-form'


interface SelectProps extends FieldRenderProps<any, HTMLElement> {
  label: string,
  inputElement: JSX.Element,
  formControlProps: FormControlProps,
  disabled: boolean,
}

const StyledFormControl = styled(FormControl)`
  width: 100%;
  margin: 20px 0 10px 0;
  
  fieldset {
   border-style: ${p => (p.disabled ? 'dashed' : '')}
  }
  legend {
    width: 0 !important;
  }
`
const StyledLabel = styled(InputLabel)`
  margin: -16px 0 0 10px;
`


export const Select = (props: SelectProps) => {
  const {
    input: { name, value, onChange, ...restInput },
    meta,
    label,
    disabled,
    inputElement,
    formControlProps,
    ...rest
  } = props
  const showError = ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) && meta.touched

  return (
    <StyledFormControl {...formControlProps} error={showError} disabled={disabled}>
      <StyledLabel shrink htmlFor={name} disabled={disabled}>
        {label}
      </StyledLabel>

      <MaterialSelect
        {...rest}
        name={name}
        onChange={onChange}
        inputProps={restInput}
        value={value}
        input={inputElement}
        displayEmpty
        disabled={disabled}
      />

      {showError && <FormHelperText>{meta.error || meta.submitError}</FormHelperText>}
    </StyledFormControl>
  )
}
