import React, { useState, memo, useEffect, useMemo, useCallback } from 'react'
import * as firebase from 'firebase/app'
import get from 'lodash/get'
import { ApolloProvider, useMutation } from 'react-apollo'
import { History } from 'history'
import ApolloClient from 'apollo-client'
import noop from 'lodash/noop'
import 'firebase/auth'
import 'firebase/firestore'

import { getFirebaseConfig, getApolloClient } from '../configs'
import { setUserId } from '../utils/amplitude'
import { generateTawkUserHash } from '../graphql/mutations'
import { setTawkUserDetails } from '../utils/tawk.util'

firebase.initializeApp(getFirebaseConfig())

// email SignUp
const signUp = async (email: string, password: string, subscribedToEmails: boolean) => {
  const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password)
  const db = firebase.firestore()
  const { user } = userCredential
  await Promise.all([
    user!.sendEmailVerification(),
    db.collection('users')
      .doc(user!.uid)
      .set({ isSubscribedToEmails: Boolean(subscribedToEmails), email: user!.email }),
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

  // Google SingIn
  const googleSignIn = useCallback(async () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    provider.addScope('https://www.googleapis.com/auth/userinfo.email')
    const result = await firebase.auth().signInWithPopup(provider)
    history.push('/')
    return result
  }, [history])

  // Github SingIn
  const githubSignIn = useCallback(async () => {
    const result = await firebase.auth().signInWithPopup(new firebase.auth.GithubAuthProvider())
    history.push('/')
    return result
  }, [history])

  useEffect(() => firebase.auth().onAuthStateChanged((newUser) => {
    setUserLoaded(true)
    setUser(newUser!)
    if (newUser) {
      setUserId(newUser.uid)
    }
  }), [])

  const client = useMemo(() => getApolloClient(async () => (user ? user!.getIdToken() : '')), [user])

  const [generateUserHash] = useMutation(generateTawkUserHash, { client })

  useEffect(() => {
    if (user) {
      generateUserHash().then((response) => {
        const hash = get(response, 'data.generateTawkUserHash')

        if (hash) {
          const email = user.email || get(user, 'providerData.0.email')
          setTawkUserDetails(email, hash, {
            userId: user.uid,
          })
        }
      })
    } else {
      setTawkUserDetails()
    }
  }, [generateUserHash, user])

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
