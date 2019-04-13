import React, { useState, useEffect, useCallback } from 'react'
import { History } from 'history'
import { ApolloClient } from 'apollo-client'
import jwtDecode from 'jwt-decode'

import { User, Session } from '../models'
import { postLogin, postSignUp, updatedToken } from '../utils'
import { BACK_URL_KEY, SESSION_KEY } from '../constants'
import { getApolloClient } from '../apollo.config'
import { setUserId, trackEvent } from '../utils/amplitude'

interface UserProviderProps {
  history: History
  children: (props: { client: ApolloClient<any> }) => JSX.Element
}

interface UserState {
  user: User,

  login: (email: string, password: string) => any
  signUp: (email: string, password: string, subscribedToEmails: boolean) => any
  signOut: () => void
}

export const UserContext = React.createContext({} as UserState)

const RESTRICTED_REDIRECT = ['/', '/sign-up']

export const UserProvider = ({ children, history }: UserProviderProps) => {
  const [user, setUser] = useState<User>({
    username: '',
    loading: false,
    isUserLoaded: false,
    session: null,
    apolloClient: null,
  })

  const signOut = useCallback(async () => {
    try {
      if (user.session) {
        setUser(current => ({ ...current, session: null }))
        localStorage.removeItem(SESSION_KEY)
        if (user.apolloClient) {
          await user.apolloClient.resetStore()
        }
      }
    } catch (e) {
      console.log('SignOut Error', e)
    } finally {
      localStorage.removeItem(SESSION_KEY)
      localStorage.removeItem('apollo-cache-persist')
    }

    if (!RESTRICTED_REDIRECT.includes(window.location.pathname)) {
      history.push('/')
    }
  }, [history, user.apolloClient, user.session])

  const setSession = async (session: Session) => {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    const { accessToken, refreshToken } = session
    const decodedToken = accessToken ? jwtDecode(accessToken) : {} as any
    const expiredAt = new Date(Number(decodedToken!.exp) * 1000).valueOf()

    if (expiredAt < Date.now() + 1000 * 60) {
      const updateResult = await updatedToken(refreshToken)
      console.log('Token Updated')
      const newSession = { refreshToken, accessToken: updateResult.accessToken }
      localStorage.setItem(SESSION_KEY, JSON.stringify(newSession))
      setUser(current => ({ ...current, session: newSession }))
      return newSession
    }
    setUser(current => ({ ...current, session }))
    return session
  }

  const getSession = useCallback(async (): Promise<Session | ''> => {
    try {
      const savedSession = JSON.parse(localStorage.getItem(SESSION_KEY)!)
      if (savedSession) {
        return await setSession(savedSession)
      }
    } catch (e) {
      localStorage.removeItem(SESSION_KEY)
      if (!RESTRICTED_REDIRECT.includes(window.location.pathname)) {
        setUser(current => ({ ...current, isUserLoaded: true }))
        history.push('/')
      }
    }
    return ''
  }, [history])

  const login = async (email: string, password: string) => {
    setUserId(email)
    trackEvent('User Logged In')
    const backUrl = localStorage.getItem(BACK_URL_KEY)
    setUser(current => ({ ...current, loading: true }))
    try {
      const session = await postLogin(email, password)
      localStorage.removeItem(BACK_URL_KEY)
      await setSession(session)
      history.push(backUrl || '/')
    } finally {
      setUser(current => ({ ...current, loading: false }))
    }
  }

  const signUp = async (email: string, password: string, subscribedToEmails: boolean) => {
    setUser(current => ({ ...current, loading: true }))
    try {
      const session = await postSignUp(email, password, subscribedToEmails)
      setUserId(email)
      trackEvent('User Signed Up')
      localStorage.removeItem(BACK_URL_KEY)
      await setSession(session)
      history.push('/')
    } finally {
      setUser(current => ({ ...current, loading: false }))
    }
  }

  useEffect((() => {
    const asyncFetchSession = async () => {
      await getSession()
      setUser(current => ({
        ...current,
        isUserLoaded: true,
        apolloClient: getApolloClient(async () => {
          const session = await getSession()
          return session ? session.accessToken : ''
        }),
      }))
    }

    // eslint-disable-next-line no-console
    asyncFetchSession().catch(console.log)
  }), [getSession])

  const element = React.cloneElement(children({ client: user.apolloClient! }))

  return (
    <UserContext.Provider value={{ user, login, signUp, signOut }}>
      {element}
    </UserContext.Provider>
  )
}
