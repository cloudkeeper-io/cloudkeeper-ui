import React, { Dispatch, SetStateAction, useContext, useMemo, useEffect, useState, useCallback } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { useQuery } from 'react-apollo-hooks'
import get from 'lodash/get'
import find from 'lodash/find'
import includes from 'lodash/includes'

import { TENANT_KEY } from '../constants'
import { tenantsQuery } from '../graphql/queries'
import { UserContext } from './user.context'
import { Tenant } from '../models'
import { Tenants } from '../graphql/queries/types/Tenants'

interface TenantProviderProps extends RouteComponentProps {
  children: JSX.Element
}

interface TenantState {
  tenantId: string | null

  tenants: Tenant []
  loading: boolean
  error: any
  currentTenant?: Tenant

  setTenant: Dispatch<SetStateAction<string | null>>
  setAndSaveTenant: (tenantId: string) => void
}

const TenantContext = React.createContext({} as TenantState)

const TenantProvider = withRouter<TenantProviderProps>(({ children, location: { pathname } }) => {
  const [tenantId, setTenant] = useState(localStorage.getItem(TENANT_KEY) || null)
  const { user } = useContext(UserContext)
  const { data, loading, error } = useQuery<Tenants>(tenantsQuery, { skip: !user })
  const tenants = get(data, 'tenants', []) as Tenant []
  const currentTenant = useMemo(() => find<Tenant []>(tenants, { id: tenantId! }) as Tenant, [tenantId, tenants])

  const setAndSaveTenant = useCallback((newTenantId: string) => {
    localStorage.setItem(TENANT_KEY, newTenantId)
    setTenant(newTenantId)
  }, [setTenant])

  useEffect(() => {
    if (/^\/tenants\/[A-z0-9-]+\//.test(pathname)) {
      const tenantIdPathParam = pathname.split('/')[2]

      if (tenantIdPathParam !== tenantId && includes(tenants, { id: tenantIdPathParam })) {
        setAndSaveTenant(tenantIdPathParam)
      }
    }
  }, [pathname, setAndSaveTenant, tenantId, tenants])

  return (
    <TenantContext.Provider value={{ currentTenant, loading, error, tenants, tenantId, setTenant, setAndSaveTenant }}>
      {children}
    </TenantContext.Provider>
  )
})

const TenantConsumer = TenantContext.Consumer

export { TenantContext, TenantProvider, TenantConsumer }
