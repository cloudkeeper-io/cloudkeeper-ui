import React, { Dispatch, SetStateAction, useContext, useMemo, useEffect, memo } from 'react'
import useReactRouter from 'use-react-router'
import { useQuery } from 'react-apollo'
import get from 'lodash/get'
import find from 'lodash/find'
import some from 'lodash/some'

import { tenantsQuery } from '../graphql/queries'
import { UserContext } from './user.context'
import { Tenant } from '../models'
import { Tenants } from '../graphql/queries/types/Tenants'
import { usePersistState } from '../hooks'

interface TenantProviderProps {
  children: JSX.Element
}

interface TenantState {
  tenantId: string | null

  tenants: Tenant []
  loading: boolean
  error: any
  currentTenant: Tenant

  setTenant: Dispatch<SetStateAction<string | null>>
}

const TenantContext = React.createContext({} as TenantState)

const TenantProvider = memo(({ children }: TenantProviderProps) => {
  const { location: { pathname } } = useReactRouter()
  const [tenantId, setTenant] = usePersistState('tenant')
  const { user } = useContext(UserContext)
  const { data, loading, error } = useQuery<Tenants>(tenantsQuery, { skip: !user })

  const tenants = get(data, 'tenants', []) as Tenant []
  const currentTenant = useMemo(
    () => (find(tenants, { id: tenantId! }) || {}) as Tenant,
    [tenantId, tenants],
  )

  useEffect(() => {
    if (/^\/tenant\/[A-z0-9-]+/.test(pathname)) {
      const tenantIdPathParam = pathname.split('/')[2]

      if (tenantIdPathParam !== tenantId && some(tenants, { id: tenantIdPathParam })) {
        setTenant(tenantIdPathParam)
      }
    }
  }, [pathname, setTenant, tenantId, tenants])

  return (
    <TenantContext.Provider value={{ currentTenant, loading, error, tenants, tenantId, setTenant }}>
      {children}
    </TenantContext.Provider>
  )
})

export { TenantContext, TenantProvider }
