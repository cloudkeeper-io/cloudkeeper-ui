import React, { useContext } from 'react'
import { History } from 'history'
import { withRouter } from 'react-router-dom'

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
  SocialWrapper,
  SocialButton,
  SwitchWrapper,
  SwitchContent,
  LeftContent,
  RightContent,
  SwitchTitle,
  SwitchText,
} from './login.styles'

interface LoginProps {
  history: History
}

export default withRouter(({ history, history: { location: { pathname } } }: LoginProps) => {
  const { googleSignIn, githubSignIn } = useContext(UserContext)
  const isLogin = pathname === '/'

  return (
    <Wrapper>
      <Content>
        <MainCard>
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
              <SwitchTitle>Welcome Back!</SwitchTitle>
              <SwitchText>To keep connected with us please login with your personal info</SwitchText>
              <LoginButton onClick={() => (isLogin ? history.push('/sign-up') : history.push('/'))}>
                {isLogin ? 'Sign Up' : 'Sign In'}
              </LoginButton>
            </SwitchContent>
          </SwitchWrapper>
          <RightContent isLogin={isLogin}>
            <Title>Sign in to Cloudkeeper </Title>
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
