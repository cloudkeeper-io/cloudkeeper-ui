import React, { useState, memo, useContext } from 'react'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'

import { Form } from 'react-final-form'
import Field from '../../../components/form/field.component'
import IconInput from '../../../components/form/icon-input.component'
import Button from '../../../components/button/button.component'
import ServerError from '../../../components/form/error-message.component'
import { FormContent, StyledForm } from '../login.styles'
import { UserContext } from '../../../contexts'
import { trackEvent } from '../../../utils/amplitude'

const ForgotPassword = styled(Link)`
  text-decoration: underline;
  color: ${(p) => p.theme.colors.primary};
  margin-bottom: 3px;
  margin-right: 3px;
  width: 100%;
  text-align: end;
`

interface Values {
  email: string
  password: string
}

export default memo(() => {
  const { signIn, demoLogin } = useContext(UserContext)
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)

  const onLogin = async (values: Values) => {
    if (loading) {
      return
    }

    setLoading(true)
    setServerError('')

    try {
      await signIn(values.email, values.password)
      trackEvent('User Logged In')
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
    return errors
  }

  return (
    <Form onSubmit={(v) => onLogin(v as Values)} validate={(v) => validate(v as Values)}>
      {({ handleSubmit, pristine, invalid }) => (
        <StyledForm onSubmit={handleSubmit}>
          <FormContent>
            <Field name="email" placeholder="Email Address" autoComplete="email" component={IconInput} icon="lock" />
            <Field
              name="password"
              placeholder="Password"
              autoComplete="password"
              type="password"
              component={IconInput}
              icon="mail"
            />
            <ForgotPassword to="/forgot-password">Forgot password?</ForgotPassword>
            <ServerError>{serverError}</ServerError>
            <Button type="submit" disabled={pristine || invalid} isLoading={loading}>Log in</Button>
            <Button type="button" onClick={demoLogin}>Demo Login</Button>
          </FormContent>
        </StyledForm>
      )}
    </Form>
  )
})
