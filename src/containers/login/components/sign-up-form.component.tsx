import React, { memo, useState } from 'react'

import { Form } from 'react-final-form'

import CheckboxField from '../../../components/form/checkbox-field.component'
import Field from '../../../components/form/field.components'
import { FormContent, ServerError, StyledForm, SubmitButton } from './login-components.styles'

interface Values {
  email: string
  password: string
  repeatPassword: string
  subscribedToEmails: boolean
}

interface RegisterProps {
  signUp: (email: string, password: string, subscribedToEmails: boolean) => any
}

export default memo(({ signUp }: RegisterProps) => {
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)

  const onSignUp = async (values: Values) => {
    if (loading) {
      return
    }

    setLoading(true)
    setServerError('')

    try {
      await signUp(values.email, values.password, values.subscribedToEmails)
    } catch (error) {
      setServerError(error.message || 'Server error')
      setLoading(false)
    }
  }

  const validate = (values: Values) => {
    const errors = {} as Values
    if (!values.email) {
      errors.email = 'Email is Required'
    }
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z0-9.-]+$/i.test(values.email)) {
      errors.email = 'Should be a valid email'
    }
    if (!values.password) {
      errors.password = 'Password is required'
    }
    if (!values.repeatPassword) {
      errors.repeatPassword = 'Repeat of password is required'
    }
    if (values.password !== values.repeatPassword) {
      errors.repeatPassword = 'Passwords should match'
    }
    return errors
  }

  return (
    <Form onSubmit={v => onSignUp(v as Values)} validate={v => validate(v as Values)}>
      {({ handleSubmit, pristine, invalid }) => (
        <StyledForm onSubmit={handleSubmit}>
          <FormContent>
            <Field name="email" placeholder="Email Address" autoComplete="email" />
            <Field name="password" placeholder="Password" autoComplete="password" type="password" />
            <Field name="repeatPassword" placeholder="Repeat Password" autoComplete="password" type="password" />
            <CheckboxField
              name="subscribedToEmails"
              label="Subscribe to get occasional emails about cloudkeeper updates"
            />
            <ServerError>{serverError}</ServerError>
            <SubmitButton type="submit" disabled={pristine || invalid} loading={loading}>Sign Up</SubmitButton>
          </FormContent>
        </StyledForm>
      )}
    </Form>
  )
})
