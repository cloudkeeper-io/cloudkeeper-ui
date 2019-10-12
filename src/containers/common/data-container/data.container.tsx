import React, { useContext } from 'react'
import get from 'lodash-es/get'

import SetupTenant from '../../../components/tenant/setup-tenant.component'
import Processing from '../../../components/processing.component'
import { TenantContext } from '../../../contexts'
import { useInterval } from '../../../hooks'

interface DataContainerProps {
  children?: React.ReactNode
}

export const DataContainer = ({ children }: DataContainerProps) => {
  const { currentTenant, refetch } = useContext(TenantContext)

  const isProcessing = !get(currentTenant, 'initialProcessing.done', false)

  useInterval(refetch, 10000, isProcessing)

  if (!currentTenant.isSetupCompleted) {
    return <SetupTenant tenant={currentTenant} />
  }

  if (isProcessing) {
    return <Processing />
  }

  return (
    <>{children}</>
  )
}
