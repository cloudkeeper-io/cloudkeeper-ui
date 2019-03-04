import * as React from 'react'
import { ThemeProvider as StyledProvider } from 'styled-components/macro'

import themes from '../styles/themes'
import { THEME_KEY } from '../constants'

interface ThemeProviderProps {
  children: JSX.Element
}

interface ThemeProviderState {
  theme: any
}

interface ThemeProviderAction {
  type: string
  payload?: any
}

interface ReducerState {
  state: ThemeProviderState,
  dispatch: React.Dispatch<ThemeProviderAction>
}

const initialState = {
  state: {
    // @ts-ignore
    theme: themes[localStorage.getItem(THEME_KEY)] || themes.dark,
  },
} as ReducerState

const ThemeContext = React.createContext(initialState)

const reducer = (state: ThemeProviderState, action: ThemeProviderAction) => {
  switch (action.type) {
    case 'toggle': {
      const theme = state.theme === themes.dark ? 'light' : 'dark'
      localStorage.setItem(THEME_KEY, theme)
      return { theme: themes[theme] }
    }
    default:
      return state
  }
}

const ThemeProvider = React.memo(({ children }: ThemeProviderProps) => {
  const [state, dispatch] = React.useReducer(reducer, initialState.state)

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      <StyledProvider theme={state.theme}>
        {children}
      </StyledProvider>
    </ThemeContext.Provider>
  )
})

const ThemeConsumer = ThemeContext.Consumer

export { ThemeContext, ThemeProvider, ThemeConsumer }
