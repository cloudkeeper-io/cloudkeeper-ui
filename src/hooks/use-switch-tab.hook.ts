import { useEffect, useState } from 'react'

export function useSwitchTab(trigger: any, tabsAmount: number, initialState = 0): [number, (newTab: number) => void] {
  const [currentTab, setTab] = useState(initialState - 1)

  useEffect(() => {
    setTab((tab) => (tab + 1 >= tabsAmount ? 0 : tab + 1))
  }, [tabsAmount, trigger])

  return [currentTab > -1 ? currentTab : initialState, setTab]
}
