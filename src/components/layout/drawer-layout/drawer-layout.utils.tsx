import React, { memo } from 'react'
import List from '@material-ui/core/List'
import Tooltip from '@material-ui/core/Tooltip'
import { withRouter, RouteComponentProps, Link } from 'react-router-dom'
import { Layout, Settings } from 'react-feather'
import map from 'lodash/map'
import includes from 'lodash/includes'

import Icon from '../../icons/icon.component'

import { ListItem, ListItemIcon, ListItemText } from './drawer-layout.styles'

const isActive = (pathname: string, to: string) => includes(pathname, to)

interface MenuItemsProps extends RouteComponentProps {
  tenantId: string
  isExpanded: boolean
}

export const topMenuItems = [
  { primary: 'Dashboard', to: (id: string) => `/tenant/${id}/dashboard`, icon: <Layout /> },
  { primary: 'Lambdas', icon: <Icon icon="lambda" /> },
  { primary: 'DynamoDB', icon: <Icon icon="dynamo" /> },
]

export const TopMenuItems = withRouter(memo((props: MenuItemsProps) => {
  const { tenantId, isExpanded, location: { pathname } } = props
  return (
    <List>
      {map(topMenuItems, (item) => {
        if (item.to) {
          return (
            <Link key={item.primary} to={item.to(tenantId)}>
              <ListItem button active={isActive(pathname, item.to(tenantId))}>
                <Tooltip title={item.primary} placement="right" disableHoverListener={isExpanded}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                </Tooltip>
                <ListItemText primary={item.primary} isExpanded={isExpanded} />
              </ListItem>
            </Link>
          )
        }
        return (
          <ListItem button key={item.primary} disabled>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.primary} isExpanded={isExpanded} />
          </ListItem>
        )
      })}
    </List>
  )
}))

export const bottomMenuItems = [
  { primary: 'Settings', to: '/settings', icon: <Settings /> },
]

export const BottomMenuItems = withRouter(memo((props: MenuItemsProps) => {
  const { isExpanded, location: { pathname } } = props

  return (
    <List>
      {map(bottomMenuItems, item => (
        <Link key={item.primary} to={item.to}>
          <ListItem button active={isActive(pathname, item.to)}>
            <Tooltip title={item.primary} placement="right" disableHoverListener={isExpanded}>
              <ListItemIcon>{item.icon}</ListItemIcon>
            </Tooltip>
            <ListItemText primary={item.primary} isExpanded={isExpanded} />
          </ListItem>
        </Link>
      ))}
    </List>
  )
}))
