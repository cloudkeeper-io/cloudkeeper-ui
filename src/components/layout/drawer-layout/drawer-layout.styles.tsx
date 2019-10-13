import React from 'react'
import styled from 'styled-components/macro'
import MaterialAppBar from '@material-ui/core/AppBar'
import MaterialDrawer from '@material-ui/core/Drawer'
import Toolbar from '@material-ui/core/Toolbar'
import MaterialListItem from '@material-ui/core/ListItem/ListItem'
import MaterialListItemText, { ListItemTextProps } from '@material-ui/core/ListItemText'
import MaterialListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon'
import { ChevronLeft } from 'react-feather'

import { ReactComponent as SvgFullLogo } from '../../../svg/full-logo.svg'
import { ReactComponent as SvgLogo } from '../../../svg/logo.svg'
import { Icon } from '../../icons'
import { getTransition, mobileMediaQuery } from '../../../utils'

const drawerWidth = 240
const smallDrawerWidth = 60

export const Wrapper = styled.div`
  display: flex;
`
export const AppBar = styled(MaterialAppBar)<{ open: boolean }>`
  width: ${(p) => (p.open ? `calc(100% - ${drawerWidth}px)` : `calc(100% - ${smallDrawerWidth}px)`)};
  margin-left: ${(p) => (p.open ? `${drawerWidth}px` : `${smallDrawerWidth}px`)};
  transition: ${(p) => getTransition(p.theme, ['width', 'margin'])};
  background: ${(p) => p.theme.colors.background};
  @media (${mobileMediaQuery}) {
    width: 100%;
    margin-left: 0;
  }
`
export const Drawer = styled(({ expanded, ...props }) => <MaterialDrawer {...props} />)<{ expanded: boolean }>`
  .MuiPaper-root {
    width: ${(p) => (p.expanded ? `${drawerWidth}px` : `${smallDrawerWidth}px`)};
    background: ${(p) => p.theme.drawer.background};
    color: white;
    overflow-x: hidden;
    flex-shrink: 0;
    white-space: nowrap;
    transition: ${(p) => getTransition(p.theme, ['width'])};
    border: none;
    .MuiSvgIcon-root, .MuiTypography-root {
      color: white;
    }
    .MuiButtonBase-root {
      &:hover {
        background-color: rgba(255, 255, 255, 0.1)
      }
    }
    @media (${mobileMediaQuery}) {
      width: ${drawerWidth}px;
    }
  }
`
export const Logo = styled(SvgLogo)`
  width: 22px;
  height: 22px;
`
export const FullLogo = styled(({ expanded, ...props }) => <SvgFullLogo {...props} />)<{ expanded: boolean }>`
  position: relative;
  left: ${(p) => (p.expanded ? '0' : '-30px')};
  width: ${drawerWidth}px;
  height: 50px;
  padding: 0 40px;
  margin: 20px 0 0 0;
  cursor: pointer;
  transition: ${(p) => getTransition(p.theme, ['left'])};
  @media (${mobileMediaQuery}) {
    left: 0;
  }
  .logo-text {
    opacity: ${(p) => (p.expanded ? 1 : 0)};
    transition: ${(p) => getTransition(p.theme, ['opacity'])};
    @media (${mobileMediaQuery}) {
      opacity: 1;
    }
  }
`
export const Hr = styled.div<{ expanded: boolean }>`
  position: relative;
  left: ${(p) => (p.expanded ? '0' : '-30px')};
  width: ${(p) => (p.expanded ? 'calc(100% - 80px)' : 'calc(100% - 20px)')};
  height: 2px;
  margin: 0 40px 20px 40px;
  background: white;
  transition: ${(p) => getTransition(p.theme, ['width', 'left'])};
  @media (${mobileMediaQuery}) {
    left: 0;
    width: calc(100% - 80px);
  }
`
export const Flex = styled.div`
  flex: 1;
`
export const ArrowWrapper = styled(Toolbar)`
  display: flex;
  justify-content: flex-end;
  padding: 0 6px;
`
export const ArrowIcon = styled(({ expanded, ...props }) => <ChevronLeft {...props} />)<{ expanded: boolean }>`
  transform: rotate(${(p) => (p.expanded ? 0 : '540deg')});
  transition: ${(p) => getTransition(p.theme, ['all'])} !important;
  color: ${(p) => p.theme.palette.common.white}
`
export const Content = styled.main<{ expanded: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: ${(p) => (p.expanded ? `calc(100% - ${drawerWidth}px)` : `calc(100% - ${smallDrawerWidth}px)`)};
  min-height: 100vh;
  margin-left: ${(p) => (p.expanded ? `${drawerWidth}px` : `${smallDrawerWidth}px`)};
  transition: ${(p) => getTransition(p.theme, ['width', 'margin'])};
  @media (${mobileMediaQuery}) {
    width: 100%;
    margin-left: 0;
  }
`
export const RightAppBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
export const RightAppBarItem = styled.div`
  margin-right: 40px;
  :last-child {
    margin: 0;
  }
  @media (${mobileMediaQuery}) {
    margin-right: 20px;
  }
  @media (max-width: 350px) {
    margin-right: 0;
  }
`
export const ListItem = styled(({ active, ...props }) => <MaterialListItem {...props} />)<{ active?: boolean }>`
  min-height: 55px;
  background: ${(p) => (p.active ? 'rgba(240, 247, 255, 0.3)' : '')};
  border-left: ${(p) => (p.active ? `4px solid ${p.theme.colors.activeText}` : '4px solid transparent')};
  color: ${(p) => (p.active ? p.theme.colors.activeText : '')};
  .MuiTypography-root, .MuiListItemText-root {
    color: ${(p) => (p.active ? p.theme.colors.activeText : '')} !important;
    transition: ${(p) => getTransition(p.theme, ['opacity', 'color'])};
  }
  transition: ${(p) => getTransition(p.theme, ['border-left', 'color'])};
`

interface StyledListItemTextProps extends ListItemTextProps {isExpanded: boolean}

export const ListItemText = styled(
  ({ isExpanded, ...props }) => <MaterialListItemText {...props} />,
)<StyledListItemTextProps>`
  opacity: ${(p) => (p.isExpanded ? 1 : 0)};
  transition: ${(p) => getTransition(p.theme, ['opacity'])};
  .MuiListItemText-primary {
    font-weight: 500;
  }
  @media (${mobileMediaQuery}) {
    opacity: 1;
  }
`
export const ListItemIcon = styled(MaterialListItemIcon)`
  color: inherit;
  ${Icon} {
    width: 22px;
    height: 22px;
  }
`
