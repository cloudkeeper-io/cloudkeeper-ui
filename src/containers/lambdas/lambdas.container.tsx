import React, { useState, useContext } from 'react'
import styled from 'styled-components/macro'
import { useQuery } from 'react-apollo'
import get from 'lodash/get'
import find from 'lodash/find'
import moment from 'moment'

import { Input } from '@material-ui/core'
import Loading from '../../components/spinners/loading.component'
import SetupTenant from '../../components/tenant/setup-tenant.component'
import Processing from '../../components/processing.component'
import { lambdasListQuery } from '../../graphql'
import { Tenant } from '../../models'
import { TenantContext } from '../../contexts'
import { LambdasList } from './lambdas-list.component'
import { DataPageHeader } from '../../components/data-page-header/data-page-header.component'
import { DateRange } from '../../components/datepicker/datepicker.component'
import Card from '../../components/card.component'

const Wrapper = styled.div`
  position: relative;
  padding: 0 28px 20px;
  overflow-x: hidden;
  height: calc(100vh - 64px);
  @media (max-width: 800px) {
    padding: 0 15px 20px;
  }
`

const StyledCard = styled(Card)`
  padding: 20px 40px;
  height: calc(100vh - 240px);
  overflow: auto;
  @media (max-width: 800px) {
    height: calc(100vh - 300px);
  }
`

const SearchWrapper = styled.div`
  padding: 0 0 30px 0;
`

interface DashboardProps {
    tenants: Tenant[]
}

const defaultStartDate = moment().subtract(6, 'days')
const defaultEndDate = moment()

export default ({ tenants }: DashboardProps) => {
  const [{ startDate, endDate }, setDateRange] = useState<DateRange>({
    startDate: defaultStartDate,
    endDate: defaultEndDate,
  })

  const [filterInput, setFilterInput] = useState<string | undefined>(undefined)

  const { tenantId } = useContext(TenantContext)
  const tenant = find<Tenant []>(tenants, { id: tenantId! }) as Tenant

  const { data, loading, error } = useQuery(lambdasListQuery, {
    variables: {
      tenantId,
      startDate: startDate && startDate.startOf('day').toISOString(),
      endDate: endDate && endDate.endOf('day').toISOString(),
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
        onDateRangeChanged={(range) => setDateRange(range)}
      />
      <SearchWrapper>
        <Input
          placeholder="Search"
          onChange={(event) => setFilterInput(event.target.value)}
        />
      </SearchWrapper>
      <StyledCard>
        {loading && <Loading height="calc(100vh - 300px)" />}
        {!loading && data && data.lambdasList && <LambdasList lambdas={data.lambdasList} filterInput={filterInput} />}
      </StyledCard>
    </Wrapper>
  )
}
