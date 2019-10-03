import React, { useState, useContext } from 'react'
import styled from 'styled-components/macro'
import { useQuery } from 'react-apollo'
import { Input } from '@material-ui/core'
import moment from 'moment'

import Loading from '../../components/spinners/loading.component'
import { dynamoTablesQuery } from '../../graphql'
import { Tenant } from '../../models'
import { TenantContext } from '../../contexts'
import { DateRange } from '../../components/datepicker/datepicker.component'
import { DataPageHeader } from '../../components/data-page-header/data-page-header.component'
import { DynamoTablesList } from './components'
import Card from '../../components/card.component'

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

export const DynamoTablesDataContainer = () => {
  const [{ startDate, endDate }, setDateRange] = useState<DateRange>({
    startDate: defaultStartDate,
    endDate: defaultEndDate,
  })

  const [filterInput, setFilterInput] = useState<string | undefined>(undefined)

  const { tenantId } = useContext(TenantContext)

  const { data, loading, error } = useQuery(dynamoTablesQuery, {
    variables: {
      tenantId,
      startDate: startDate && startDate.startOf('day').toISOString(),
      endDate: endDate && endDate.endOf('day').toISOString(),
    },
  })

  if (error) {
    throw error
  }

  return (
    <>
      <DataPageHeader
        title="DynamoDB Tables"
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
        {!loading && data && data.dynamoTablesList &&
        <DynamoTablesList tables={data.dynamoTablesList} filterInput={filterInput} />}
      </StyledCard>
    </>
  )
}
