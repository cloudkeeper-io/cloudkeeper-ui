import React, { lazy, Suspense, useContext, useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import first from 'lodash/first'

import NavbarLayout from '../components/layout/navbar-layout.component'
import LoadingPage from '../components/loading-page.component'
import { TenantContext, UserContext } from '../contexts'

const Dashboard = lazy(() => import('./dashboard/dashboard.container'))
const Login = lazy(() => import('./login/login.container'))
const Error = lazy(() => import('./error.container'))
const Settings = lazy(() => import('./settings/settings.container'))

const AnonRoutes = () => (
  <Switch>
    <Route exact path="/">
      {props => <Login {...props} />}
    </Route>
    <Route exact path="/sign-up">
      {props => <Login {...props} />}
    </Route>
    <Route>
      <Error />
    </Route>
  </Switch>
)

const AuthorizedRoutes = () => {
  const { tenants, loading, error, currentTenant, setAndSaveTenant } = useContext(TenantContext)

  useEffect(() => {
    if (!isEmpty(tenants)) {
      if (!currentTenant) {
        setAndSaveTenant(first(tenants)!.id)
      }
    }
    if (isEmpty(tenants) && !loading) {
      setAndSaveTenant(null!)
    }
  },
  [currentTenant, loading, tenants, setAndSaveTenant])

  if (loading) {
    return <LoadingPage height="calc(100vh - 80px)" />
  }

  if (error) {
    throw error
  }

  return (
    <Switch>
      {isEmpty(tenants) && (
        <Route exact path="/">
          <Settings />
        </Route>
      )}
      <Route exact path="/tenants/:tenantId/dashboard">
        <Dashboard tenants={tenants} />
      </Route>
      <Route exact path="/settings">
        <Settings />
      </Route>
      {currentTenant && (
        <Redirect from="/" to={`/tenants/${currentTenant.id}/dashboard`} />
      )}
      <Redirect from="*" to="/" />
    </Switch>
  )
}

export default () => {
  const { user, signOut } = useContext(UserContext)

  if (!user.isUserLoaded) {
    return <LoadingPage />
  }

  return (
    <NavbarLayout
      background={user.session ? '' : 'transparent'}
      user={user}
      signOut={signOut}
    >
      <Suspense fallback={<LoadingPage />}>
        {user.session ? <AuthorizedRoutes /> : <AnonRoutes />}
      </Suspense>
    </NavbarLayout>
  )
}
