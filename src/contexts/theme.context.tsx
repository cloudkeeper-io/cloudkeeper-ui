import React, { memo, useCallback, useMemo } from 'react'
import { ThemeProvider as StyledProvider } from 'styled-components/macro'
import { StylesProvider, ThemeProvider as MuiProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createMuiTheme, Theme } from '@material-ui/core'
import includes from 'lodash/includes'
import get from 'lodash/get'

import GlobalStyles from '../styles/global.styles'
import themes from '../styles/themes'
import { usePersistState } from '../hooks'
import { ThemeType } from '../models'

interface ThemeProviderProps {
  children: JSX.Element
}

interface ThemeState {
  theme: Theme
  themeType: ThemeType
  toggleTheme: () => void
}

const themeTypes = ['light', 'dark']

const ThemeContext = React.createContext({} as ThemeState)

const ThemeProvider = memo(({ children }: ThemeProviderProps) => {
  const [themeType, setTheme] = usePersistState('theme', 'dark')

  const theme = useMemo(() => createMuiTheme({
    palette: {
      type: includes(themeTypes, themeType) ? themeType : 'light',
      primary: { main: '#017EA7' },
      secondary: { main: '#000433' },
    },
  }), [themeType])

  const toggleTheme = useCallback(() => {
    setTheme((current: ThemeType) => (current === 'dark' ? 'light' : 'dark'))
  }, [setTheme])

  return (
    <ThemeContext.Provider value={{ theme, themeType, toggleTheme }}>
      <MuiProvider theme={theme}>
        <StylesProvider injectFirst>
          <StyledProvider theme={{ ...theme, ...get(themes, `[${theme.palette.type}]`, {}) }}>
            <>
              <GlobalStyles />
              <CssBaseline />
              {children}
            </>
          </StyledProvider>
        </StylesProvider>
      </MuiProvider>
    </ThemeContext.Provider>
  )
})

const ThemeConsumer = ThemeContext.Consumer

export { ThemeContext, ThemeProvider, ThemeConsumer }
