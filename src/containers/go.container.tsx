import React, { useContext, useEffect } from 'react'
import useReactRouter from 'use-react-router'
import { replace } from 'lodash-es'

import LoadingPage from '../components/spinners/loading-page.component'
import { UserContext } from '../contexts'

export default () => {
  const { user, signOut, isUserLoaded } = useContext(UserContext)
  const { history, location: { pathname } } = useReactRouter()

  useEffect(() => {
    if (isUserLoaded) {
      const path = pathname !== '/go' ? replace(pathname, 'go/', '') : '/'
      if (user!.isAnonymous) {
        signOut()
          .then(() => history.push(path))
      } else {
        history.push(path)
      }
    }
  }, [user, pathname, isUserLoaded, signOut, history])

  return <LoadingPage height="calc(100vh - 64px)" />
}
