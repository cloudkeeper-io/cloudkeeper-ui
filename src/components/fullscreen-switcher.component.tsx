import React from 'react'
import { IconButton } from '@material-ui/core'
import { useFullscreen, useToggle } from 'react-use'
import { Minimize, Maximize } from 'react-feather'

interface ThemeSwitcherProps {
  className?: string
}

export default ({ className }: ThemeSwitcherProps) => {
  const [show, toggle] = useToggle(false)
  const isFullscreen = useFullscreen({ current: document.body as any }, show, { onClose: () => toggle(false) })

  return (
    <IconButton onClick={toggle} className={className}>
      {isFullscreen ? <Minimize /> : <Maximize />}
    </IconButton>
  )
}
