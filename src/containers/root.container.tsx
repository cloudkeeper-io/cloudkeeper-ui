import React, { lazy, Suspense, useContext, useEffect } from 'react'
import { Redirect, Route, Router, Switch } from 'react-router-dom'
import { History } from 'history'
import { useQuery } from 'react-apollo-hooks'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import find from 'lodash/find'
import first from 'lodash/first'

import { Tenant } from '../models'
import NavbarLayout from '../components/layout/navbar-layout.component'
import LoadingPage from '../components/loading-page.component'
import { tenantsQuery } from '../graphql'
import { TenantContext, UserContext } from '../contexts'

const Dashboard = lazy(() => import('./dashboard/dashboard.container'))
const Login = lazy(() => import('./login/login.container'))
const Error = lazy(() => import('./error.container'))
const Settings = lazy(() => import('./settings/settings.container'))

interface RootContainerProps {
  history: History
}

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
  const { data, loading, error } = useQuery(tenantsQuery)
  const { tenantId, setAndSaveTenant } = useContext(TenantContext)

  const tenants = get(data, 'tenants', []) as Tenant []
  const tenant: Tenant = find(tenants, { id: tenantId }) as Tenant

  useEffect(() => {
    if (!isEmpty(tenants)) {
      if (!tenant) {
        setAndSaveTenant(first(tenants)!.id)
      }
    }
    if (isEmpty(tenants) && !loading) {
      setAndSaveTenant(null!)
    }
  },
  [tenant, loading, tenants, setAndSaveTenant])

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
        <Dashboard tenant={tenant} tenants={tenants} />
      </Route>
      <Route exact path="/settings">
        <Settings />
      </Route>
      {tenant && (
        <Redirect from="/" to={`/tenants/${tenant.id}/dashboard`} />
      )}
      <Redirect from="*" to="/" />
    </Switch>
  )
}

export default ({ history }: RootContainerProps) => {
  const { user, signOut } = useContext(UserContext)

  const { data } = useQuery(tenantsQuery)
  const tenants = get(data, 'tenants', []) as Tenant []

  if (!user.isUserLoaded) {
    return <LoadingPage />
  }

  return (
    <Router history={history}>
      <NavbarLayout background={user.session ? '' : 'transparent'} tenants={tenants} user={user} signOut={signOut}>
        <Suspense fallback={<LoadingPage />}>
          {user.session ? <AuthorizedRoutes /> : <AnonRoutes />}
        </Suspense>
      </NavbarLayout>
    </Router>
  )
}
