import React, { useRef, useContext, useState } from 'react'
import styled from 'styled-components/macro'
import { useQuery } from 'react-apollo'
import useComponentSize from '@rehooks/component-size'
import moment from 'moment'
import get from 'lodash/get'

import { getTimeAxisFormat } from '../../utils'
import Card from '../../components/card.component'
import ReactGridLayout from '../../components/grid-layout.component'
import { dashboardQuery } from '../../graphql/queries'
import { TenantContext } from '../../contexts'
import { useInterval } from '../../hooks'
import Processing from '../../components/processing.component'
import SetupTenant from './components/setup-tenant.component'
import Loading from '../../components/spinners/loading.component'
import { DashboardData } from '../../graphql/queries/dashboard/types/DashboardData'
import { DataPageHeader, DefinedDateRange } from '../../components/data-page-header/data-page-header.component'
import { CostsPerService } from '../../components/data-cards/costs-per-service.component'
import { CostsPerStack } from '../../components/data-cards/costs-per-stack.component'
import { EventsCard } from '../../components/data-cards/events-card.component'
import { TrendsCard } from '../../components/data-cards/trends-card/trends-card.component'
import LambdaSummaryCard from '../../components/data-cards/lambda-summary-card.component'
import { MostExpensiveCard } from '../../components/data-cards/most-expensive-card.component'
import { getTop2ExpensiveServiceData } from '../../components/data-cards/trends-card/trends-card.utils'

const Wrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 64px);
  overflow: hidden;
  
`
const HeaderWrapper = styled.div`
  padding: 0 28px 0;
  @media (max-width: 800px) {
    padding: 0 15px 0;
  }
`

const POLL_INTERVAL = 30 * 60 * 1000 // 30 min
const PROCESSING_REFETCH_DELAY = 10000 // 10 sec

const defaultStartDate = moment().subtract(6, 'days').startOf('day')
const defaultEndDate = moment()

const defaultLayouts = {
  lg: [
    { x: 0, y: 0, w: 4, h: 2, i: '0' },
    { x: 4, y: 0, w: 4, h: 2, i: '1' },
    { x: 8, y: 0, w: 4, h: 4, i: '2' },
    { x: 0, y: 2, w: 4, h: 2, i: '3' },
    { x: 4, y: 2, w: 4, h: 2, i: '4' },
    { x: 0, y: 4, w: 12, h: 2, i: '5' },
  ],
  md: [
    { x: 0, y: 0, w: 5, h: 2, i: '0', minH: 2, minW: 5 },
    { x: 5, y: 0, w: 5, h: 2, i: '1', minH: 2, minW: 5 },
    { x: 8, y: 0, w: 5, h: 4, i: '2' },
    { x: 0, y: 2, w: 5, h: 2, i: '3' },
    { x: 0, y: 4, w: 5, h: 2, i: '4' },
    { x: 0, y: 6, w: 12, h: 2, i: '5' },
  ],
  sm: [
    { x: 0, y: 0, w: 1, h: 2, i: '0' },
    { x: 5, y: 2, w: 1, h: 2, i: '1' },
    { x: 8, y: 3, w: 1, h: 4, i: '2' },
    { x: 0, y: 4, w: 1, h: 2, i: '3' },
    { x: 0, y: 5, w: 1, h: 2, i: '4' },
    { x: 0, y: 6, w: 1, h: 2, i: '5' },
  ],
}

export default () => {
  const [{ startDate, endDate }, setDateRange] = useState<DefinedDateRange>({
    startDate: defaultStartDate,
    endDate: defaultEndDate,
  })

  const wrapperRef = useRef<HTMLDivElement>(null)
  const { currentTenant, tenantId, refetch: refetchTenants } = useContext(TenantContext)

  const { width } = useComponentSize(wrapperRef)

  const { data, loading, error, refetch } = useQuery<DashboardData>(dashboardQuery, {
    variables: {
      tenantId,
      startDate: startDate.startOf('day').toISOString(true),
      endDate: endDate.endOf('day').toISOString(true),
    },
    pollInterval: POLL_INTERVAL,
  })

  const isProcessing = !get(currentTenant, 'initialProcessing.done', false)

  useInterval(refetchTenants, PROCESSING_REFETCH_DELAY, isProcessing)
  useInterval(refetch, POLL_INTERVAL, !isProcessing)

  if (error) {
    throw error
  }

  if (!currentTenant!.isSetupCompleted) {
    return (
      <Wrapper ref={wrapperRef}>
        <SetupTenant tenant={currentTenant!} />
      </Wrapper>
    )
  }

  if (isProcessing) {
    return (
      <Wrapper ref={wrapperRef}>
        <Processing />
      </Wrapper>
    )
  }

  const timeAxisFormat = getTimeAxisFormat(startDate, endDate)

  return (
    <Wrapper ref={wrapperRef}>
      <HeaderWrapper>
        <DataPageHeader
          title="Dashboard"
          startDate={startDate}
          endDate={endDate}
          onDateRangeChanged={setDateRange}
        />
      </HeaderWrapper>
      {loading && <Loading height="calc(100vh - 64px)" />}
      {!loading && (width > 0) && (
        <ReactGridLayout
          layouts={defaultLayouts}
          breakpoints={{ lg: 1250, md: 1000, sm: 800 }}
          cols={{ lg: 12, md: 10, sm: 1 }}
          width={width}
          rowHeight={170}
          margin={[16, 16]}
          isDraggable={false}
          isResizable={false}
        >
          <Card key="0">
            <LambdaSummaryCard
              count={2}
              data={data!.lambdaTotals!}
              timeAxisFormat={timeAxisFormat}
            />
          </Card>
          <Card key="1">
            <MostExpensiveCard
              lambdaData={data!.mostExpensiveLambdas!}
              dynamoData={data!.mostExpensiveDynamoTables}
            />
          </Card>
          <Card key="2">
            <EventsCard events={data!.events!} />
          </Card>
          <Card key="3">
            <CostsPerService timeAxisFormat={timeAxisFormat} data={data!.costsData!.costsPerService!} />
          </Card>
          <Card key="4">
            <CostsPerStack
              key={tenantId!}
              startDate={startDate!}
              endDate={endDate!}
              data={data!.costsData!.costsPerStack!}
            />
          </Card>
          <Card key="5">
            <TrendsCard
              trends={{
                costsData: data!.costsData!.costsPerService!,
                mostExpensiveCost: getTop2ExpensiveServiceData(data!.costsData!.costsPerService!),
                lambdasData: data!.lambdaTotals!.dataPoints,
              }}
              startDate={startDate}
              endDate={endDate}
              timeAxisFormat={timeAxisFormat}
            />
          </Card>
        </ReactGridLayout>
      )}
    </Wrapper>
  )
}
