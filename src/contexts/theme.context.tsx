import React, { memo, useState } from 'react'
import { ThemeProvider as StyledProvider } from 'styled-components/macro'

import themes from '../styles/themes'
import { THEME_KEY } from '../constants'

interface ThemeProviderProps {
  children: JSX.Element
}

interface ThemeState {
  theme: any
  toggleTheme: () => void
}

const initialTheme = (themes as any)[localStorage.getItem(THEME_KEY)!] || themes.dark
const ThemeContext = React.createContext({ theme: initialTheme } as ThemeState)

const ThemeProvider = memo(({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<any>(initialTheme)

  const toggleTheme = () => {
    setTheme((current: any) => {
      const newThemeKey = current === themes.dark ? 'light' : 'dark'
      localStorage.setItem(THEME_KEY, newThemeKey)
      return themes[newThemeKey]
    })
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <StyledProvider theme={theme}>
        {children}
      </StyledProvider>
    </ThemeContext.Provider>
  )
})

const ThemeConsumer = ThemeContext.Consumer

export { ThemeContext, ThemeProvider, ThemeConsumer }
