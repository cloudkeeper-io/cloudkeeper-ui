import React, { useContext } from 'react'
import { IconButton } from '@material-ui/core'
import { Sun } from 'react-feather'

import { ThemeContext } from '../contexts'
import Icon from './icons/icon.component'

export default () => {
  const { toggleTheme, themeType } = useContext(ThemeContext)

  return (
    <IconButton onClick={toggleTheme}>
      {themeType === 'dark' ? <Sun /> : <Icon icon="darkSun" size={24} />}
    </IconButton>
  )
}
