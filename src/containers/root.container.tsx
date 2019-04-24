import React, { lazy, Suspense, useContext, useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import first from 'lodash/first'

import NavbarLayout from '../components/layout/navbar-layout.component'
import LoadingPage from '../components/loading-page.component'
import { UserContext, TenantContext } from '../contexts'

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
    <Error title="404" text="Page not found" />
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
      <Error title="404" text="Page not found" />
    </Switch>
  )
}

export default () => {
  const { user, isUserLoaded, signOut } = useContext(UserContext)

  if (!isUserLoaded) {
    return <LoadingPage />
  }

  return (
    <NavbarLayout
      background={user ? '' : 'transparent'}
      user={user!}
      signOut={signOut}
    >
      <Suspense fallback={<LoadingPage />}>
        {user ? <AuthorizedRoutes /> : <AnonRoutes />}
      </Suspense>
    </NavbarLayout>
  )
}
