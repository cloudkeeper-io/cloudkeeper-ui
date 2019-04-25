import React, { memo, useContext, useState } from 'react'
import { Form } from 'react-final-form'
import { History } from 'history'

import CheckboxField from '../../../components/form/checkbox-field.component'
import Field from '../../../components/form/field.components'
import Button from '../../../components/button/button.component'
import ServerError from '../../../components/form/error-message.components'
import { FormContent, StyledForm } from './login-components.styles'
import { UserContext } from '../../../contexts'

interface Values {
  email: string
  password: string
  repeatPassword: string
  subscribedToEmails: boolean
}

interface RegisterProps {
  history: History
}

export default memo(({ history }: RegisterProps) => {
  const { signUp } = useContext(UserContext)
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
      history.push('/')
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
            <Button type="submit" disabled={pristine || invalid} loading={loading}>Sign Up</Button>
          </FormContent>
        </StyledForm>
      )}
    </Form>
  )
})
