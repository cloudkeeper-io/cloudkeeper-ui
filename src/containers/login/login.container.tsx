import React, { useContext, memo } from 'react'
import useReactRouter from 'use-react-router'
import { Link } from 'react-router-dom'
import { Tab } from '@material-ui/core'

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
  SocialWrapper,
  SocialButton,
  SwitchWrapper,
  SwitchContent,
  LeftContent,
  RightContent,
  SwitchTitle,
  SwitchText,
} from './login.styles'

export default memo(() => {
  const { history, location: { pathname } } = useReactRouter()
  const { googleSignIn, githubSignIn } = useContext(UserContext)
  const isLogin = pathname === '/'

  return (
    <Wrapper>
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
            <SocialWrapper>
              <SocialButton icon={['fab', 'google']} onClick={googleSignIn} />
              <SocialButton icon={['fab', 'github']} onClick={githubSignIn} />
            </SocialWrapper>
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
            </SwitchContent>
          </SwitchWrapper>
          <RightContent isLogin={isLogin}>
            <Title>Sign in to Cloudkeeper</Title>
            <SocialWrapper>
              <SocialButton icon={['fab', 'google']} onClick={googleSignIn} />
              <SocialButton icon={['fab', 'github']} onClick={githubSignIn} />
            </SocialWrapper>
            <Text>or use your email account:</Text>
            <LoginForm />
          </RightContent>
        </MainCard>
      </Content>
    </Wrapper>
  )
})
