/* eslint-disable no-confusing-arrow */
import * as React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const LinkContent = styled.div<{ isActive?: boolean, noPadding?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  height: 60px;
  line-height: 60px;
  padding: ${p => p.noPadding ? 0 : '0 20px'};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  color: ${p => p.isActive ? p.theme.colors.activeText : p.theme.colors.primary};
  background-color: ${p => p.isActive ? p.theme.colors.primary : 'transparent'};
  filter: blur(0.25px);
  overflow: visible;
  transition: background-color 0.3s;
  text-transform: uppercase;
  white-space: nowrap;
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: ${p => p.isActive ? p.theme.colors.primary : 'rgba(0,0,0,0.1)'};
  }
`

interface MenuLinkProps {
  title: string
  isActive?: boolean
  subLinks?: Array<{ title: string, to: string }>
  to?: string
  width?: number
  onClick?: () => void
}

export const HeaderLink = ({ isActive, title, to, onClick }: MenuLinkProps) => {
  if (to) {
    return (
      <div>
        <Link to={to}>
          <LinkContent isActive={isActive}>{title}</LinkContent>
        </Link>
      </div>
    )
  }

  return (
    <div>
      <LinkContent isActive={isActive} role="button" onClick={onClick}>{title}</LinkContent>
    </div>
  )
}
