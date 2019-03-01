import React, { lazy, Suspense } from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

const LoadingMessage = () => <div>Loading...</div>

const Dashboard = lazy(() => import('./dashboard.container'))
const Login = lazy(() => import('./login.container'))
const Error = lazy(() => import('./error.container'))

export default () => (
  <Router>
    <Suspense fallback={<LoadingMessage />}>
      <Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>
        <Route exact path="/login">
          <Login user={{} as any} />
        </Route>
        <Route>
          <Error />
        </Route>
      </Switch>
    </Suspense>
  </Router>
)
