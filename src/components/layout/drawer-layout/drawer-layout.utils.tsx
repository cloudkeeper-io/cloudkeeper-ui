import React, { memo, useContext } from 'react'
import useReactRouter from 'use-react-router'
import { List, Tooltip } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { Layout, Settings, MessageSquare } from 'react-feather'
import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'

import Icon from '../../icons/icon.component'

import { ListItem, ListItemIcon, ListItemText } from './drawer-layout.styles'
import { TenantContext } from '../../../contexts'

const isActive = (pathname: string, to: string) => pathname === to

interface MenuItemsProps {
  tenantId: string
  isExpanded: boolean
}

export const topMenuItems = [
  { primary: 'Dashboard', to: (id: string) => `/tenant/${id}`, icon: <Layout /> },
  { primary: 'Lambdas', to: (tenantId: string) => `/tenant/${tenantId}/lambdas`, icon: <Icon icon="lambda" /> },
  { primary: 'DynamoDB', to: (tenantId: string) => `/tenant/${tenantId}/dynamo-tables`, icon: <Icon icon="dynamo" /> },
]

export const TopMenuItems = memo((props: MenuItemsProps) => {
  const { location: { pathname } } = useReactRouter()
  const { tenants } = useContext(TenantContext)
  const { tenantId, isExpanded } = props

  return (
    <List>
      {map(topMenuItems, (item) => {
        if (item.to && !isEmpty(tenants)) {
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

const anyWindow = window as any

export const bottomMenuItems = [
  { primary: 'Support Chat', onClick: () => anyWindow.Tawk_API.toggle(), icon: <MessageSquare /> },
  { primary: 'Settings', to: '/settings', icon: <Settings /> },
]

export const BottomMenuItems = memo((props: MenuItemsProps) => {
  const { location: { pathname } } = useReactRouter()
  const { isExpanded } = props

  return (
    <List>
      {map(bottomMenuItems, (item) => {
        if (item.to) {
          return (
            <Link key={item.primary} to={item.to}>
              <ListItem button active={isActive(pathname, item.to)}>
                <Tooltip title={item.primary} placement="right" disableHoverListener={isExpanded}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                </Tooltip>
                <ListItemText primary={item.primary} isExpanded={isExpanded} />
              </ListItem>
            </Link>
          )
        }

        return (
          <ListItem key={item.primary} button onClick={item.onClick}>
            <Tooltip title={item.primary} placement="right" disableHoverListener={isExpanded}>
              <ListItemIcon>{item.icon}</ListItemIcon>
            </Tooltip>
            <ListItemText primary={item.primary} isExpanded={isExpanded} />
          </ListItem>
        )
      })}
    </List>
  )
})
