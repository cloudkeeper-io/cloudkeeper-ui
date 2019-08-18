import React, { useCallback, useContext, useState } from 'react'
import styled from 'styled-components/macro'
import { Form, Field } from 'react-final-form'
import { toast } from 'react-toastify'
import first from 'lodash/first'
import get from 'lodash/get'
import { Lock, Edit2, Edit3 } from 'react-feather'
import ServerError from '../../../components/form/error-message.component'
import { IconTextField } from '../../../components/form/material/icon-text-field.components'
import Button from '../../../components/button/button.component'
import { UserContext } from '../../../contexts'
import { Header as CommonHeader, Title } from '../../../components/typography.component'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  overflow: hidden;
  padding: 20px;
  margin: 20px 0 0 0;
`
const Header = styled(CommonHeader)`
  margin-bottom: 20px;
`
const FormContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  width: 100%;
  padding-top: 15px;
  justify-content: space-around;
   @media(max-width: 800px) {
    flex-wrap: wrap;
  }
`
const ChangeButton = styled(Button)`
  width: 180px;
  height: 48px;
  font: inherit;
`

const Input = styled(IconTextField)`
  margin-bottom: 40px;
  .MuiInput-root {
    height: 48px;
    padding-left: 8px;
    background: ${(p) => p.theme.input.background};
  }
  .MuiInputAdornment-root {
    margin: 8px;
    color: ${(p) => p.theme.input.iconColor};
  }
  .MuiInput-formControl {
    margin-right: 10px;
    input {
      padding-left: 5px;
    }
    &:before {
      display: none;
    }
    &:after {
      display: none;
    }
  }
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
      toast('Your password has been changed')
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
        <Header>Security</Header>
        <Title>Change your password</Title>

        <Form onSubmit={(v) => onSubmit(v as Values)} validate={(v) => validate(v as Values)}>
          {({ handleSubmit, pristine, invalid, form }) => (
            <form onSubmit={(event) => handleSubmit(event)!.then(form.reset)}>
              <FormContent>
                <Field
                  name="password"
                  placeholder="Current password"
                  type="password"
                  autoComplete="password"
                  component={Input as any}
                  icon={<Lock size={20} />}
                />
                <Field
                  name="newPassword"
                  placeholder="New Password"
                  autoComplete="password"
                  type="password"
                  component={Input as any}
                  icon={<Edit2 size={20} />}
                />
                <Field
                  name="repeatPassword"
                  placeholder="Repeat New Password"
                  autoComplete="password"
                  type="password"
                  component={Input as any}
                  icon={<Edit3 size={20} />}
                />
              </FormContent>
              <ChangeButton type="submit" disabled={pristine || invalid} isLoading={loading}>
                Change password
              </ChangeButton>
              <ServerError>{error}</ServerError>
            </form>
          )}
        </Form>
      </Wrapper>
    )
  }

  return null
}
