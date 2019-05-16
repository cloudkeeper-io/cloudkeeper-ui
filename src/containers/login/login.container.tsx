import React, { useContext } from 'react'
import styled from 'styled-components/macro'
import { History } from 'history'
import { withRouter } from 'react-router-dom'

import Card from '../../components/card.component'
import Button from '../../components/button/button.component'
import IconButton from '../../components/button/icon-button.component'
import LoginForm from './components/login-form.component'
import SignUpForm from './components/sign-up-form.component'
import Stars from '../../components/stars.component'
import treeline from './images/treeline.svg'
import background from './images/light-background.svg'
import { UserContext } from '../../contexts'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: calc(100vh - 60px);
  padding: 0 20px;
  background-size: contain;
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -140px;
`
const Title = styled.div`
  font-weight: 500;
  font-size: 32px;
  line-height: 40px;
  margin-top: 30px;
`
const MainCard = styled(Card)`
  display: flex;
  width: 810px;
  background: url("${background}");
  overflow: hidden;
  transition: all 0.7s;
`
const CardContent = styled.div<{ isLogin: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 480px;
  max-width: 90vw;
  background: white;
  transition: all 0.7s;
  clip-path: ${p => (p.isLogin ? 'polygon(0 0, 480px 0, 480px 480px, 0 480px)' : 'polygon(100% 0, calc(100% - 480px) 0, calc(100% - 480px) 100%, 100% 100%)')};
  padding-left: ${p => (p.isLogin ? 0 : '350px')};
  padding-right: ${p => (p.isLogin ? '350px' : 0)};
`
const Trees = styled.div`
  position: absolute;
  bottom: 0;
  height: 100%;
  width: 100%;
  background: url("${treeline}") center bottom no-repeat;
  background-size: contain;
  opacity: ${p => p.theme.login.treesOpacity};
  pointer-events: none;
`
const SocialWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
  transition: all 0.7s;
`
const SocialButton = styled(IconButton)`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0 10px;
`
const Text = styled.div`
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #9A9DAD;
`
const SwitchContent = styled.div<{ left: number | string }>`
  position: absolute;
  left: ${p => p.left};
  transition: all 0.7s;  
`

interface LoginProps {
  history: History
}

export default withRouter(({ history, history: { location: { pathname } } }: LoginProps) => {
  const { googleSignIn, githubSignIn } = useContext(UserContext)
  const tab = pathname === '/sign-up' ? 1 : 0
  const isLogin = !tab

  return (
    <Wrapper>
      <Stars />
      <Trees />
      <Content>
        <MainCard>
          <SwitchContent left={isLogin ? '80%' : 0}>
            <Button onClick={() => (tab ? history.push('/') : history.push('/sign-up'))}>
              {isLogin ? 'Sign Up' : 'Sign In'}
            </Button>
          </SwitchContent>
          <CardContent isLogin={isLogin}>
            <Title>Sign in to Cloudkeeper</Title>
            <SocialWrapper>
              <SocialButton icon={['fab', 'google']} onClick={googleSignIn} />
              <SocialButton icon={['fab', 'github']} onClick={githubSignIn} />
            </SocialWrapper>
            <Text>or use your email account:</Text>
            {tab ? <SignUpForm history={history} /> : <LoginForm history={history} />}
          </CardContent>
        </MainCard>
      </Content>
    </Wrapper>
  )
})
