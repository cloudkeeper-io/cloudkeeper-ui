import React, { useState, memo, useContext } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import { Form } from 'react-final-form'
import Field from '../../../components/form/field.components'
import Button from '../../../components/button/button.component'
import ServerError from '../../../components/form/error-message.components'
import { FormContent, StyledForm } from './login-components.styles'
import { UserContext } from '../../../contexts'

interface Values {
  email: string
  password: string
}

interface LoginProps extends RouteComponentProps {}

export default memo(withRouter(({ history }: LoginProps) => {
  const { signIn } = useContext(UserContext)
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
    return errors
  }

  return (
    <Form onSubmit={v => onLogin(v as Values)} validate={v => validate(v as Values)}>
      {({ handleSubmit, pristine, invalid }) => (
        <StyledForm onSubmit={handleSubmit}>
          <FormContent>
            <Field name="email" placeholder="Email Address" autoComplete="email" />
            <Field name="password" placeholder="Password" autoComplete="password" type="password" />
            <ServerError>{serverError}</ServerError>
            <Button type="submit" disabled={pristine || invalid} loading={loading}>Log in</Button>
          </FormContent>
        </StyledForm>
      )}
    </Form>
  )
}))
