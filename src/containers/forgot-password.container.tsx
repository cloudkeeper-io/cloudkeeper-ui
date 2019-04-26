import React, { useCallback, useContext, useState } from 'react'
import styled from 'styled-components/macro'
import { Form } from 'react-final-form'
import { toast } from 'react-toastify'

import Card from '../components/card.component'
import Field from '../components/form/field.components'
import { FormContent } from './login/components/login-components.styles'
import ServerError from '../components/form/error-message.components'
import Button from '../components/button/button.component'
import { Header } from '../components/typography.component'
import { UserContext } from '../contexts'

const Wrapper = styled.div<{ minHeight?: string }>`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  align-items: center;
  justify-content: flex-start;
`
const Content = styled(Card)`
  padding: 20px;
  width: 400px;
  max-width: calc(100vw - 40px);
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
      <Content>
        <Header>
          Reset your password
        </Header>
        <Form onSubmit={v => onReset(v as Values)} validate={v => validate(v as Values)}>
          {({ handleSubmit, pristine, invalid }) => (
            <form onSubmit={handleSubmit}>
              <FormContent>
                <Field name="email" placeholder="Email Address" autoComplete="email" />
                <ServerError>{error}</ServerError>
                <Button type="submit" disabled={pristine || invalid} loading={loading}>Reset Password</Button>
              </FormContent>
            </form>
          )}
        </Form>
      </Content>
    </Wrapper>
  )
}
