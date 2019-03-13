import * as React from 'react'
import { Form } from 'react-final-form'
import styled from 'styled-components/macro'

import Field from '../components/field.components'
import Button from '../components/button.component'
import Card from '../components/card.component'
import Tabs from '../components/tabs.component'
import Stars from '../components/stars.component'
import { User } from '../models'
import treeline from '../components/treeline.svg'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  align-items: center;
  height: 100%;
  min-height: 100vh;
  margin-top: -60px;
  padding: 0 20px;
  background: linear-gradient(180deg, #0E0C1F -0.31%, #112531 100%);
  background-size: contain;
`
const MainCard = styled(Card)`
  width: 450px;
  min-height: 300px;
  ${Card.Content} {
    display: block;
  }
`
const StyledForm = styled.form`
  width: 100%;
  min-height: 300px;
  clip-path: ${p => p.theme.clipPath};
`
const SubmitButton = styled(Button)`
  ${Button.Content} {
    background: ${p => p.theme.buttons.login.background};
    &:disabled {
      background: ${p => p.theme.buttons.primary.disabled};
    }
    &:active,
    &:hover {
      background: ${p => p.theme.buttons.primary.active};
    }
  }
`
const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: calc(100% - 50px);
  padding: 25px;
  justify-content: space-around;
`
const ServerError = styled.div`
  color: #ff1744;
  font-size: 12px;
  text-align: center;
  margin-bottom: 10px;
  height: 20px;
`
const Threes = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background: url("${treeline}") center bottom no-repeat;
  background-size: contain;
  pointer-events: none;
`

interface LoginProps {
  user: User
}

interface Values {
  email: string
  password: string
}

export default class Login extends React.PureComponent<LoginProps> {
  public state = {
    serverError: null,
    selectedTab: 0,
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
    const { serverError, selectedTab } = this.state

    return (
      <Wrapper>
        <Stars />
        <Threes />
        <MainCard>
          <Tabs
            tabs={['Sing In', 'Sing Up']}
            selectedIndex={selectedTab}
            onChange={i => this.setState({ selectedTab: i })}
          />
          {selectedTab === 0 && (
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
          ) as any}
          {selectedTab === 1 && (
            <Form onSubmit={v => this.onLogin(v as Values)} validate={v => this.validate(v as Values)}>
              {({ handleSubmit, pristine, invalid }) => (
                <StyledForm onSubmit={handleSubmit}>
                  <FormContent>
                    <Field name="email" placeholder="Email Address" autoComplete="email" />
                    <Field name="password" placeholder="Password" autoComplete="password" type="password" />
                    <Field name="password" placeholder="Password" autoComplete="password" type="password" />
                    <ServerError>{serverError}</ServerError>
                    <SubmitButton type="submit" disabled={pristine || invalid} loading={loading!}>Log in</SubmitButton>
                  </FormContent>
                </StyledForm>
              )}
            </Form>
          ) as any}
        </MainCard>
      </Wrapper>
    )
  }
}
