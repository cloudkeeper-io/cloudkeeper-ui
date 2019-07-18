import React, { useCallback, useContext } from 'react'
import styled from 'styled-components/macro'
import MaterialAppBar from '@material-ui/core/AppBar'
import MaterialDrawer from '@material-ui/core/Drawer'
import { Theme, Toolbar, IconButton, List } from '@material-ui/core'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import { ChevronLeft } from 'react-feather'

import ElevationScroll from './elevation-scroll.component'
import TenantSwitcher from '../tenant-switcher.component'
import ErrorContainer from '../../containers/error.container'
import ThemeSwitcher from '../theme-switcher.component'
import { UserMenu } from '../user'
import { AppBarContext, TenantContext } from '../../contexts'
import { ReactComponent as SvgLogo } from '../../svg/full-logo.svg'
import { getBottomMenuItems, getTopMenuItems } from './drawer-layout.utils'

const drawerWidth = 240
const smallDrawerWidth = 60
const getTransition = (theme: Theme, units: string[]) => theme.transitions.create(units, {
  easing: theme.transitions.easing.sharp,
  duration: theme.transitions.duration.enteringScreen,
})

const Wrapper = styled.div`
  display: flex;
`
const AppBar = styled(MaterialAppBar)<{ open: boolean }>`
  width: ${p => (p.open ? `calc(100% - ${drawerWidth}px)` : `calc(100% - ${smallDrawerWidth}px)`)};
  margin-left: ${p => (p.open ? `${drawerWidth}px` : `${smallDrawerWidth}px`)};
  transition: ${p => getTransition(p.theme, ['width', 'margin'])};
  background: ${p => p.theme.colors.background};
`
const Drawer = styled(MaterialDrawer)<{ open: boolean }>`
  .MuiPaper-root  {
    width: ${p => (p.open ? `${drawerWidth}px` : `${smallDrawerWidth}px`)};
    background: ${p => p.theme.drawer.background};
    color: white;
    overflow-x: hidden;
    flex-shrink: 0;
    white-space: nowrap;
    transition: ${p => getTransition(p.theme, ['width'])};
    border: none;
    .MuiSvgIcon-root, .MuiTypography-root {
      color: white;
    }
    .MuiButtonBase-root {
      &:hover {
        background-color: rgba(255, 255, 255, 0.1)
      }
    }
  }
`
const Logo = styled(SvgLogo)<{ open: boolean }>`
  position: relative;
  left: ${p => (p.open ? '0' : '-30px')};
  width: ${drawerWidth}px;
  height: 50px;
  padding: 0 40px;
  margin: 20px 0 0 0;
  cursor: pointer;
  transition: ${p => getTransition(p.theme, ['left'])};
  .logo-text {
    opacity: ${p => (p.open ? 1 : 0)};
    transition: ${p => getTransition(p.theme, ['opacity'])};
  }
`
const Hr = styled.div<{ open: boolean }>`
  position: relative;
  left: ${p => (p.open ? '0' : '-30px')};
  width: ${p => (p.open ? 'calc(100% - 80px)' : 'calc(100% - 20px)')};
  height: 2px;
  margin: 0 40px 20px 40px;
  background: white;
  transition: ${p => getTransition(p.theme, ['width', 'left'])};
`
const Flex = styled.div`
  flex: 1;
`
const ArrowWrapper = styled(Toolbar)`
  display: flex;
  justify-content: flex-end;
  padding: 0 6px;
`
const ArrowIcon = styled(ChevronLeft)<{ open: boolean }>`
  transform: rotate(${p => (p.open ? 0 : '540deg')});
  transition: ${p => getTransition(p.theme, ['all'])} !important;};
`
const Content = styled.main<{ open: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: ${p => (p.open ? `calc(100% - ${drawerWidth}px)` : `calc(100% - ${smallDrawerWidth}px)`)};
  min-height: 100vh;
  margin-left: ${p => (p.open ? `${drawerWidth}px` : `${smallDrawerWidth}px`)};
  transition: ${p => getTransition(p.theme, ['width', 'margin'])};
`
const LeftAppbar = styled.div`
  display: flex;
`
const LeftAppbarItem = styled.div`
  margin: 0 40px;
  :last-child {
    margin: 0;
  }
`

interface DrawerLayoutProps extends RouteComponentProps {
  children: React.ReactElement
}

export default withRouter(({ children }: DrawerLayoutProps) => {
  const { isExpanded, setExpanded } = useContext(AppBarContext)
  const { tenantId, error } = useContext(TenantContext)
  const toggleExpand = useCallback(() => setExpanded(!isExpanded), [isExpanded, setExpanded])

  if (error) {
    return <ErrorContainer />
  }

  return (
    <Wrapper>
      <ElevationScroll threshold={1}>
        <AppBar position="fixed" open={isExpanded}>
          <Toolbar>
            <TenantSwitcher />
            <Flex />
            <LeftAppbar>
              <LeftAppbarItem> <ThemeSwitcher /></LeftAppbarItem>
              <LeftAppbarItem> <UserMenu /></LeftAppbarItem>
            </LeftAppbar>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Drawer variant="permanent" open={isExpanded}>
        <Link to="/"><Logo open={isExpanded} /></Link>
        <Hr open={isExpanded} />
        <List>{getTopMenuItems(tenantId!)}</List>
        <Flex />
        <List>{getBottomMenuItems()}</List>
        <ArrowWrapper>
          <IconButton onClick={toggleExpand} style={{ color: 'white' }}>
            <ArrowIcon open={isExpanded} />
          </IconButton>
        </ArrowWrapper>
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
