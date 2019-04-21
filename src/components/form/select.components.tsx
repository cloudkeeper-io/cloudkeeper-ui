import React from 'react'
import styled from 'styled-components/macro'
import { Props } from 'react-select/lib/Select'
import { Field } from 'react-final-form'
import find from 'lodash/find'

import Error from './error-message.components'
import Select from '../controls/select.components'

const ErrorMessage = styled(Error)`
  margin-top: 5px;
`

interface Option {
  label: string
  value: string
}

interface SelectInputProps extends Props{
  name: string
  options: Option []
  placeholder?: string
  className?: string
}


const SelectInput = ({ name, options, className, placeholder }: SelectInputProps) => (
  <Field
    name={name}
    parse={option => option && option.value}
    format={value => find(options, o => o.value === value)}
  >
    {({ input, meta }) => (
      <Select className={className} {...input} placeholder={placeholder}>
        {meta.error && meta.touched && <ErrorMessage>{meta.error}</ErrorMessage>}
      </Select>
    )}
  </Field>
)

export default styled(SelectInput)``
