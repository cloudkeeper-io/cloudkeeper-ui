import React from 'react'
import styled from 'styled-components'

import Button from './button/button.component'

const TabList = styled.div`
  position: relative;
  right: ${p => p.theme.tabs.tabListRight};
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${p => `calc(100% + ${p.theme.tabs.tabListRight || 0})`};
`
const TabButton = styled(Button)<{ active?: boolean }>`
  position: relative;
  width: 50%;
  height: 60px;
  top: -2px;
  left: -2px;
  &:first-child {
    transform: ${p => `translateX(${p.theme.tabs.tabListRight})`};
    ${Button.Content} {
      border-radius: 6px 0 0 0;
    }
  }
  ${Button.Border} {
    clip-path: ${p => p.theme.tabs.borderClipPath};
  }
  ${Button.Content} {
    background: ${p => (p.active ? p.theme.tabs.active : p.theme.tabs.background)};
    color: ${p => (p.active ? p.theme.tabs.text : p.theme.tabs.activeText)};
    clip-path: ${p => p.theme.tabs.clipPath};
    border-radius: 0 6px 0 0;
  }
`

interface TabsProps {
  tabs: string[]
  selectedIndex?: number
  className?: string

  onChange(tab: number): void
}

const Tabs = ({ tabs, selectedIndex, onChange, className }: TabsProps) => (
  <TabList className={className}>
    {tabs.map((tab, i) => (
      <TabButton onClick={() => onChange(i)} active={selectedIndex === i} key={tab}>{tab}</TabButton>
    ))}
  </TabList>
)

Tabs.TabButton = TabButton

export default Tabs
