import React, { PureComponent } from 'react'

import { Form } from 'react-final-form'
import Field from '../../../components/form/field.components'
import { User } from '../../../models'
import { FormContent, ServerError, StyledForm, SubmitButton } from './login-components.styles'


interface Values {
  email: string
  password: string
  repeatPassword: string
}

interface RegisterProps {
  user: User
}

export default class extends PureComponent<RegisterProps> {
  public state = {
    serverError: null,
  }

  public onSignUp = async (values: Values) => {
    const { user } = this.props
    if (user.loading) {
      return
    }

    this.setState({ serverError: null })

    try {
      await user.signUp(values.email, values.password)
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
    if (!values.repeatPassword) {
      errors.repeatPassword = 'Repeat of password is required'
    }
    if (values.password !== values.repeatPassword) {
      errors.repeatPassword = 'Passwords should match'
    }
    return errors
  }

  render() {
    const { user: { loading } } = this.props
    const { serverError } = this.state
    return (
      <Form onSubmit={v => this.onSignUp(v as Values)} validate={v => this.validate(v as Values)}>
        {({ handleSubmit, pristine, invalid }) => (
          <StyledForm onSubmit={handleSubmit}>
            <FormContent>
              <Field name="email" placeholder="Email Address" autoComplete="email" />
              <Field name="password" placeholder="Password" autoComplete="password" type="password" />
              <Field name="repeatPassword" placeholder="Repeat Password" autoComplete="password" type="password" />
              <ServerError>{serverError}</ServerError>
              <SubmitButton type="submit" disabled={pristine || invalid} loading={loading!}>Sign Up</SubmitButton>
            </FormContent>
          </StyledForm>
        )}
      </Form>
    )
  }
}
