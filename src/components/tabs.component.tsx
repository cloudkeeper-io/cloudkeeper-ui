import React from 'react'
import styled from 'styled-components/macro'

import Button from './button/button.component'

const TabList = styled.div`
  position: relative;
  top: -2px;
  left: -2px;
  width: calc(100% + 4px);
  display: flex;
  align-items: center;
  justify-content: center;
`
const TabButton = styled(Button)<{ active?: boolean }>`
  position: relative;
  width: 50%;
  height: 60px;
  background: ${p => (p.active ? p.theme.tabs.active : p.theme.tabs.background)};
  color: ${p => (p.active ? p.theme.tabs.text : p.theme.tabs.activeText)};
  clip-path: ${p => p.theme.tabs.clipPath};
  border-radius: ${p => p.theme.tabs.borderRight};
  &:first-child {
    border-radius: ${p => p.theme.tabs.borderLeft};
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
