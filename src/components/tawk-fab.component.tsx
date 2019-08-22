import React from 'react'
import Fab from '@material-ui/core/Fab'
import { MessageSquare } from 'react-feather'
import styled from 'styled-components'

const ChatFab = styled(Fab)`
  position: fixed;
  right: 20px;
  bottom: 20px;
  background-color: #0d8efc;
  color: white;
  height: 60px;
  width: 60px;
  z-index: 100;
  box-shadow: rgba(0, 0, 0, 0.16) 0 2px 10px 0;
  &:hover {
    background-color: #0d8efc;
  }
`

const anyWindow = window as any

export const TawkFab = () => (
  <ChatFab disableRipple onClick={() => anyWindow.Tawk_API.toggle()}><MessageSquare /></ChatFab>
)
