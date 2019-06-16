import React, { useContext } from 'react'
import { History } from 'history'
import { withRouter } from 'react-router-dom'

import LoginForm from './components/login-form.component'
import SignUpForm from './components/sign-up-form.component'
import Stars from '../../components/stars.component'
import { UserContext } from '../../contexts'
import {
  Wrapper,
  LoginButton,
  Trees,
  Content,
  MainCard,
  Title,
  Text,
  SocialWrapper,
  SocialButton,
  SwitchWrapper,
  SwitchContent,
  CardContent,
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
      <Stars />
      <Trees />
      <Content>
        <MainCard>
          <CardContent isLogin={isLogin}>
            <Title>{isLogin ? 'Sign In' : 'Sign Up'} in to Cloudkeeper</Title>
            <SocialWrapper>
              <SocialButton icon={['fab', 'google']} onClick={googleSignIn} />
              <SocialButton icon={['fab', 'github']} onClick={githubSignIn} />
            </SocialWrapper>
            <Text>or use your email account:</Text>
            {isLogin ? <LoginForm /> : <SignUpForm history={history} />}
          </CardContent>
          <SwitchWrapper isLogin={isLogin}>
            <SwitchContent isLogin={isLogin}>
              <SwitchTitle>Welcome Back!</SwitchTitle>
              <SwitchText>To keep connected with us please login with your personal info</SwitchText>
              <LoginButton onClick={() => (isLogin ? history.push('/sign-up') : history.push('/'))}>
                {isLogin ? 'Sign Up' : 'Sign In'}
              </LoginButton>
            </SwitchContent>
          </SwitchWrapper>
        </MainCard>
      </Content>
    </Wrapper>
  )
})
