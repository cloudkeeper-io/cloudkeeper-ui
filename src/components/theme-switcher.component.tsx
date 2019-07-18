import React, { useContext } from 'react'
import { IconButton } from '@material-ui/core'
import { Sun } from 'react-feather'

import { ThemeContext } from '../contexts'
import Icon from './icons/icon.component'

interface ThemeSwitcherProps {
  className?: string
}

export default ({ className }: ThemeSwitcherProps) => {
  const { toggleTheme, themeType } = useContext(ThemeContext)

  return (
    <IconButton onClick={toggleTheme} className={className}>
      {themeType === 'dark' ? <Sun /> : <Icon icon="darkSun" size={24} />}
    </IconButton>
  )
}
