import React, { useContext } from 'react'
import styled from 'styled-components/macro'
import { History } from 'history'
import { withRouter } from 'react-router-dom'

import Card from '../../components/card.component'
import Tabs from '../../components/tabs.component'
import Button from '../../components/button/button.component'
import Icon from '../../components/icon.component'
import LoginForm from './components/login-form.component'
import SignUpForm from './components/sign-up-form.component'
import Stars from '../../components/stars.component'
import treeline from './images/treeline.svg'
import { ReactComponent as SVGLogo } from './images/logo.svg'
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
const MainCard = styled(Card)`
  display: block;
  width: 450px;
  max-width: 90vw;
  min-height: 300px;
  overflow: hidden;
`
const Logo = styled(SVGLogo)`
  fill: ${p => p.theme.colors.icon};
  margin-bottom: 15px;
  z-index: 2;
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
  justify-content: space-around;
  width: 450px;
  max-width: 90vw;
  margin-bottom: 15px;
`
const SocialButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-right: 15px;
`
const SocialIcon = styled(Icon)`
  margin: 0 5px;
`

interface LoginProps {
  history: History
}

export default withRouter(({ history, history: { location: { pathname } } }: LoginProps) => {
  const { googleSignIn, githubSignIn } = useContext(UserContext)
  const tab = pathname === '/sign-up' ? 1 : 0

  return (
    <Wrapper>
      <Stars />
      <Trees />
      <Content>
        <Logo />
        <SocialWrapper>
          <SocialButton onClick={googleSignIn}>
            <SocialIcon icon={['fab', 'google']} />SignIn with Google
          </SocialButton>
          <SocialButton onClick={githubSignIn}>
            <SocialIcon icon={['fab', 'github']} />SignIn with Github
          </SocialButton>
        </SocialWrapper>
        <MainCard>
          <Tabs
            tabs={['Sign In', 'Sign Up']}
            selectedIndex={tab}
            onChange={i => (i ? history.push('/sign-up') : history.push('/'))}
          />
          {tab ? <SignUpForm history={history} /> : <LoginForm history={history} />}
        </MainCard>
      </Content>
    </Wrapper>
  )
})
