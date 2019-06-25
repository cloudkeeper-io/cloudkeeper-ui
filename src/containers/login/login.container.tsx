import React, { useContext } from 'react'
import styled from 'styled-components/macro'
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
  CardContent,
  SwitchTitle,
  SwitchText,
} from './login.styles'

interface LoginProps {
  history: History
}

const ContentHolder = styled.div`
  width: 100%;
  position: relative;
`
const LeftContent = styled.div<{ isLogin: boolean }>`
  position: absolute;
  left: ${p => (p.isLogin ? 0 : '450px')};
  transition: left 0.7s ease-in-out;
`
const RightContent = styled.div<{ isLogin: boolean }>`
  position: absolute;
  left: ${p => (p.isLogin ? '-810px' : '0')};
  transition: left 0.7s ease-in-out;
`

export default withRouter(({ history, history: { location: { pathname } } }: LoginProps) => {
  const { googleSignIn, githubSignIn } = useContext(UserContext)
  const isLogin = pathname === '/'

  return (
    <Wrapper>
      <Content>
        <MainCard>
          <CardContent isLogin={isLogin}>
            <Title>{isLogin ? 'Sign In' : 'Sign Up'} in to Cloudkeeper</Title>
            <SocialWrapper>\
              <SocialButton icon={['fab', 'google']} onClick={googleSignIn} />
              <SocialButton icon={['fab', 'github']} onClick={githubSignIn} />
            </SocialWrapper>
            <Text>or use your email account:</Text>
            <ContentHolder>
              <LeftContent isLogin={isLogin}>
                <LoginForm />
              </LeftContent>
              <RightContent isLogin={isLogin}>
                <SignUpForm history={history} />
              </RightContent>
            </ContentHolder>
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
