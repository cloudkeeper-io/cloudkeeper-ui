import React, { useCallback, useContext, useState } from 'react'
import styled from 'styled-components/macro'
import { Form } from 'react-final-form'
import first from 'lodash/first'
import get from 'lodash/get'

import ServerError from '../../../components/form/error-message.components'
import { SmallField } from '../../../components/form/field.components'
import Card from '../../../components/card.component'
import Button from '../../../components/button/button.component'
import { UserContext } from '../../../contexts'
import { Header as CommonHeader, Title } from '../../../components/typography.component'

const Wrapper = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  overflow: hidden;
  padding: 20px;
  margin: 20px 0;
`
const Header = styled(CommonHeader)`
  margin-bottom: 20px;
`
const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  padding: 15px 0;
  justify-content: space-around;
`

interface Values {
  password: string
  newPassword: string
  repeatPassword: string
}

const validate = (values: Values) => {
  const errors = {} as Values
  if (!values.password) {
    errors.password = 'Password is required'
  }
  if (!values.newPassword) {
    errors.newPassword = 'New Password is required'
  }
  if (!values.repeatPassword) {
    errors.repeatPassword = 'You should repeat your new password'
  } else if (values.repeatPassword !== values.newPassword) {
    errors.repeatPassword = 'Passwords don\'t match'
  }
  return errors
}

export default () => {
  const { user, updatePassword } = useContext(UserContext)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = useCallback(async (values: Values) => {
    const { password, newPassword } = values
    setLoading(true)
    setError('')
    try {
      await updatePassword(password, newPassword)
    } catch (e) {
      setError(e.message || 'Server Error.')
    } finally {
      setLoading(false)
    }
  }, [updatePassword])

  const providerId = get(first(user!.providerData), 'providerId')

  if (providerId === 'password') {
    return (
      <Wrapper>
        <Header>Security Settings</Header>
        <Title>Change your password</Title>

        <Form onSubmit={v => onSubmit(v as Values)} validate={v => validate(v as Values)}>
          {({ handleSubmit, pristine, invalid, form }) => (
            <form onSubmit={event => handleSubmit(event)!.then(form.reset)}>
              <FormContent>
                <SmallField name="password" placeholder="Password" type="password" autoComplete="password" />
                <SmallField name="newPassword" placeholder="New Password" autoComplete="password" type="password" />
                <SmallField
                  name="repeatPassword"
                  placeholder="Repeat New Password"
                  autoComplete="password"
                  type="password"
                />
                <ServerError>{error}</ServerError>
                <Button type="submit" disabled={pristine || invalid} loading={loading}>
                  Change Password
                </Button>
              </FormContent>
            </form>
          )}
        </Form>
      </Wrapper>
    )
  }

  return null
}
