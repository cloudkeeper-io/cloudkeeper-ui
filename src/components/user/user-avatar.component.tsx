import styled from 'styled-components/macro'

import defaultAvatar from './images/default-avatar.png'

export const UserAvatar = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  box-sizing: border-box;
  background: url("${defaultAvatar}") center center no-repeat;
  background-size: contain;
`
