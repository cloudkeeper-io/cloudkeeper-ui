import React, { useState, useContext } from 'react'
import styled from 'styled-components/macro'
import { useQuery } from 'react-apollo'
import get from 'lodash/get'
import find from 'lodash/find'
import moment from 'moment'
import { Card } from '@material-ui/core'

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

const StyledCard = styled(Card)`
  border-radius: 10px;
  padding: 20px 40px;
  height: calc(100vh - 200px);
  overflow-y: auto;
  overflow-x: auto;
`

interface DashboardProps {
    tenants: Tenant[]
}

const defaultStartDate = moment().subtract(7, 'days')
const defaultEndDate = moment()

export default ({ tenants }: DashboardProps) => {
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

  if (error) {
    throw error
  }

  if (!tenant.isSetupCompleted) {
    return <SetupTenant tenant={tenant} />
  }

  if (isProcessing) {
    return <Processing />
  }

  return (
    <Wrapper>
      <DataPageHeader
        title="Lambdas"
        startDate={startDate}
        endDate={endDate}
        onDateRangeChanged={range => setDateRange(range)}
      />
      <StyledCard>
        {loading && <Loading height="calc(100vh - 300px)" />}
        {!loading && data && data.lambdasList && <LambdasList lambdas={data.lambdasList} />}
      </StyledCard>
    </Wrapper>
  )
}
