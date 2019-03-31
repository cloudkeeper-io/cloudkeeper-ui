/* eslint-disable react/sort-comp,react/no-unused-state */
import React from 'react'
import { History } from 'history'
import { ApolloClient } from 'apollo-client'
import jwtDecode from 'jwt-decode'

import { User, Session } from '../models'
import { postLogin, postSignUp, updatedToken } from '../utils'
import { BACK_URL_KEY, SESSION_KEY } from '../constants'
import { getApolloClient } from '../apollo.config'

interface UserProviderProps {
  history: History
  children: (props: { user: User, client: ApolloClient<any> }) => JSX.Element
}

export const defaultUserContext = {
  loading: false,
  username: '',
  isUserLoaded: false,
} as User

export const UserContext = React.createContext(defaultUserContext)

const RESTRICTED_REDIRECT = ['/', '/sign-up']


export class UserProvider extends React.PureComponent<UserProviderProps, User> {
  public setUser = (user: Partial<User>) => this.setState(user as any)

  private setSession = async (session: Session) => {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    const { accessToken, refreshToken } = session
    const decodedToken = accessToken ? jwtDecode(accessToken) : {} as any
    const expiredAt = new Date(Number(decodedToken!.exp) * 1000).valueOf()

    if (expiredAt < Date.now() + 1000 * 60) {
      const updateResult = await updatedToken(refreshToken)
      console.log('Token Updated')
      const newSession = { refreshToken, accessToken: updateResult.accessToken }
      this.setUser({ session: newSession })
      return newSession
    }

    this.setUser({ session })
    return session
  }

  public getSession = async (): Promise<Session | null> => {
    const { session } = this.state

    try {
      const savedSession = session || JSON.parse(localStorage.getItem(SESSION_KEY)!)
      if (savedSession) {
        return await this.setSession(savedSession)
      }
    } catch (e) {
      const { pathname } = window.location
      if (!RESTRICTED_REDIRECT.includes(pathname)) {
        localStorage.setItem(BACK_URL_KEY, pathname)
      } else {
        return null
      }
    }

    await this.signOut()
    return null
  }

  private login = async (email: string, password: string) => {
    const { history } = this.props
    const backUrl = localStorage.getItem(BACK_URL_KEY)
    this.setUser({ loading: true })
    try {
      const session = await postLogin(email, password)
      localStorage.removeItem(BACK_URL_KEY)
      await this.setSession(session)
      history.push(backUrl || '/')
    } finally {
      this.setUser({ loading: false })
    }
  }

  private signUp = async (email: string, password: string) => {
    const { history } = this.props
    this.setUser({ loading: true })
    try {
      const session = await postSignUp(email, password)
      localStorage.removeItem(BACK_URL_KEY)
      await this.setSession(session)
      history.push('/')
    } finally {
      this.setUser({ loading: false })
    }
  }

  public signOut = async () => {
    const { history } = this.props
    const { session } = this.state

    try {
      if (session) {
        this.setUser({ session: null })
        localStorage.removeItem(SESSION_KEY)
        await this.client.resetStore()
      }
    } catch (e) {
      console.log('SignOut Error')
    } finally {
      localStorage.removeItem(SESSION_KEY)
      localStorage.removeItem('apollo-cache-persist')
    }

    if (!RESTRICTED_REDIRECT.includes(window.location.pathname)) {
      history.push('/')
    }
  }

  public getIdToken = async () => {
    const session = await this.getSession()
    return session ? session.accessToken : ''
  }

  public state = {
    ...defaultUserContext,
    loading: false,
    username: '',
    isUserLoaded: false,
    setUser: this.setUser,
    login: this.login,
    signUp: this.signUp,
    signOut: this.signOut,
  }

  public client = getApolloClient(this.getIdToken)

  public async componentDidMount() {
    await this.getSession()
    this.setUser({ isUserLoaded: true })
  }

  public render() {
    const { children } = this.props
    const element = React.cloneElement(children({ user: this.state, client: this.client }))
    return (
      <UserContext.Provider value={this.state}>
        {element}
      </UserContext.Provider>
    )
  }
}
