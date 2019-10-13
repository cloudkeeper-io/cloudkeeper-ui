import React, { memo, useCallback, useContext, useState } from 'react'
import styled from 'styled-components/macro'
import { Button, ButtonGroup, Divider, Menu, MenuItem } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { LogOut } from 'react-feather'

import { UserContext } from '../../contexts'
import { UserAvatar } from './user-avatar.component'

const Wrapper = styled.div`
  cursor: pointer;
`
const SignUpButton = styled(Button)`
  min-width: 70px;
  @media (max-width: 600px) {
    padding-left: 0;
    padding-right: 0;
  }
` as any

export const UserMenu = memo(() => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { user, signOut } = useContext(UserContext)

  const handleClose = useCallback(() => setAnchorEl(null), [setAnchorEl])
  const handleOpen = useCallback((event) => setAnchorEl(event.currentTarget), [setAnchorEl])

  if (user!.isAnonymous) {
    return (
      <ButtonGroup variant="contained" color="primary">
        <SignUpButton component={Link} to="/go/sign-up" color="primary" variant="contained">
          Sign Up
        </SignUpButton>
        <Button color="primary" size="small" component={Link} to="/go/">
          <LogOut size="14" />
        </Button>
      </ButtonGroup>
    )
  }

  return (
    <Wrapper>
      <UserAvatar aria-controls="simple-menu" aria-haspopup="true" onClick={handleOpen} />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        keepMounted
      >
        <MenuItem disabled={user!.isAnonymous} onClick={handleClose} component={Link} to="/settings">
          Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={signOut}>
          {user!.isAnonymous ? 'End Demo' : 'Sign Out'}
        </MenuItem>
      </Menu>
    </Wrapper>
  )
})
