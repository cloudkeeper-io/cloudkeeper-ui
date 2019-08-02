import React, { memo } from 'react'
import useReactRouter from 'use-react-router'
import { List, Tooltip } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { Layout, Settings } from 'react-feather'
import map from 'lodash/map'
import includes from 'lodash/includes'

import Icon from '../../icons/icon.component'

import { ListItem, ListItemIcon, ListItemText } from './drawer-layout.styles'

const isActive = (pathname: string, to: string) => includes(pathname, to)

interface MenuItemsProps {
  tenantId: string
  isExpanded: boolean
}

export const topMenuItems = [
  { primary: 'Dashboard', to: (id: string) => `/tenant/${id}/dashboard`, icon: <Layout /> },
  { primary: 'Lambdas', icon: <Icon icon="lambda" /> },
  { primary: 'DynamoDB', icon: <Icon icon="dynamo" /> },
]

export const TopMenuItems = memo((props: MenuItemsProps) => {
  const { location: { pathname } } = useReactRouter()
  const { tenantId, isExpanded } = props
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
})

export const bottomMenuItems = [
  { primary: 'Settings', to: '/settings', icon: <Settings /> },
]

export const BottomMenuItems = memo((props: MenuItemsProps) => {
  const { location: { pathname } } = useReactRouter()
  const { isExpanded } = props

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
})
