/* eslint-disable implicit-arrow-linebreak */

import { Theme } from '@material-ui/core'

const multiplier = 1.5

export const getClipPath = (x: number) =>
  `polygon(
    ${x * multiplier}px 0, 
    100% 0, 
    100% calc(100% - ${x}px), 
    calc(100% - ${x * multiplier}px) 100%, 
    0 100%, 
    0 ${x}px
)`

export const getBorderClipPath = (x: number, y: number) =>
  `polygon(
     0 ${x}px,
     ${x * multiplier}px 0,
     100% 0,
     100% calc(100% - ${x}px),
     calc(100% - ${x * multiplier}px) 100%,
     0 100%,
  
     0 calc(100% - ${y + y}px),
     calc(100% - ${x * multiplier + y}px) calc(100% - ${y + y}px),
     calc(100% - ${y + y}px) calc(100% - ${x + y}px),
     calc(100% - ${y + y}px) ${y + y}px,
     ${x * multiplier}px ${y + y}px, 
     ${y + y}px ${x + y}px, 
     ${y + y}px calc(100% - ${y}px), 
     0 100%
)`

export const getTransition = (theme: Theme, units: string[]) => theme.transitions.create(units, {
  easing: theme.transitions.easing.sharp,
  duration: theme.transitions.duration.enteringScreen,
})
