import React, { memo, useContext, useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import loadable from '@loadable/component'
import { isEmpty, first, get } from 'lodash-es'

import DrawerLayout from '../components/layout/drawer-layout/drawer-layout.component'
import LoadingPage from '../components/spinners/loading-page.component'
import { UserContext, TenantContext } from '../contexts'

const getLoadableContainer = (loader: any) => loadable(loader, {
  fallback: <LoadingPage />,
})

const Login = getLoadableContainer(() => import('./login/login.container')) as any
const ForgotPassword = getLoadableContainer(() => import('./forgot-password.container')) as any
const Dashboard = getLoadableContainer(() => import('./dashboard/dashboard.container')) as any
const Lambdas = getLoadableContainer(() => import('./lambdas/lambdas.container')) as any
const DynamoTables = getLoadableContainer(() => import('./dynamo-tables/dynamo-tables.container')) as any
const Settings = getLoadableContainer(() => import('./settings/settings.container')) as any
const Welcome = getLoadableContainer(() => import('./welcome.container')) as any
const Error = getLoadableContainer(() => import('./error.container')) as any
const Go = getLoadableContainer(() => import('./go.container')) as any

const AnonRoutes = memo(() => (
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
))

const AuthorizedRoutes = memo(() => {
  const { tenants, loading, error, currentTenant } = useContext(TenantContext)
  const { user } = useContext(UserContext)

  useEffect(() => {
    setTimeout(() => {
      [Dashboard, Lambdas, DynamoTables, Settings, Welcome].forEach((route) => route.preload())
    }, 300)
  }, [])

  if (loading) {
    return <LoadingPage height="calc(100vh - 64px)" />
  }

  if (error) {
    return (
      <Error text={get(error, 'message')} />
    )
  }

  return (
    <Switch>
      {isEmpty(tenants) && (
        <Route exact path="/">
          <Welcome />
        </Route>
      )}
      {!isEmpty(tenants) && (
        <Route exact path="/">
          <Redirect from="/" to={`/tenant/${get(currentTenant, 'id') || first(tenants)!.id}`} />
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
      {!user!.isAnonymous && (
        <Route exact path="/settings">
          <Settings />
        </Route>
      )}
      <Route path="/go">
        <Go />
      </Route>
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
