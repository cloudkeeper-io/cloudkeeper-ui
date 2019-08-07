import React from 'react'
import { FieldRenderProps } from 'react-final-form'
import Field from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import styled from 'styled-components/macro'

interface IconTextFieldProps extends FieldRenderProps<any, any> {
    icon: JSX.Element,
}

const Wrapper = styled.div`
  display: flex;
  flex-direction:column;
  width: 100%;
  height: 40px;
`

export const IconTextField = (props: IconTextFieldProps) => {
  const { input: { name, onChange, value, ...restInput }, icon, meta, ...rest } = props
  const showError = ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) && meta.touched
  return (
    <Wrapper>
      <Field
        {...rest}
        name={name}
        helperText={showError ? meta.error || meta.submitError : undefined}
        error={showError}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {icon}
            </InputAdornment>
          ),
          ...restInput,
        }}
        onChange={onChange}
        value={value}
      />
    </Wrapper>
  )
}
