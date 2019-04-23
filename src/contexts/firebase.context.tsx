import React, { useState, memo, useEffect, useMemo } from 'react'
import * as firebase from 'firebase/app'
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import 'firebase/auth'
import 'firebase/database'

import { getFirebaseConfig, getApolloClient } from '../configs'

firebase.initializeApp(getFirebaseConfig())

// email SignUp
const signUp = async (email: string, password: string, subscribedToEmails: boolean) => {
  const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password)
  const { user } = userCredential
  const userId = user!.uid
  const saveResult = await firebase.database().ref(`users/${userId}`).set({ subscribedToEmails })
  await user!.sendEmailVerification()
  console.log(saveResult)
  return userCredential
}

// email SingIn
const signIn = async (email: string, password: string) => firebase.auth().signInWithEmailAndPassword(email, password)

// signOut
const signOut = () => firebase.auth().signOut()

// Google SingIn
const googleSignIn = () => firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())

// Github SingIn
const githubSignIn = () => firebase.auth().signInWithPopup(new firebase.auth.GithubAuthProvider())

interface FirebaseProviderProps {
  children: JSX.Element
}

interface FirebaseState {
  isUserLoaded: boolean,
  user?: firebase.User,
  signIn: (email: string, password: string) => Promise<firebase.auth.UserCredential>
  signUp: (email: string, password: string, subscribedToEmails: boolean) => Promise<firebase.auth.UserCredential>
  googleSignIn: () => Promise<firebase.auth.UserCredential>
  githubSignIn: () => Promise<firebase.auth.UserCredential>
  signOut: () => Promise<void>
}

export const FirebaseContext = React.createContext({} as FirebaseState)

export const FirebaseProvider = memo(({ children }: FirebaseProviderProps) => {
  const [user, setUser] = useState<firebase.User>()
  const [isUserLoaded, setUserLoaded] = useState(false)

  useEffect(() => firebase.auth().onAuthStateChanged((newUser) => {
    setUserLoaded(true)
    setUser(newUser!)
  }), [])

  const client = useMemo(() => getApolloClient(async () => (user ? user!.getIdToken() : '')), [user])

  return (
    <FirebaseContext.Provider value={{ user, isUserLoaded, signIn, signUp, signOut, googleSignIn, githubSignIn }}>
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>
          {children}
        </ApolloHooksProvider>
      </ApolloProvider>
    </FirebaseContext.Provider>
  )
})
