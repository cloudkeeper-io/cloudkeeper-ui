import React, { Dispatch, memo, SetStateAction, useState } from 'react'

import { TENANT_KEY } from '../constants'

interface TenantProviderProps {
  children: JSX.Element
}

interface TenantState {
  tenantId: string | null
  setTenant: Dispatch<SetStateAction<string | null>>
  setAndSaveTenant: (tenantId: string) => void
}

const TenantContext = React.createContext({} as TenantState)

const TenantProvider = memo(({ children }: TenantProviderProps) => {
  const [tenantId, setTenant] = useState(localStorage.getItem(TENANT_KEY) || null)

  const setAndSaveTenant = (newTenantId: string) => {
    localStorage.setItem(TENANT_KEY, newTenantId)
    setTenant(newTenantId)
  }

  return (
    <TenantContext.Provider value={{ tenantId, setTenant, setAndSaveTenant }}>
      {children}
    </TenantContext.Provider>
  )
})

const TenantConsumer = TenantContext.Consumer

export { TenantContext, TenantProvider, TenantConsumer }
