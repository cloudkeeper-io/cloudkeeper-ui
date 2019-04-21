import React, { Dispatch, SetStateAction, useContext, useMemo, useState } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { useQuery } from 'react-apollo-hooks'
import get from 'lodash/get'
import find from 'lodash/find'

import { TENANT_KEY } from '../constants'
import { UserContext } from './user.context'
import { tenantsQuery } from '../graphql/queries'
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
  currentTenant: Tenant

  setTenant: Dispatch<SetStateAction<string | null>>
  setAndSaveTenant: (tenantId: string) => void
}

const TenantContext = React.createContext({} as TenantState)

const anyWindow = window as any

const TenantProvider = withRouter<TenantProviderProps>(({ children }) => {
  const [tenantId, setTenant] = useState(localStorage.getItem(TENANT_KEY) || null)
  const { user: { session } } = useContext(UserContext)
  const { data, loading, error } = useQuery<Tenants>(tenantsQuery, { skip: !session })
  const tenants = get(data, 'tenants', []) as Tenant []
  const currentTenant = useMemo(() => (find(tenants, { id: tenantId }) || {}) as Tenant, [tenantId, tenants])

  const setAndSaveTenant = (newTenantId: string) => {
    localStorage.setItem(TENANT_KEY, newTenantId)
    setTenant(newTenantId)
  }

  if (/^\/tenants\/[A-z0-9-]+\//.test(anyWindow.location.pathname)) {
    const tenantIdPathParam = anyWindow.location.pathname.split('/')[2]

    if (tenantIdPathParam !== tenantId) {
      setAndSaveTenant(tenantIdPathParam)
    }
  }

  return (
    <TenantContext.Provider value={{ currentTenant, loading, error, tenants, tenantId, setTenant, setAndSaveTenant }}>
      {children}
    </TenantContext.Provider>
  )
})

const TenantConsumer = TenantContext.Consumer

export { TenantContext, TenantProvider, TenantConsumer }
