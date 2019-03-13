import React, { lazy, Suspense } from 'react'
import { Route, Router, Switch, Redirect } from 'react-router-dom'
import { History } from 'history'
import { Query } from 'react-apollo'

import { User } from '../models'
import NavbarLayout from '../components/layout/navbar-layout.component'
import LoadingPage from '../components/loading-page.component'
import Loading from '../components/loading.component'
import { tenantsQuery } from '../queries'

const Dashboard = lazy(() => import('./dashboard.container'))
const Login = lazy(() => import('./login.container'))
const Error = lazy(() => import('./error.container'))
const Settings = lazy(() => import('./settings.container'))

interface RootContainerProps {
  history: History
  user: User
}

const getRoutes = (user: User) => {
  if (user.session) {
    return (
      <Query query={tenantsQuery}>
        {({ data, loading, error }) => {
          if (loading) {
            return <Loading />
          }

          if (error) {
            throw error
          }

          const { tenants } = data

          return (
            <Switch>
              <Route exact path="/">
                <Redirect to="/dashboard" />
              </Route>
              <Route exact path="/dashboard">
                <Dashboard tenants={tenants} />
              </Route>
              <Route exact path="/settings">
                <Settings />
              </Route>
              <Route>
                <Error />
              </Route>
            </Switch>
          )
        }}
      </Query>
    )
  }

  return (
    <Switch>
      <Route exact path="/">
        <Login user={user} />
      </Route>
      <Route>
        <Error />
      </Route>
    </Switch>
  )
}

export default ({ history, user }: RootContainerProps) => {
  if (!user.isUserLoaded) {
    return <LoadingPage />
  }

  return (
    <Router history={history}>
      <NavbarLayout background={!user.session && 'transparent'} history={history} user={user}>
        <Suspense fallback={<LoadingPage />}>
          {getRoutes(user)}
        </Suspense>
      </NavbarLayout>
    </Router>
  )
}
