import { Theme } from '@material-ui/core'

export const getTransition = (theme: Theme, units: string[]) => theme.transitions.create(units, {
  easing: theme.transitions.easing.sharp,
  duration: theme.transitions.duration.enteringScreen,
})

export const mobileMediaQuery = 'max-width: 800px'
