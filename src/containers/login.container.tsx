import * as React from 'react'
import { Form } from 'react-final-form'
import styled from 'styled-components'

import Field from '../components/field.components'
import Button from '../components/button.component'
import Card from '../components/card.component'
import { User } from '../models'

interface LoginProps {
  user: User
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 60px);
  background: ${p => p.theme.colors.background};
`
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 25px;
  clip-path: ${p => p.theme.clipPath};
`

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  max-width: calc(100vw - 40px);
  padding: 0 10px;
  justify-content: space-around;
`
const ServerError = styled.div`
  color: #ff1744;
  font-size: 12px;
  text-align: center;
  margin-bottom: 10px;
  height: 20px;
`

interface LoginProps {
  user: User
}

interface Values {
  email: string
  password: string
}

export default class Login extends React.Component<LoginProps> {
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

  public render() {
    const { user: { loading } } = this.props
    const { serverError } = this.state

    return (
      <Wrapper>
        <Card background="transparent">
          <Form onSubmit={v => this.onLogin(v as Values)} validate={v => this.validate(v as Values)}>
            {({ handleSubmit, pristine, invalid }) => (
              <StyledForm onSubmit={handleSubmit}>
                <FormContent>
                  <Field name="email" placeholder="Email Address" autoComplete="email" />
                  <Field name="password" placeholder="Password" autoComplete="password" type="password" />
                  <ServerError>{serverError}</ServerError>
                  <Button disabled={pristine || invalid} loading={loading!}>Log in</Button>
                </FormContent>
              </StyledForm>
            )}
          </Form>
        </Card>
      </Wrapper>
    )
  }
}
