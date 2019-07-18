import React, { useState, memo, useEffect, useContext, useMemo, useCallback } from 'react'
import * as firebase from 'firebase/app'
import noop from 'lodash/noop'
import 'firebase/firestore'

import { UserContext } from './user.context'

interface UserSettingsProviderProps {
  children: JSX.Element
}

export interface Settings {
  isSubscribedToEmails: boolean
}

interface UserSettingsState {
  settings: Settings
  updateSettings: (settings: Partial<Settings>) => Promise<any>
}

const db = firebase.firestore()

export const UserSettingsContext = React.createContext({} as UserSettingsState)

export const UserSettingsProvider = memo(({ children }: UserSettingsProviderProps) => {
  const [settings, setSettings] = useState({} as Settings)
  const { user } = useContext(UserContext)
  const settingsRef = useMemo(() => (user ? db.collection('users').doc(user.uid) : null), [user])

  const updateSettings = useCallback(async (newSettings: Partial<Settings>) => (
    // eslint-disable-next-line no-console
    settingsRef ? settingsRef.update(newSettings).catch(console.error) : null),
  [settingsRef])

  useEffect(() => {
    if (settingsRef && user) {
      const unsubscribe = settingsRef.onSnapshot((doc) => {
        setSettings(doc.data() as Settings)
      })
      return () => unsubscribe()
    }
    return noop
  }, [settingsRef, user])

  useEffect(() => {
    if (!settings && settingsRef) {
      settingsRef.set({ isSubscribedToEmails: false })
        .catch(console.error) // eslint-disable-line no-console
    }
  }, [settings, settingsRef])

  return (
    <UserSettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </UserSettingsContext.Provider>
  )
})
