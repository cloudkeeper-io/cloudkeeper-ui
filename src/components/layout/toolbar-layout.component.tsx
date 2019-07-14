import React, { memo } from 'react'
import styled from 'styled-components/macro'
import AppBar from '@material-ui/core/AppBar'
import { Toolbar } from '@material-ui/core'

import ElevationScroll from './elevation-scroll.component'
import ThemeSwitcher from '../theme-switcher.component'


const Wrapper = styled.div`
  display: flex;
`
const StyledToolbar = styled(Toolbar)`
  background: ${p => p.theme.colors.background};
`
const Flex = styled.div`
  flex: 1;
`
const Content = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  min-height: 100vh;
`

interface ToolbarLayoutProps {
  children: React.ReactElement
}

export default memo(({ children }: ToolbarLayoutProps) => (
  <Wrapper>
    <ElevationScroll elevation={0}>
      <AppBar position="fixed">
        <StyledToolbar>
          <Flex />
          <ThemeSwitcher />
        </StyledToolbar>
      </AppBar>
    </ElevationScroll>
    <Content>
      <div>
        <Toolbar />
        {children}
      </div>
    </Content>
  </Wrapper>
))
