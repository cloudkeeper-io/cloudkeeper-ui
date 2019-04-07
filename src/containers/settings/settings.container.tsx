import React from 'react'
import styled from 'styled-components/macro'
import { RouteComponentProps, withRouter } from 'react-router-dom'

import TenantsCard from './components/tenants-card.component'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: calc(100% - 40px);
  min-height: calc(100vh - 100px);
  padding: 0 20px;
  align-items: center;
`

interface SettingsContainerProps extends RouteComponentProps {
  className?: string
}

const Settings = ({ className }: SettingsContainerProps) => (
  <Wrapper className={className}>
    <TenantsCard />
  </Wrapper>
)

export default withRouter<SettingsContainerProps>(Settings)
