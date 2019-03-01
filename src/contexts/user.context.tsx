/* eslint-disable react/sort-comp,react/no-unused-state */
import * as React from 'react'
import { History } from 'history'

import { User } from '../models'

interface UserProviderProps {
  history: History
  children: (props: { user: User }) => JSX.Element
}

export const defaultUserContext = {
  loading: false,
  username: '',
  isUserLoaded: false,
} as User

export const UserContext = React.createContext(defaultUserContext)

export class UserProvider extends React.PureComponent<UserProviderProps, User> {
  public setUser = (user: Partial<User>) => this.setState(user as any)

  public getUser = () => this.state

  public getSession = async () => {
    const { session } = this.state

    try {
      console.log(session)
      // if (session) {
      //   const token = session.getIdToken()
      //   const expiredAt = token.getExpiration() * 1000
      //
      //   if (expiredAt < Date.now() + 1000 * 60) {
      //     console.log('Token Updated')
      //     const newSession = await refreshSession(session!.getRefreshToken())
      //     this.setUser({ session: newSession })
      //     return newSession.getIdToken().getJwtToken()
      //   }
      //   return token.getJwtToken()
      // }
    } catch (e) {
      console.log('Token Update Error')
    }

    await this.signOut()
    return ''
  }

  private login = async (email: string, password: string) => {
    console.log(email)
    console.log(password)
    // const backUrl = localStorage.getItem('backUrl')
    // this.setUser({ loading: true })
    // try {
    //   await postLogin(email, password)
    //   await this.loadCognitoUser()
    //   localStorage.setItem('backUrl', '')
    //   this.props.history.push(backUrl || '/')
    // } finally {
    //   this.setUser({ loading: false })
    // }
  }

  public signOut = async () => {
    const { history } = this.props

    // try {
    //   if (cognitoUser) {
    //     cognitoUser.signOut()
    //     this.setUser({ cognitoUser: null })
    //     await this.client.resetStore()
    //   }
    // } catch (e) {
    //   console.log('SignOut Error')
    // } finally {
    //   localStorage.clear()
    // }

    history.push('/')
  }


  public state = {
    ...defaultUserContext,
    setUser: this.setUser,
    getUser: this.getUser,
    login: this.login,
    signOut: this.signOut,
  }

  public async componentDidMount() {
    await this.getSession()
  }

  public render() {
    const { children } = this.props
    const element = React.cloneElement(children({ user: this.state }))
    return (
      <UserContext.Provider value={this.state}>
        {element}
      </UserContext.Provider>
    )
  }
}
