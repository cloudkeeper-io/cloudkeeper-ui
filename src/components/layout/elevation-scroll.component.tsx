import React, { memo } from 'react'
import useScrollTrigger from '@material-ui/core/useScrollTrigger/useScrollTrigger'

interface Props {
  children: React.ReactElement
  threshold?: number,
  elevation?: number,
}

const defaultElevation = 4

export default memo(({ threshold, children, elevation = defaultElevation }: Props) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold,
  })

  const triggerValue = trigger ? defaultElevation : 0
  const elevationValue = threshold ? triggerValue : elevation

  return React.cloneElement(children, { elevation: elevationValue })
})
