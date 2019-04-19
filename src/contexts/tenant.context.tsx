import React, { Dispatch, SetStateAction, useState } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'

import { TENANT_KEY } from '../constants'

interface TenantProviderProps extends RouteComponentProps {
  children: JSX.Element
}

interface TenantState {
  tenantId: string | null
  setTenant: Dispatch<SetStateAction<string | null>>
  setAndSaveTenant: (tenantId: string) => void
}

const TenantContext = React.createContext({} as TenantState)

const anyWindow = window as any

const TenantProvider = withRouter<TenantProviderProps>(({ children }) => {
  const [tenantId, setTenant] = useState(localStorage.getItem(TENANT_KEY) || null)

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
    <TenantContext.Provider value={{ tenantId, setTenant, setAndSaveTenant }}>
      {children}
    </TenantContext.Provider>
  )
})

const TenantConsumer = TenantContext.Consumer

export { TenantContext, TenantProvider, TenantConsumer }
