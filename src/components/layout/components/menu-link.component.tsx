/* eslint-disable max-len,no-nested-ternary */
import * as React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const LinkContent = styled.div<{ active?: boolean, type?: string, noAction?: boolean }>`
    position: relative;
    display: flex;
    align-items: center;
    padding-left: ${p => p.type === 'sublink' ? '60px' : '20px'};
    height: 54px;
    line-height: 54px;
    font-size: 14px;
    cursor: ${p => p.noAction ? 'default' : 'pointer'};
    color: ${({ active }) => active ? '#4E92DF' : '#A2A2A2'};
    background-color: ${({ active, noAction }) => active && !noAction ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0)'};
    border-bottom: ${({ active, noAction }) => active && !noAction ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(0,0,0,0)'};
    border-top: ${({ active, noAction }) => active && !noAction ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(0,0,0,0)'};
    overflow: visible;
    transition: background-color 0.3s;
    &:focus {
     outline: none;
    }
    &:before {
      opacity: ${({ active, noAction }) => active && !noAction ? '1' : '0'};
      width: ${({ active, noAction }) => active && !noAction ? '7px !important' : '0'};
      position: absolute;
      right: 0;
      top: -1px;
      content: '';
      height: 54px;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      background-color: #4E92DF;
    }
    &:hover {
      background-color: ${({ active, noAction }) => noAction ? 'rgba(0,0,0,0)' : active ? 'rgba(0,0,0,0.05)' : 'rgba(0,0,0,0.05)'};
    }
`
const Separator = styled.div`
  position: relative;
  user-select: none;
  font-size: 12px;
  text-transform: uppercase;
  color: #A2A2A2;
  border-bottom: 1px rgba(255,255,255, 0.5) solid;
  margin: 15px 0 10px 23px;
  padding-bottom: 10px;
`

interface ILink {
  title: string
  subLinks?: ILink[]
  to?: string
  altTo?: string
  icon?: string
  onClick?: () => void
}

interface MenuLinkProps {
  link: ILink
  active: boolean
  type?: string
  noAction?: boolean
}

export const MenuLink = ({ link, active, noAction, type }: MenuLinkProps) => {
  if (type === 'separator') {
    return (
      <div>
        <Separator>{link.title}</Separator>
      </div>
    )
  }

  if (link.to) {
    return (
      <div>
        <Link to={link.to}>
          <LinkContent active={active} type={type} noAction={noAction}>
            {link.title}
          </LinkContent>
        </Link>
      </div>
    )
  }

  return (
    <div>
      <LinkContent active={active} role="button" onClick={link.onClick} type={type} noAction={noAction}>
        {link.title}
      </LinkContent>
    </div>
  )
}
