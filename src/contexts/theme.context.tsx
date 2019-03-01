/* eslint-disable react/no-unused-state,react/sort-comp */
import * as React from 'react'
import { ThemeProvider as StyledProvider } from 'styled-components/macro'

import { dark, light } from '../styles/themes'

interface ThemeProviderProps {
  children: JSX.Element
}

interface ThemeProviderState {
  theme: any
}

export const defaultThemeContext = {
  theme: dark,
  toggleTheme: () => {},
}

export const ThemeContext = React.createContext(defaultThemeContext)

export class ThemeProvider extends React.PureComponent<ThemeProviderProps, ThemeProviderState> {
  public toggleTheme = () => this.setState(
    state => ({ theme: state.theme === dark ? light : dark }),
  )

  public state = {
    theme: dark,
    toggleTheme: this.toggleTheme,
  }

  public render() {
    const { children } = this.props
    const { theme } = this.state
    return (
      <ThemeContext.Provider value={this.state}>
        <StyledProvider theme={theme}>
          {children}
        </StyledProvider>
      </ThemeContext.Provider>
    )
  }
}
