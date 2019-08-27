import React, { useState, useContext } from 'react'
import styled from 'styled-components/macro'
import { useQuery } from 'react-apollo'
import get from 'lodash/get'
import moment from 'moment'

import { Input } from '@material-ui/core'
import Loading from '../../components/spinners/loading.component'
import SetupTenant from '../../components/tenant/setup-tenant.component'
import Processing from '../../components/processing.component'
import { lambdasListQuery } from '../../graphql'
import { TenantContext } from '../../contexts'
import { LambdasList } from './lambdas-list.component'
import { DataPageHeader } from '../../components/data-page-header/data-page-header.component'
import { DateRange } from '../../components/datepicker/datepicker.component'
import Card from '../../components/card.component'
import { useInterval } from '../../hooks'

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

const defaultStartDate = moment().subtract(6, 'days')
const defaultEndDate = moment()

export default () => {
  const [{ startDate, endDate }, setDateRange] = useState<DateRange>({
    startDate: defaultStartDate,
    endDate: defaultEndDate,
  })

  const [filterInput, setFilterInput] = useState<string | undefined>(undefined)

  const { currentTenant, refetch } = useContext(TenantContext)

  const { data, loading, error } = useQuery(lambdasListQuery, {
    variables: {
      tenantId: currentTenant.id,
      startDate: startDate && startDate.startOf('day').toISOString(),
      endDate: endDate && endDate.endOf('day').toISOString(),
    },
  })

  const isProcessing = !get(currentTenant, 'initialProcessing.done', false)

  useInterval(refetch, 10000, isProcessing)

  if (error) {
    throw error
  }

  if (!currentTenant.isSetupCompleted) {
    return <SetupTenant tenant={currentTenant} />
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
        onDateRangeChanged={setDateRange}
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
