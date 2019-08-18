import React, { useRef, useContext, useState } from 'react'
import styled from 'styled-components/macro'
import { useQuery } from 'react-apollo'
import useComponentSize from '@rehooks/component-size'
import get from 'lodash/get'
import round from 'lodash/round'
import moment from 'moment'

import { formatNumber } from '../../utils'
import Card from '../../components/card.component'
import ReactGridLayout from '../../components/grid-layout.component'
import { dashboardQuery } from '../../graphql/queries'
import { TenantContext } from '../../contexts'
import { useInterval } from '../../hooks'
import Processing from '../../components/processing.component'
import SetupTenant from './components/setup-tenant.component'
import Loading from '../../components/spinners/loading.component'
import TopDynamoCard from '../../components/data-cards/top-dynamo-card.component'
import { DashboardData } from '../../graphql/queries/dashboard/types/DashboardData'
import { DataPageHeader } from '../../components/data-page-header/data-page-header.component'
import { DateRange } from '../../components/datepicker/datepicker.component'
import { CostsPerService } from '../../components/data-cards/costs-per-service.component'
import { CostsPerStack } from '../../components/data-cards/costs-per-stack.component'
import { EventsCard } from '../../components/data-cards/events-card.component'
import { TrendsCard } from '../../components/data-cards/trends-card.component'

const Wrapper = styled.div`
  width: 100%;
  min-height: 100px;
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

const defaultStartDate = moment().subtract(6, 'days')
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
    { x: 0, y: 6, w: 12, h: 3, i: '5' },
  ],
  sm: [
    { x: 0, y: 0, w: 1, h: 2, i: '0' },
    { x: 5, y: 2, w: 1, h: 2, i: '1' },
    { x: 8, y: 3, w: 1, h: 4, i: '2' },
    { x: 0, y: 4, w: 1, h: 2, i: '3' },
    { x: 0, y: 5, w: 1, h: 2, i: '4' },
    { x: 0, y: 6, w: 1, h: 3, i: '5' },
  ],
}

export default () => {
  const [{ startDate, endDate }, setDateRange] = useState<DateRange>({
    startDate: defaultStartDate,
    endDate: defaultEndDate,
  })

  const wrapperRef = useRef<HTMLDivElement>(null)
  const { currentTenant, tenantId } = useContext(TenantContext)

  const { width } = useComponentSize(wrapperRef)

  const { data, loading, error, refetch } = useQuery<DashboardData>(dashboardQuery, {
    variables: { tenantId },
    pollInterval: POLL_INTERVAL,
  })

  const isProcessing = get(data, 'lambdasData.processing') || get(data, 'dynamoData.processing')

  useInterval(refetch, PROCESSING_REFETCH_DELAY, isProcessing)


  if (loading) {
    return (
      <Wrapper ref={wrapperRef}>
        <Loading height="calc(100vh - 60px)" />
      </Wrapper>
    )
  }

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

  if (!currentTenant!.isSetupCompleted) {
    return (
      <Wrapper ref={wrapperRef}>
        <Processing />
      </Wrapper>
    )
  }

  return (
    <Wrapper ref={wrapperRef}>
      <HeaderWrapper>
        <DataPageHeader
          title="Dashboard"
          startDate={startDate}
          endDate={endDate}
          onDateRangeChanged={(range) => setDateRange(range)}
        />
      </HeaderWrapper>
      {(width > 0) && (
        <ReactGridLayout
          layouts={defaultLayouts}
          breakpoints={{ lg: 1250, md: 1000, sm: 800 }}
          cols={{ lg: 12, md: 10, sm: 1 }}
          width={width}
          rowHeight={170}
          isDraggable={false}
          isResizable={false}
        >
          <Card key="0">
            <TopDynamoCard
              header="Read Heavy Tables"
              dynamoHeader="Most Read Table"
              units={[{ label: 'consumed', value: 'consumedRead' }, { label: 'provisioned', value: 'provisionedRead' }]}
              data={data!.dynamoData!.last30Days!.mostReadTables! as any}
              summaryFormatter={(x) => `${x.consumedRead!.toLocaleString('ru')} read units`}
              yAxisFormatter={(x) => formatNumber(x)}
              tooltipFormatter={(x) => Number(x).toLocaleString()}
              timeAxisFormat="LLL d"
              dynamoInfo={[
                { unit: 'consumedRead', text: 'total', valueFn: (x) => x.toLocaleString('ru') },
                {
                  unit: 'averageConsumedRead',
                  text: 'average',
                  valueFn: (x) => `${round(x, 2).toLocaleString('en')}/s`,
                },
              ]}
            />
          </Card>
          <Card key="1">
            <TopDynamoCard
              header="Expensive Tables"
              dynamoHeader="Most Expensive Table"
              units={[{ label: 'read price', value: 'readPrice' }, { label: 'write price', value: 'writePrice' }]}
              data={data!.dynamoData!.last30Days!.mostExpensiveTables as any}
              summaryFormatter={(x) => `$ ${(x.readPrice! + x.writePrice!).toLocaleString('en')}`}
              yAxisFormatter={(x) => `$ ${formatNumber(x)}`}
              tooltipFormatter={(x) => `$ ${Number(x).toLocaleString()}`}
              timeAxisFormat="LLL d"
              dynamoInfo={[
                { unit: 'readPrice', text: 'read price', valueFn: (x) => `$ ${x.toLocaleString('en')}` },
                { unit: 'writePrice', text: 'write price', valueFn: (x) => `$ ${x.toLocaleString('en')}` },
              ]}
            />
          </Card>
          <Card key="2">
            <EventsCard events={data!.events!.events!} />
          </Card>
          <Card key="3">
            <CostsPerService data={data!.costsData!.costsPerService!} />
          </Card>
          <Card key="4">
            <CostsPerStack data={data!.costsData!.costsPerStack!} />
          </Card>
          <Card key="5">
            <TrendsCard />
          </Card>
        </ReactGridLayout>
      )}
    </Wrapper>
  )
}
