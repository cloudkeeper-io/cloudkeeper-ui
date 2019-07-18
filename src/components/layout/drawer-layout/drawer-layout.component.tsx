import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Toolbar, IconButton, useMediaQuery } from '@material-ui/core'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import get from 'lodash/get'

import ElevationScroll from '../elevation-scroll.component'
import TenantSwitcher from '../../tenant-switcher.component'
import ErrorContainer from '../../../containers/error.container'
import ThemeSwitcher from '../../theme-switcher.component'
import { UserMenu } from '../../user'
import { AppBarContext, TenantContext } from '../../../contexts'
import { TopMenuItems, BottomMenuItems } from './drawer-layout.utils'

import {
  mediaQuery,
  Wrapper,
  Drawer,
  AppBar,
  ArrowIcon,
  ArrowWrapper,
  Content,
  Flex,
  FullLogo,
  Hr,
  LeftAppbar,
  LeftAppbarItem,
  Logo,
} from './drawer-layout.styles'


interface DrawerLayoutProps extends RouteComponentProps {
  children: React.ReactElement
}

export default withRouter(({ children, location: { pathname } }: DrawerLayoutProps) => {
  const { isExpanded, setExpanded } = useContext(AppBarContext)
  const [isOpen, setOpen] = useState(false)
  const { error, currentTenant } = useContext(TenantContext)
  const isMobile = useMediaQuery(`(${mediaQuery})`)

  const toggleExpand = useCallback(() => setExpanded(!isExpanded), [isExpanded, setExpanded])
  const openSidebar = useCallback(() => setOpen(true), [setOpen])
  const closeSidebar = useCallback(() => setOpen(false), [setOpen])

  useEffect(closeSidebar, [pathname])

  if (error) {
    return <ErrorContainer />
  }

  return (
    <Wrapper>
      <ElevationScroll threshold={1}>
        <AppBar position="fixed" open={isExpanded}>
          <Toolbar>
            {isMobile && (
              <IconButton onClick={openSidebar}>
                <Logo />
              </IconButton>
            )}
            <TenantSwitcher />
            <Flex />
            <LeftAppbar>
              <LeftAppbarItem> <ThemeSwitcher /></LeftAppbarItem>
              <LeftAppbarItem> <UserMenu /></LeftAppbarItem>
            </LeftAppbar>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={!isMobile || isOpen}
        expanded={isExpanded}
        onClose={closeSidebar}
      >
        <Link to="/"><FullLogo expanded={isExpanded} /></Link>
        <Hr expanded={isExpanded} />
        <TopMenuItems tenantId={get(currentTenant, 'id', '')} isExpanded={isExpanded} />
        <Flex />
        <BottomMenuItems tenantId={get(currentTenant, 'id', '')} isExpanded={isExpanded} />
        {!isMobile && (
          <ArrowWrapper>
            <IconButton onClick={toggleExpand}>
              <ArrowIcon expanded={isExpanded} />
            </IconButton>
          </ArrowWrapper>
        )}
      </Drawer>
      <Content open={isExpanded}>
        <div>
          <Toolbar />
          {children}
        </div>
      </Content>
    </Wrapper>
  )
})
