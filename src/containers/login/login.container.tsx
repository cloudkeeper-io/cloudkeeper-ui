import React, { useContext, memo, useCallback, useState, useEffect } from 'react'
import useReactRouter from 'use-react-router'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Box, Tab } from '@material-ui/core'

import LoginForm from './components/login-form.component'
import SignUpForm from './components/sign-up-form.component'
import { UserContext } from '../../contexts'
import {
  Wrapper,
  LoginButton,
  Content,
  MainCard,
  Title,
  Text,
  Tabs,
  SwitchWrapper,
  SwitchContent,
  LeftContent,
  RightContent,
  SwitchTitle,
  SwitchText,
  ThemeSwitcher,
} from './login.styles'
import { TawkFab } from '../../components/tawk-fab.component'
import { Stars } from './components/stars.component'
import { SocialSection } from './components'

export default memo(() => {
  const { history, location: { pathname } } = useReactRouter()
  const { demoLogin } = useContext(UserContext)
  const [isDemoLoading, setDemoLoading] = useState(false)
  const isLogin = pathname === '/'

  useEffect(() => {
    toast.dismiss()
  }, [])

  const onDemoClick = useCallback(() => {
    setDemoLoading(true)
    demoLogin()
      .then(() => history.push('/'))
      // eslint-disable-next-line no-console
      .catch(console.log)
  }, [setDemoLoading, demoLogin, history])

  return (
    <Wrapper>
      <Stars />
      <ThemeSwitcher />
      <Content>
        <MainCard>
          <Tabs
            value={Number(!isLogin)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab component={Link} to="/" label="Sign In" />
            <Tab component={Link} to="/sign-up" label="Sign Up" />
          </Tabs>
          <LeftContent isLogin={isLogin}>
            <Title>Create Account</Title>
            <SocialSection />
            <Text>or use your email account for registration:</Text>
            <SignUpForm history={history} />
          </LeftContent>
          <SwitchWrapper isLogin={isLogin}>
            <SwitchContent isLogin={isLogin}>
              <SwitchTitle>{isLogin ? 'Welcome Back!' : 'Welcome to Cloudkeeper'}</SwitchTitle>
              <SwitchText>{isLogin ?
                'Sign in to continue monitoring your projects'
                : 'Sign Up to start monitoring your projects'}
              </SwitchText>
              <LoginButton onClick={() => (isLogin ? history.push('/sign-up') : history.push('/'))}>
                {isLogin ? 'Sign Up' : 'Sign In'}
              </LoginButton>
              <Box mt={2}>
                <LoginButton type="button" onClick={onDemoClick} isLoading={isDemoLoading}>Demo Login</LoginButton>
              </Box>
            </SwitchContent>
          </SwitchWrapper>
          <RightContent isLogin={isLogin}>
            <Title>Sign in to Cloudkeeper</Title>
            <SocialSection />
            <Text>or use your email account:</Text>
            <LoginForm />
          </RightContent>
          <TawkFab />
        </MainCard>
      </Content>
    </Wrapper>
  )
})
