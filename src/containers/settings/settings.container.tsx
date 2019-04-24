import React from 'react'
import styled from 'styled-components/macro'
import { RouteComponentProps, withRouter } from 'react-router-dom'

import TenantsCard from './components/tenants/tenants-card.component'
import UserSettings from './components/subscription-settings.component'
import SecuritySettings from './components/security-settings.component'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: calc(100% - 40px);
  min-height: calc(100vh - 100px);
  padding: 0 20px;
  align-items: center;
  @media(max-width: 800px) {
    padding: 0;
  }
`
const Content = styled.div`
  width: 400px;
  max-width: calc(100vw - 60px);
`

interface SettingsContainerProps extends RouteComponentProps {
  className?: string
}

const Settings = ({ className }: SettingsContainerProps) => (
  <Wrapper className={className}>
    <Content>
      <TenantsCard />
      <SecuritySettings />
      <UserSettings />
    </Content>
  </Wrapper>
)

export default withRouter<SettingsContainerProps>(Settings)
