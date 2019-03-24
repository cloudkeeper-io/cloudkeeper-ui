import { useEffect, useState } from 'react'

export function useSwitchTab(trigger: any, tabsAmount: number, initialState = 0): [number, (newTab: number) => void] {
  const [currentTab, setTab] = useState(initialState - 1)

  useEffect(() => {
    setTab(currentTab + 1 >= tabsAmount ? 0 : currentTab + 1)
  }, [tabsAmount, trigger])

  return [currentTab, setTab]
}
