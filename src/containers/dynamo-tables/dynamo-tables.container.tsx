import React, { useState, useContext } from 'react'
import styled from 'styled-components/macro'
import { useQuery } from 'react-apollo'
import get from 'lodash/get'
import find from 'lodash/find'

import Loading from '../../components/spinners/loading.component'
import SetupTenant from '../dashboard/components/setup-tenant.component'
import Processing from '../../components/processing.component'
import { dynamoTablesQuery } from '../../graphql'
import { Tenant } from '../../models'
import { TenantContext } from '../../contexts'

const Wrapper = styled.div`
  position: relative;
  padding: 60px 20px 20px 20px;
  margin-top: -60px;
  overflow-x: hidden;
`

interface DashboardProps {
    tenants: Tenant[]
}

export default ({ tenants }: DashboardProps) => {
  const [isDataLoaded, setDataLoaded] = useState(false)
  const { tenantId } = useContext(TenantContext)
  const tenant = find<Tenant []>(tenants, { id: tenantId! }) as Tenant

  const { data, loading, error } = useQuery(dynamoTablesQuery, {
    variables: { tenantId },
  })

  const isProcessing = get(data, 'dynamoTablesList.processing') || get(data, 'dynamoTablesList.processing')

  if (loading && !isDataLoaded) {
    return <Loading height="calc(100vh - 60px)" />
  }

  if (error) {
    throw error
  }

  if (!tenant.isSetupCompleted) {
    return <SetupTenant tenant={tenant} />
  }

  if (isProcessing) {
    return <Processing />
  }

  if (!isDataLoaded) {
    setDataLoaded(true)
  }

  return (
    <Wrapper>
      {data && data.dynamoTablesList &&
      data.dynamoTablesList.map((lambda: any) => <div key={lambda.name}>{JSON.stringify(lambda)}</div>)}
    </Wrapper>
  )
}
