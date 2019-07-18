import React, { memo, useContext, useEffect } from 'react'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import Loadable from 'react-loadable'
import isEmpty from 'lodash/isEmpty'
import first from 'lodash/first'

import DrawerLayout from '../components/layout/drawer-layout.component'
import ToolbarLayout from '../components/layout/toolbar-layout.component'
import LoadingPage from '../components/spinners/loading-page.component'
import { UserContext, TenantContext } from '../contexts'

const Login = Loadable({ loader: () => import('./login/login.container'), loading: LoadingPage })
const ForgotPassword = Loadable({ loader: () => import('./forgot-password.container'), loading: LoadingPage })

const Dashboard = Loadable({ loader: () => import('./dashboard/dashboard.container'), loading: LoadingPage })
const Settings = Loadable({ loader: () => import('./settings/settings.container'), loading: LoadingPage })
const Welcome = Loadable({ loader: () => import('./welcome.container'), loading: LoadingPage })

const Error = Loadable({ loader: () => import('./error.container'), loading: LoadingPage })


const AnonRoutes = memo(() => (
  <ToolbarLayout>
    <Switch>
      <Route exact path="/">
        <Login />
      </Route>
      <Route exact path="/sign-up">
        <Login />
      </Route>
      <Route exact path="/forgot-password">
        <ForgotPassword />
      </Route>
      <Error title="404" text="Page not found" />
    </Switch>
  </ToolbarLayout>
))

const AuthorizedRoutes = memo(() => {
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
          <Welcome />
        </Route>
      )}
      <Route exact path="/tenant/:tenantId/dashboard">
        <Dashboard tenants={tenants} />
      </Route>
      <Route exact path="/settings">
        <Settings />
      </Route>
      {currentTenant && (
        <Redirect from="/" to={`/tenant/${currentTenant.id}/dashboard`} />
      )}
      <Error title="404" text="Page not found" />
    </Switch>
  )
})

export default withRouter(() => {
  const { user, isUserLoaded } = useContext(UserContext)

  if (!isUserLoaded) {
    return <LoadingPage />
  }

  if (user) {
    return (
      <DrawerLayout>
        <AuthorizedRoutes />
      </DrawerLayout>
    )
  }

  return <AnonRoutes />
})
