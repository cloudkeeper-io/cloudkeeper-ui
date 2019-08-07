import styled from 'styled-components/macro'
import React, { useContext } from 'react'
import { UserContext } from '../../contexts'
import defaultAvatar from './images/default-avatar.png'

const Avatar = styled.div<{ photoUrl: string }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  box-sizing: border-box;
  background: url("${p => p.photoUrl}") center center no-repeat;
  background-size: contain;
`

export const UserAvatar = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const { user } = useContext(UserContext)
  return <Avatar photoUrl={user!.photoURL || defaultAvatar} {...props} />
}
