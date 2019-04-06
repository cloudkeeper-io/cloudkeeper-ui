import React, { Dispatch, memo, SetStateAction, useState } from 'react'

import { TENANT_KEY } from '../constants'
import { Tenant } from '../models'
import { safeParse } from '../utils'

interface TenantProviderProps {
  children: JSX.Element
}

interface TenantState {
  tenant: Tenant
  setTenant: Dispatch<SetStateAction<Tenant>>
  setAndSaveTenant: (tenant: Tenant) => void
}

const TenantContext = React.createContext({} as TenantState)

const TenantProvider = memo(({ children }: TenantProviderProps) => {
  const [tenant, setTenant] = useState(safeParse(localStorage.getItem(TENANT_KEY)!) || null)

  const setAndSaveTenant = (newTenant: Tenant) => {
    localStorage.setItem(TENANT_KEY, JSON.stringify(newTenant))
    setTenant(newTenant)
  }

  return (
    <TenantContext.Provider value={{ tenant, setTenant, setAndSaveTenant }}>
      {children}
    </TenantContext.Provider>
  )
})

const TenantConsumer = TenantContext.Consumer

export { TenantContext, TenantProvider, TenantConsumer }
