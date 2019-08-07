import React, { memo } from 'react'
import styled from 'styled-components/macro'
import SettingsTabs from './components/settings-tabs.component'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  min-height: calc(100vh - 100px);
  padding: 0 20px;
  align-items: center;
  margin-top: 25px;
  @media(max-width: 800px) {
    padding: 0;
  }
`
const Content = styled.div`
  width: 100%;
  max-width: calc(100vw - 60px);
`

interface SettingsContainerProps {
  className?: string
}

export default memo(({ className }: SettingsContainerProps) => (
  <Wrapper className={className}>
    <Content>
      <SettingsTabs />
    </Content>
  </Wrapper>
))
