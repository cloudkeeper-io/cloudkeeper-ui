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
  background: linear-gradient(180deg, #0E0C1F -0.31%, #112531 100%);
  background-size: contain;
`
const MainCard = styled(Card)`
  width: 450px;
  min-height: 300px;
  ${Card.Content} {
    display: block;
  }
`
const Threes = styled.div`
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
        <Threes />
        <MainCard>
          <Tabs
            tabs={['Sing In', 'Sing Up']}
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
          {selectedTab === 0 && <LoginForm user={user} /> as any}
          {selectedTab === 1 && <SignUpForm user={user} />}
        </MainCard>
      </Wrapper>
    )
  }
}
