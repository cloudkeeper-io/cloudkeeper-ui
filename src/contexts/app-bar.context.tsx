import React, { Dispatch, memo, SetStateAction } from 'react'
import { usePersistState } from '../hooks'

interface AppBarProviderProps {
  children: React.ReactElement | React.ReactElement []
}

interface AppBarState {
  isExpanded: boolean
  setExpanded: Dispatch<SetStateAction<boolean>>
}

const AppBarContext = React.createContext({ isExpanded: true } as AppBarState)

const AppBarProvider = memo(({ children }: AppBarProviderProps) => {
  const [isExpanded, setExpanded] = usePersistState('appBarExpanded', true)

  return (
    <AppBarContext.Provider value={{ isExpanded, setExpanded }}>
      {children}
    </AppBarContext.Provider>
  )
})

export { AppBarContext, AppBarProvider }
