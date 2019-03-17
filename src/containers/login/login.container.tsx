import * as React from 'react'
import styled from 'styled-components/macro'
import { History } from 'history'

import Card from '../../components/card.component'
import Tabs from '../../components/tabs.component'
import LoginForm from './components/login-form.component'
import SignUpForm from './components/sign-up-form.component'
import Stars from '../../components/stars.component'
import { User } from '../../models'
import treeline from '../../components/treeline.svg'
import { ReactComponent as SVGLogo } from './logo.svg'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  align-items: center;
  height: 100%;
  min-height: 100vh;
  margin-top: -60px;
  padding: 0 20px;
  background: ${p => p.theme.colors.backgroundGradient};
  background-size: contain;
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -100px;
`
const MainCard = styled(Card)`
  width: 450px;
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
  height: 100%;
  width: 100%;
  background: url("${treeline}") center bottom no-repeat;
  background-size: contain;
  pointer-events: none;
`

interface LoginProps {
  user: User
  history: History
}

export default class Login extends React.PureComponent<LoginProps> {
  public state = {
    selectedTab: window.location.pathname === '/sign-up' ? 1 : 0,
  }

  public render() {
    const { user, history } = this.props
    const { selectedTab } = this.state

    return (
      <Wrapper>
        <Stars />
        <Trees />
        <Content>
          <Logo />
          <MainCard>
            <Tabs
              tabs={['Sign In', 'Sign Up']}
              selectedIndex={selectedTab}
              onChange={(i) => {
                if (i) {
                  history.push('/sign-up')
                } else {
                  history.push('/')
                }
                this.setState({ selectedTab: i })
              }}
            />
            {selectedTab ? <SignUpForm user={user} /> : <LoginForm user={user} />}
          </MainCard>
        </Content>
      </Wrapper>
    )
  }
}
