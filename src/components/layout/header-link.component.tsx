import * as React from 'react'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'
import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core'
import { transparentize } from 'polished'

import Icon, { StyledIcon } from '../icon.component'

const LinkContent = styled.div<{ active?: boolean, noPadding?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  height: 60px;
  line-height: 60px;
  padding: ${p => p.noPadding ? 0 : '0 16px'};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  filter: blur(0.25px);
  overflow: visible;
  transition: background-color 0.3s;
  text-transform: uppercase;
  white-space: nowrap;
  &:focus {
    outline: none;
  }
  ${StyledIcon} {
    filter: ${p => `drop-shadow(0px 0px 2px ${transparentize(p.active ? 0.15 : 0.85, p.theme.colors.icon)})`};
  }
`

interface HeaderLinkProps {
  active?: boolean
  subLinks?: Array<{ title: string, to: string }>
  to?: string
  iconSize?: SizeProp
  icon?: IconProp
  width?: number
  onClick?: () => void
}

export default ({ active, to, icon = 'home', iconSize = 'lg', onClick }: HeaderLinkProps) => {
  if (to) {
    return (
      <Link to={to}>
        <LinkContent active={active}>
          <Icon size={iconSize} icon={icon} />
        </LinkContent>
      </Link>
    )
  }

  return (
    <LinkContent active={active} role="button" onClick={onClick}>
      <Icon size={iconSize} icon={icon} />
    </LinkContent>
  )
}
