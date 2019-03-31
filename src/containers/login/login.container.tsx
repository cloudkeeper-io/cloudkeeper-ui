import React, { useState, memo, useEffect, useContext } from 'react'
import styled from 'styled-components/macro'
import { History } from 'history'

import Card from '../../components/card.component'
import Tabs from '../../components/tabs.component'
import LoginForm from './components/login-form.component'
import SignUpForm from './components/sign-up-form.component'
import Stars from '../../components/stars.component'
import treeline from './images/treeline.svg'
import { ReactComponent as SVGLogo } from './images/logo.svg'
import { UserContext } from '../../contexts'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  align-items: center;
  height: 100%;
  min-height: calc(100vh - 180px);
  padding: 0 20px 60px 20px;
  background: ${p => p.theme.colors.backgroundGradient};
  background-size: contain;
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 60px;
`
const MainCard = styled(Card)`
  width: 450px;
  max-width: 90vw;
  min-height: 300px;
  ${Card.Content} {
    display: block;
  }
`
const Logo = styled(SVGLogo)`
  fill: ${p => p.theme.colors.icon};
  margin-bottom: 30px;
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

interface LoginProps {
  history: History
}

export default memo(({ history, history: { location: { pathname } } }: LoginProps) => {
  const [tab, setTab] = useState(0)
  const { user, login, signUp } = useContext(UserContext)

  useEffect(() => setTab(pathname === '/sign-up' ? 1 : 0), [pathname])

  return (
    <Wrapper>
      <Stars />
      <Trees />
      <Content>
        <Logo />
        <MainCard>
          <Tabs
            tabs={['Sign In', 'Sign Up']}
            selectedIndex={tab}
            onChange={i => (i ? history.push('/sign-up') : history.push('/'))}
          />
          {tab ? <SignUpForm user={user} signUp={signUp} /> : <LoginForm user={user} login={login} />}
        </MainCard>
      </Content>
    </Wrapper>
  )
})
