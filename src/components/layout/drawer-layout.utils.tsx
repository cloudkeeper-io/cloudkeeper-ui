import React from 'react'
import styled from 'styled-components/macro'
import MaterialListItem from '@material-ui/core/ListItem'
import MaterialListItemText from '@material-ui/core/ListItemText'
import MaterialListItemIcon from '@material-ui/core/ListItemIcon'
import { Link } from 'react-router-dom'
import map from 'lodash/map'

import { Layout, Settings } from 'react-feather'

import Icon from '../icons/icon.component'

const ListItem = styled(MaterialListItem)`
  min-height: 55px;
`
const ListItemText = styled(MaterialListItemText)`
  .MuiListItemText-primary {
    font-weight: 500;
  }
  .MuiListItemText-secondary {
    font-size: 12px;
    opacity: 0.6;
  }
`
const ListItemIcon = styled(MaterialListItemIcon)`
  color: white;
  ${Icon} {
    width: 24px;
    height: 22px;
  }
`

export const topMenuItems = [
  { primary: 'Dashboard', to: () => '/', icon: <Layout /> },
  { primary: 'Lambdas', to: (tenantId: string) => `/tenants/${tenantId}/lambdas`, icon: <Icon icon="lambda" /> },
  { primary: 'DynamoDB', to: (tenantId: string) => `/tenants/${tenantId}/dynamo-tables`, icon: <Icon icon="dynamo" /> },
]

export const getTopMenuItems = (tenantId: string) => map(topMenuItems, (item) => {
  if (item.to) {
    return (
      <Link key={item.primary} to={item.to(tenantId)}>
        <ListItem button>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.primary} />
        </ListItem>
      </Link>
    )
  }
  return (
    <ListItem button key={item.primary} disabled>
      <ListItemIcon>{item.icon}</ListItemIcon>
      <ListItemText primary={item.primary} />
    </ListItem>
  )
})

export const bottomMenuItems = [
  { primary: 'Settings', to: () => '/settings', icon: <Settings /> },
]

export const getBottomMenuItems = () => map(bottomMenuItems, (item) => {
  if (item.to) {
    return (
      <Link key={item.primary} to={item.to()}>
        <ListItem button>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.primary} />
        </ListItem>
      </Link>
    )
  }
  return (
    <ListItem button key={item.primary} disabled>
      <ListItemIcon>{item.icon}</ListItemIcon>
      <ListItemText primary={item.primary} />
    </ListItem>
  )
})
