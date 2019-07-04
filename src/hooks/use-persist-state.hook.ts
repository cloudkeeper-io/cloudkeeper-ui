import React from 'react'

import { safeParse } from '../utils'

export const usePersistState = (localStorageKey: string, defaultValue: any = null) => {
  const [value, setValue] = React.useState(
    safeParse(localStorage.getItem(localStorageKey) || JSON.stringify(defaultValue)),
  )

  React.useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(value))
  }, [localStorageKey, value])

  return [value, setValue]
}
