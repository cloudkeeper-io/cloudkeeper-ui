import React, { useEffect, useMemo, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components/macro'
import sum from 'lodash-es/sum'

import { Header } from './typography.component'

const fadeEffect = keyframes`
  from {
     opacity: 0;
     left: 30px;
  }
  to {
     opacity: 1;
     left: 0;
  }
`

const TabList = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
`
const TabButton = styled(Header)<{ active?: boolean }>`
  position: relative;
  color: ${(p) => (p.active ? p.theme.colors.primary : p.theme.colors.text)};
  opacity: ${(p) => (p.active ? 1 : 0.7)};
  margin: 10px;
  cursor: pointer;
  transition: opacity, font-size 0.6s;
  user-select: none;
`
export const TabContent = styled.div`
  position: relative;
  transition: all 1s ease;
  animation: ${fadeEffect} 0.6s ease;
`
const TabIndicator = styled.div<{ indicatorWidth: number, indicatorX: number }>`
  position: absolute;
  left: 0;
  bottom: 0;
  width: ${(p) => p.indicatorWidth}px;
  height: 100%;
  background: ${(p) => p.theme.tabs.gradient};
  transition: width 0.6s ease, transform 0.6s ease;
  opacity: 0.1;
  transform: translateX(${(p) => p.indicatorX}px);
`

interface TabsProps {
  tabs: string[]
  selectedIndex?: number
  className?: string

  onChange(tab: number): void
}

const Tabs = ({ tabs, selectedIndex, onChange, className }: TabsProps) => {
  const tabsWrapper = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)
  useEffect(() => setLoaded(true), [])

  const [indicatorWidth, indicatorX] = useMemo(() => {
    if (tabsWrapper.current && loaded) {
      const allTabs = Array.from(tabsWrapper.current.querySelectorAll('.header-tab'))
      const activeTab = allTabs[selectedIndex!]
      if (activeTab) {
        const newWidth = activeTab.getBoundingClientRect().width + 20
        const newX = sum(allTabs.slice(0, selectedIndex).map((x) => x.getBoundingClientRect().width + 20))
        return [newWidth, newX]
      }
    }
    return [0, 0]
  }, [selectedIndex, loaded])


  return (
    <TabList ref={tabsWrapper} className={className}>
      {tabs.map((tab, i) => (
        <TabButton
          className="header-tab"
          onClick={() => onChange(i)}
          active={selectedIndex === i}
          key={tab}
        >
          {tab}
        </TabButton>
      ))}
      <TabIndicator indicatorWidth={indicatorWidth} indicatorX={indicatorX} />
    </TabList>
  )
}

Tabs.TabButton = TabButton
Tabs.TabContent = TabContent

export default Tabs
