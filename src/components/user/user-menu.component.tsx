import React, { memo, useCallback, useContext, useState } from 'react'
import styled from 'styled-components/macro'
import { Divider, Menu, MenuItem } from '@material-ui/core'
import { Link } from 'react-router-dom'

import { UserContext } from '../../contexts'
import { UserAvatar } from './user-avatar.component'

const Wrapper = styled.div`
  cursor: pointer;
`

export const UserMenu = memo(() => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { signOut } = useContext(UserContext)

  const handleClose = useCallback(() => setAnchorEl(null), [setAnchorEl])
  const handleOpen = useCallback(event => setAnchorEl(event.currentTarget), [setAnchorEl])

  return (
    <Wrapper>
      <UserAvatar aria-controls="simple-menu" aria-haspopup="true" onClick={handleOpen} />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        keepMounted
      >
        <MenuItem onClick={handleClose} component={Link} to="/settings">
          Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={signOut}>
          Sign Out
        </MenuItem>
      </Menu>
    </Wrapper>
  )
})
