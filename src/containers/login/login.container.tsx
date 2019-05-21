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

const transitionTime = '0.7s ease-out'

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
  height: 100%;
  overflow: hidden;
`
const CardContent = styled.div<{ isLogin: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 810px;
  background: white;
  padding-left: ${p => (p.isLogin ? '330px' : 0)};
  padding-right: ${p => (p.isLogin ? 0 : '350px')};
  transition: padding ${transitionTime};
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
const SwitchWrapper = styled.div<{ isLogin: boolean }>`
  position: absolute;
  width: 810px;
  height: 100%;
  background: url("${background}") center center;
  background-size: cover;
  clip-path: ${p => (p.isLogin ?
    'polygon(0 0, 330px 0, 330px 100%, 0 100%)' :
    'polygon(490px 0, 100% 0, 100% 100%, 490px 100%)')};
  transition: all ${transitionTime};
`
const SwitchContent = styled.div<{ isLogin: boolean }>`
  position: absolute;
  width: 330px;
  left: ${p => (p.isLogin ? 0 : '490px')};
  transition: all ${transitionTime};
`

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
            {isLogin ? <LoginForm history={history} /> : <SignUpForm history={history} />}
          </CardContent>
          <SwitchWrapper isLogin={isLogin}>
            <SwitchContent isLogin={isLogin}>
              <Button onClick={() => (isLogin ? history.push('/sign-up') : history.push('/'))}>
                {isLogin ? 'Sign Up' : 'Sign In'}
              </Button>
            </SwitchContent>
          </SwitchWrapper>
        </MainCard>
      </Content>
    </Wrapper>
  )
})
