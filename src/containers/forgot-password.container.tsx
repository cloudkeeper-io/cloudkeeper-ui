import React, { useCallback, useContext, useState } from 'react'
import styled from 'styled-components/macro'
import { Form } from 'react-final-form'
import { toast } from 'react-toastify'
import { Button, Grid } from '@material-ui/core'
import { Link } from 'react-router-dom'

import Card from '../components/card.component'
import Field from '../components/form/field.component'
import { ThemeSwitcher } from './login/login.styles'
import ServerError from '../components/form/error-message.component'
import { LoadingButton } from '../components/button/loading-button.component'
import { Header } from '../components/typography.component'
import { UserContext } from '../contexts'

const Wrapper = styled.div<{ minHeight?: string }>`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 0 20px;
  align-items: center;
  justify-content: center;
`
const Content = styled(Card)`
  padding: 20px;
  width: 400px;
  max-width: calc(100vw - 40px);
`
export const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 25px 15px 25px;
  justify-content: space-around;
`

interface Values {
  email: string
}

const validate = (values: Values) => {
  const errors = {} as Values
  if (!values.email) {
    errors.email = 'Email is required'
  }
  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z0-9.-]+$/i.test(values.email)) {
    errors.email = 'Should be a valid email'
  }
  return errors
}

export default () => {
  const { resetPassword } = useContext(UserContext)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onReset = useCallback(async (values: Values) => {
    const { email } = values
    setLoading(true)
    setError('')
    try {
      await resetPassword(email)
      toast('We sent to you instruction for password reset. Check your email.')
    } catch (e) {
      setError(e.message || 'Server Error.')
    } finally {
      setLoading(false)
    }
  }, [resetPassword])

  return (
    <Wrapper>
      <ThemeSwitcher />
      <Content>
        <Header>
          Reset your password
        </Header>
        <Form onSubmit={(v) => onReset(v as Values)} validate={(v) => validate(v as Values)}>
          {({ handleSubmit, pristine, invalid }) => (
            <form onSubmit={handleSubmit}>
              <FormContent>
                <Field name="email" placeholder="Email Address" autoComplete="email" />
                <ServerError>{error}</ServerError>
                <Grid container spacing={2} justify="flex-end" alignItems="center">
                  <Grid item>
                    <Button component={Link} to="/">Back to Login</Button>
                  </Grid>
                  <Grid item>
                    <LoadingButton
                      type="submit"
                      disabled={pristine || invalid}
                      color="primary"
                      variant="contained"
                      loading={loading}
                    >
                      Reset Password
                    </LoadingButton>
                  </Grid>
                </Grid>
              </FormContent>
            </form>
          )}
        </Form>
      </Content>
    </Wrapper>
  )
}
