import React, { useState, memo, useEffect, useMemo, useCallback } from 'react'
import * as firebase from 'firebase/app'
import { ApolloProvider } from 'react-apollo'
import { History } from 'history'
import ApolloClient from 'apollo-client'
import noop from 'lodash/noop'
import 'firebase/auth'
import 'firebase/firestore'

import { getFirebaseConfig, getApolloClient } from '../configs'
import { setUserId } from '../utils/amplitude'

firebase.initializeApp(getFirebaseConfig())

// email SignUp
const signUp = async (email: string, password: string, subscribedToEmails: boolean) => {
  const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password)
  const db = firebase.firestore()
  const { user } = userCredential
  await Promise.all([
    user!.sendEmailVerification(),
    db.collection('users').doc(user!.uid).set({ isSubscribedToEmails: subscribedToEmails, email: user!.email }),
  ])
  return userCredential
}

// email SingIn
const signIn = (email: string, password: string) => firebase.auth().signInWithEmailAndPassword(email, password)

// signOut
const signOutAndResetApollo = async (client: ApolloClient<any>) => {
  try {
    firebase.auth().signOut()
    if (client) {
      await client.resetStore()
    }
  } finally {
    localStorage.removeItem('apollo-cache-persist')
  }
}

// Reset Password
const resetPassword = (email: string) => firebase.auth().sendPasswordResetEmail(email)

// Google SingIn
const googleSignIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider()
  provider.addScope('https://www.googleapis.com/auth/userinfo.email')
  return firebase.auth().signInWithPopup(provider)
}

// Github SingIn
const githubSignIn = () => firebase.auth().signInWithPopup(new firebase.auth.GithubAuthProvider())

interface UserProviderProps {
  children: JSX.Element
  history: History
}

interface UserState {
  isUserLoaded: boolean,
  user?: firebase.User,
  signIn: (email: string, password: string) => Promise<firebase.auth.UserCredential>
  signUp: (email: string, password: string, subscribedToEmails: boolean) => Promise<firebase.auth.UserCredential>
  googleSignIn: () => Promise<firebase.auth.UserCredential>
  githubSignIn: () => Promise<firebase.auth.UserCredential>
  updatePassword: (password: string, newPassword: string) => Promise<any>
  resetPassword: (email: string) => Promise<any>
  signOut: () => Promise<void>
}

export const UserContext = React.createContext({} as UserState)

export const UserProvider = memo(({ children, history }: UserProviderProps) => {
  const [user, setUser] = useState<firebase.User>()
  const [isUserLoaded, setUserLoaded] = useState(false)

  useEffect(() => firebase.auth().onAuthStateChanged((newUser) => {
    setUserLoaded(true)
    setUser(newUser!)
    if (newUser) {
      setUserId(newUser.uid)
    }
  }), [])

  const client = useMemo(() => getApolloClient(async () => (user ? user!.getIdToken() : '')), [user])

  const updatePassword = useCallback(async (password: string, newPassword: string) => {
    if (user && user.providerId === 'firebase') {
      await user.reauthenticateWithCredential(firebase.auth.EmailAuthProvider.credential(
        user.email!,
        password,
      ))
      return user.updatePassword(newPassword)
    }
    return noop
  }, [user])

  const signOut = useCallback(() => {
    setUser(null!)
    history.push('/')
    return signOutAndResetApollo(client)
  }, [client, history])

  return (
    <UserContext.Provider
      value={{ user, isUserLoaded, signIn, signUp, signOut, googleSignIn, githubSignIn, updatePassword, resetPassword }}
    >
      <ApolloProvider client={client}>
        {children}
      </ApolloProvider>
    </UserContext.Provider>
  )
})
