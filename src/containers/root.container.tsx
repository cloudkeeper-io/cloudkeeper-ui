import React, { lazy, Suspense } from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import { History } from 'history'

import { User } from '../models'
import LoadingPage from '../components/loading-page.component'

const Dashboard = lazy(() => import('./dashboard.container'))
const Login = lazy(() => import('./login.container'))
const Error = lazy(() => import('./error.container'))

interface RootContainerProps {
  history: History
  user: User
}

export default ({ history, user }: RootContainerProps) => {
  if (!user.isUserLoaded) {
    return <LoadingPage />
  }

  if (user.session) {
    return (
      <Router history={history}>
        <Suspense fallback={<LoadingPage />}>
          <Switch>
            <Route exact path="/">
              <Dashboard user={user} />
            </Route>
            <Route>
              <Error />
            </Route>
          </Switch>
        </Suspense>
      </Router>
    )
  }

  return (
    <Router history={history}>
      <Suspense fallback={<LoadingPage />}>
        <Switch>
          <Route exact path="/">
            <Login user={user} />
          </Route>
          <Route>
            <Error />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  )
}
