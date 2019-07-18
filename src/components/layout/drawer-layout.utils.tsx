import React from 'react'
import styled from 'styled-components/macro'
import List from '@material-ui/core/List'
import MaterialListItem from '@material-ui/core/ListItem'
import MaterialListItemText, { ListItemTextProps } from '@material-ui/core/ListItemText'
import MaterialListItemIcon from '@material-ui/core/ListItemIcon'
import Tooltip from '@material-ui/core/Tooltip'
import { Link } from 'react-router-dom'
import map from 'lodash/map'
import { Layout, Settings } from 'react-feather'

import Icon from '../icons/icon.component'
import { getTransition } from '../../utils'


const ListItem = styled(MaterialListItem)`
  min-height: 55px;
`

interface StyledListItemTextProps extends ListItemTextProps {isExpanded: boolean}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ListItemText = styled(({ isExpanded, ...props }) => <MaterialListItemText {...props} />)<StyledListItemTextProps>`
  .MuiListItemText-primary {
    font-weight: 500;
  }
  .MuiListItemText-secondary {
    font-size: 12px;
    opacity: 0.6;
  }
  opacity: ${p => (p.isExpanded ? 1 : 0)};
  transition: ${p => getTransition(p.theme, ['opacity'])};
`
const ListItemIcon = styled(MaterialListItemIcon)`
  color: white;
  ${Icon} {
    width: 22px;
    height: 22px;
  }
`

interface MenuItemsProps {
  tenantId: string
  isExpanded: boolean
}

export const topMenuItems = [
  { primary: 'Dashboard', to: (id: string) => `/tenant/${id}/dashboard`, icon: <Layout /> },
  { primary: 'Lambdas', icon: <Icon icon="lambda" /> },
  { primary: 'DynamoDB', icon: <Icon icon="dynamo" /> },
]

export const TopMenuItems = ({ tenantId, isExpanded }: MenuItemsProps) => (
  <List>
    {map(topMenuItems, (item) => {
      if (item.to) {
        return (
          <Link key={item.primary} to={item.to(tenantId)}>
            <ListItem button>
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

export const bottomMenuItems = [
  { primary: 'Settings', to: '/settings', icon: <Settings /> },
]

export const BottomMenuItems = ({ isExpanded }: MenuItemsProps) => (
  <List>
    {map(bottomMenuItems, item => (
      <Link key={item.primary} to={item.to}>
        <ListItem button>
          <Tooltip title={item.primary} placement="right" disableHoverListener={isExpanded}>
            <ListItemIcon>{item.icon}</ListItemIcon>
          </Tooltip>
          <ListItemText primary={item.primary} isExpanded={isExpanded} />
        </ListItem>
      </Link>
    ))}
  </List>
)
