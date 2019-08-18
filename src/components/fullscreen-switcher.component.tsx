import React, { useCallback, useEffect, useState } from 'react'
import { IconButton } from '@material-ui/core'
import screenfull from 'screenfull'
import { Minimize, Maximize } from 'react-feather'
import noop from 'lodash/noop'

interface ThemeSwitcherProps {
  className?: string
}

export default ({ className }: ThemeSwitcherProps) => {
  const [isFullscreen, setFullscreen] = useState(false)

  const toggleFullscreen = useCallback(() => setFullscreen((current) => !current), [setFullscreen])

  useEffect(() => {
    if (screenfull) {
      screenfull.on('change', toggleFullscreen)
    }
    return () => {
      if (screenfull) {
        screenfull.off('change', toggleFullscreen)
      }
    }
  }, [toggleFullscreen])

  return (
    <IconButton onClick={() => (screenfull ? screenfull.toggle() : noop())} className={className}>
      {isFullscreen ? <Minimize /> : <Maximize />}
    </IconButton>
  )
}
