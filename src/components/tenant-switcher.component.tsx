import React, { useContext, memo, useCallback, useState } from 'react'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'
import { Typography, Menu, MenuItem, Button, Divider } from '@material-ui/core'
import { ChevronDown } from 'react-feather'
import get from 'lodash/get'
import map from 'lodash/map'
import take from 'lodash/take'

import { TenantContext } from '../contexts'
import CreateTenantModal from '../containers/settings/components/tenants/create-tenant-modal.component'

const MenuButton = styled(Button)`
  text-transform: none;
`
const StyledMenuItem = styled(MenuItem)`
  min-height: 30px;
` as any
const Arrow = styled(ChevronDown)`
  margin-left: 10px
`


interface ProjectSwitcherProps {
  className?: string
}

export default memo(({ className }: ProjectSwitcherProps) => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { loading, tenants, currentTenant } = useContext(TenantContext)

  const handleClose = useCallback(() => setAnchorEl(null), [setAnchorEl])
  const handleOpen = useCallback((event) => setAnchorEl(event.currentTarget), [setAnchorEl])

  if (loading) {
    return null
  }

  return (
    <div className={className}>
      <MenuButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleOpen}>
        <Typography variant="subtitle2">{get(currentTenant, 'name')}</Typography>
        <Arrow />
      </MenuButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        keepMounted
      >
        <MenuItem
          onClick={() => {
            handleClose()
            setCreateModalOpen(true)
          }}
        >
          Create New Project
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/settings">
          See All Projects
        </MenuItem>
        <Divider />
        <StyledMenuItem disabled>
          <Typography variant="caption">Recent</Typography>
        </StyledMenuItem>
        {map(take(tenants, 4), (tenant) => (
          <StyledMenuItem component={Link} to={`/tenant/${tenant.id}`} key={tenant.id!} onClick={handleClose}>
            {tenant.name}
          </StyledMenuItem>
        ))}
      </Menu>
      <CreateTenantModal
        key={String(isCreateModalOpen)}
        onClose={() => setCreateModalOpen(false)}
        isOpen={isCreateModalOpen}
      />
    </div>
  )
})
