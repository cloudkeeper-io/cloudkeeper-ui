import React, { useState, useContext } from 'react'
import styled from 'styled-components/macro'
import { useQuery } from 'react-apollo'
import get from 'lodash/get'
import find from 'lodash/find'
import moment from 'moment'

import Loading from '../../components/spinners/loading.component'
import SetupTenant from '../dashboard/components/setup-tenant.component'
import Processing from '../../components/processing.component'
import { lambdasListQuery } from '../../graphql'
import { Tenant } from '../../models'
import { TenantContext } from '../../contexts'
import { LambdasList } from './lambdas-list.component'
import { DataPageHeader } from '../../components/data-page-header/data-page-header.component'
import { DateRange } from '../../components/datepicker/datepicker.component'

const Wrapper = styled.div`
  position: relative;
  padding: 60px 28px 20px 28px;
  margin-top: -60px;
  overflow-x: hidden;
`

interface DashboardProps {
    tenants: Tenant[]
}

const defaultStartDate = moment().subtract(7, 'days')
const defaultEndDate = moment()

export default ({ tenants }: DashboardProps) => {
  const [isDataLoaded, setDataLoaded] = useState(false)

  const [{ startDate, endDate }, setDateRange] = useState<DateRange>({
    startDate: defaultStartDate,
    endDate: defaultEndDate,
  })

  const { tenantId } = useContext(TenantContext)
  const tenant = find<Tenant []>(tenants, { id: tenantId! }) as Tenant

  const { data, loading, error } = useQuery(lambdasListQuery, {
    variables: {
      tenantId,
      startDate: startDate && startDate.format('YYYY-MM-DD'),
      endDate: endDate && endDate.format('YYYY-MM-DD'),
    },
  })

  const isProcessing = get(data, 'lambdasListQuery.processing') || get(data, 'lambdasListQuery.processing')

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
      <DataPageHeader
        title="Lambdas"
        startDate={startDate}
        endDate={endDate}
        onDateRangeChanged={range => setDateRange(range)}
      />
      {data && data.lambdasList && <LambdasList lambdas={data.lambdasList} />}
    </Wrapper>
  )
}
