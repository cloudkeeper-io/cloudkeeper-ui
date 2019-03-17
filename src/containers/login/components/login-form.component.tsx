import React, { PureComponent } from 'react'

import { Form } from 'react-final-form'
import Field from '../../../components/form/field.components'
import { User } from '../../../models'
import { FormContent, ServerError, StyledForm, SubmitButton } from './login-components.styles'

interface Values {
  email: string
  password: string
}

interface LoginProps {
  user: User
}

export default class extends PureComponent<LoginProps> {
  public state = {
    serverError: null,
  }

  public onLogin = async (values: Values) => {
    const { user } = this.props
    if (user.loading) {
      return
    }

    this.setState({ serverError: null })

    try {
      await user.login(values.email, values.password)
    } catch (error) {
      this.setState({ serverError: error.message || 'Server error' })
    }
  }

  public validate = (values: Values) => {
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

  render() {
    const { user: { loading } } = this.props
    const { serverError } = this.state
    return (
      <Form onSubmit={v => this.onLogin(v as Values)} validate={v => this.validate(v as Values)}>
        {({ handleSubmit, pristine, invalid }) => (
          <StyledForm onSubmit={handleSubmit}>
            <FormContent>
              <Field name="email" placeholder="Email Address" autoComplete="email" />
              <Field name="password" placeholder="Password" autoComplete="password" type="password" />
              <ServerError>{serverError}</ServerError>
              <SubmitButton type="submit" disabled={pristine || invalid} loading={loading!}>Log in</SubmitButton>
            </FormContent>
          </StyledForm>
        )}
      </Form>
    )
  }
}
