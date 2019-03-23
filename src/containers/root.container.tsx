import React, { lazy, Suspense } from 'react'
import { Redirect, Route, Router, Switch } from 'react-router-dom'
import { History } from 'history'
import { Query } from 'react-apollo'
import isEmpty from 'lodash/isEmpty'

import { User } from '../models'
import NavbarLayout from '../components/layout/navbar-layout.component'
import LoadingPage from '../components/loading-page.component'
import { tenantsQuery } from '../queries'

const SetupTenant = lazy(() => import('./setup-tenant/setup-tenant.container'))
const Dashboard = lazy(() => import('./dashboard.container'))
const Login = lazy(() => import('./login/login.container'))
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
            return <LoadingPage />
          }

          if (error) {
            throw error
          }

          const { tenants } = data
          return (
            <Switch>
              {isEmpty(tenants) && (
                <Route exact path="/">
                  <SetupTenant />
                </Route>
              )}
              {!isEmpty(tenants) && (
                <Route exact path="/">
                  <Dashboard tenants={tenants} />
                </Route>
              )}
              <Route exact path="/settings">
                <Settings />
              </Route>
              <Route>
                <Redirect to="/" />
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
        {props => <Login user={user} {...props} />}
      </Route>
      <Route exact path="/sign-up">
        {props => <Login user={user} {...props} />}
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
      <NavbarLayout background={user.session ? '' : 'transparent'} history={history} user={user}>
        <Suspense fallback={<LoadingPage />}>
          {getRoutes(user)}
        </Suspense>
      </NavbarLayout>
    </Router>
  )
}
