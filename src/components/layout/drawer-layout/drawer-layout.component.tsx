import React, { useCallback, useContext, useEffect, useState, memo } from 'react'
import { Toolbar, IconButton, useMediaQuery, Link as MaterialLink } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import useReactRouter from 'use-react-router'
import get from 'lodash-es/get'

import ElevationScroll from '../elevation-scroll.component'
import TenantSwitcher from '../../tenant/tenant-switcher.component'
import ErrorContainer from '../../../containers/error.container'
import ThemeSwitcher from '../../theme-switcher.component'
import FullscreenSwitcher from '../../fullscreen-switcher.component'
import { UserMenu } from '../../user'
import { AppBarContext, TenantContext, UserContext } from '../../../contexts'
import { TopMenuItems, BottomMenuItems } from './drawer-layout.utils'
import { mobileMediaQuery } from '../../../utils'
import {
  Wrapper,
  Drawer,
  AppBar,
  ArrowIcon,
  ArrowWrapper,
  Content,
  Flex,
  FullLogo,
  Hr,
  RightAppBar,
  RightAppBarItem,
  Logo,
} from './drawer-layout.styles'

interface DrawerLayoutProps {
  children: React.ReactElement
}

export default memo(({ children }: DrawerLayoutProps) => {
  const { location: { pathname } } = useReactRouter()
  const { isExpanded, setExpanded } = useContext(AppBarContext)
  const { user } = useContext(UserContext)
  const [isOpen, setOpen] = useState(false)
  const { error, currentTenant } = useContext(TenantContext)
  const isMobile = useMediaQuery(`(${mobileMediaQuery})`)

  const toggleExpand = useCallback(() => setExpanded(!isExpanded), [isExpanded, setExpanded])
  const openSidebar = useCallback(() => setOpen(true), [setOpen])
  const closeSidebar = useCallback(() => setOpen(false), [setOpen])

  useEffect(closeSidebar, [pathname])
  useEffect(() => {
    if (user!.isAnonymous) {
      toast((
        <div>You&apos;re in the demo mode.
            You can <MaterialLink to="/go/sign-up" component={Link}>sign up here </MaterialLink>
            or do it later using buttons in header
        </div>
      ),
      { position: 'top-center', autoClose: false })
    }
  }, [user])

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
            {(!error && pathname !== '/settings') && <TenantSwitcher />}
            <Flex />
            <RightAppBar>
              {!isMobile && (<RightAppBarItem> <FullscreenSwitcher /></RightAppBarItem>)}
              <RightAppBarItem> <ThemeSwitcher /></RightAppBarItem>
              <RightAppBarItem> <UserMenu /></RightAppBarItem>
            </RightAppBar>
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
      <Content expanded={isExpanded}>
        <div>
          <Toolbar />
          {error ? <ErrorContainer text={get(error, 'message')} /> : children}
        </div>
      </Content>
    </Wrapper>
  )
})
