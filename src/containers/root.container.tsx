import React, { memo, useContext } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Loadable from 'react-loadable'
import isEmpty from 'lodash/isEmpty'
import first from 'lodash/first'
import get from 'lodash/get'

import DrawerLayout from '../components/layout/drawer-layout/drawer-layout.component'
import ToolbarLayout from '../components/layout/toolbar-layout.component'
import LoadingPage from '../components/spinners/loading-page.component'
import { UserContext, TenantContext } from '../contexts'

const Login = Loadable({ loader: () => import('./login/login.container'), loading: LoadingPage })
const ForgotPassword = Loadable({ loader: () => import('./forgot-password.container'), loading: LoadingPage })

const Dashboard = Loadable({ loader: () => import('./dashboard/dashboard.container'), loading: LoadingPage })
const Lambdas = Loadable({ loader: () => import('./lambdas/lambdas.container'), loading: LoadingPage })
const DynamoTables = Loadable({ loader: () => import('./dynamo-tables/dynamo-tables.container'), loading: LoadingPage })
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
  const { tenants, loading, error, currentTenant } = useContext(TenantContext)

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
      <Route exact path="/tenant/:tenantId">
        <Dashboard />
      </Route>
      <Route exact path="/tenant/:tenantId/lambdas">
        <Lambdas tenants={tenants} />
      </Route>
      <Route exact path="/tenant/:tenantId/dynamo-tables">
        <DynamoTables tenants={tenants} />
      </Route>
      <Route exact path="/settings">
        <Settings />
      </Route>
      {!isEmpty(tenants) && (
        <Redirect from="/" to={`/tenant/${get(currentTenant, 'id') || first(tenants)!.id}`} />
      )}
      <Error title="404" text="Page not found" />
    </Switch>
  )
})

export default () => {
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
}
