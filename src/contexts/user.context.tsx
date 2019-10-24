import React, { useState, memo, useEffect, useCallback } from 'react'
import * as firebase from 'firebase/app'
import get from 'lodash-es/get'
import { ApolloProvider, useMutation } from 'react-apollo'
import { History } from 'history'
import ApolloClient from 'apollo-client'
import noop from 'lodash-es/noop'
import 'firebase/auth'
import 'firebase/firestore'

import { getFirebaseConfig, getApolloClient } from '../configs'
import { setUserId } from '../utils/analytics'
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

// email SingIn
const demoSignIn = () => firebase.auth().signInAnonymously()


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
  demoLogin: () => Promise<void>
}

export const UserContext = React.createContext({} as UserState)

export const UserProvider = memo(({ children, history }: UserProviderProps) => {
  const [user, setUser] = useState<firebase.User>()
  const [isUserLoaded, setUserLoaded] = useState(false)
  const [client, setClient] = useState(getApolloClient(async () => (user ? user!.getIdToken() : '')))

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

  useEffect(() => firebase.auth().onAuthStateChanged(async (newUser) => {
    if (get(newUser, 'isAnonymous')) {
      const { mockClient } = await import('../__mocks__/client')
      setClient(mockClient)
    } else {
      setClient(getApolloClient(async () => (newUser ? newUser!.getIdToken() : '')))
    }

    setUserLoaded(true)
    setUser(newUser!)
    if (newUser) {
      setUserId(newUser.uid)
    }
  }), [])

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

  const demoLogin = async () => {
    const { mockClient } = await import('../__mocks__/client')
    setClient(mockClient)
    await demoSignIn()
  }

  return (
    <UserContext.Provider
      value={{
        user,
        demoLogin,
        isUserLoaded,
        signIn,
        signUp,
        signOut,
        googleSignIn,
        githubSignIn,
        updatePassword,
        resetPassword,
      }}
    >
      <ApolloProvider client={client}>
        {children}
      </ApolloProvider>
    </UserContext.Provider>
  )
})
