import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components/macro'
import { useQuery } from 'react-apollo-hooks'
import get from 'lodash/get'
import find from 'lodash/find'
import isBoolean from 'lodash/isBoolean'

import Loading from '../../components/loading.component'
import SetupTenant from '../settings/components/setup-tenant/setup-tenant.component'
import Processing from '../../components/processing.component'
import { Title } from '../../components/typography.component'
import { dashboardQuery } from '../../graphql'
import { Tenant } from '../../models'
import { TenantContext, TimerContext } from '../../contexts'
import { LambdasGraphs } from './dashboard-lambdas.cards'
import { DynamoGraphs } from './dashboard-dynamo.cards'
import { safeParse } from '../../utils'
import { useInterval } from '../../hooks'
import { TIMER_KEY } from '../../constants'

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: ${p => p.theme.dashboard.background};
  background-size: cover;
  z-index: 0;
`
const Wrapper = styled.div`
  position: relative;
  padding: 60px 20px 20px 20px;
  margin-top: -60px;
`
const StyledTitle = styled(Title)`
  display: flex;
  align-items: center;
  font-size: 18px;
  margin-bottom: 20px;
`
const CardsWrapper = styled.div`
  display: grid;
  grid-auto-rows: auto;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  grid-gap: 60px 60px;
  margin-bottom: 30px;
  @media(max-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
  }
`

const POLL_INTERVAL = 30 * 60 * 1000 // 30 min
const PROCESSING_REFETCH_DELAY = 10000 // 10 sec

interface DashboardProps {
  tenants: Tenant[]
}

export default ({ tenants }: DashboardProps) => {
  const [isDataLoaded, setDataLoaded] = useState(false)
  const { tenantId } = useContext(TenantContext)
  const tenant = find(tenants, { id: tenantId }) as Tenant

  const { count, setActive, setVisibility } = useContext(TimerContext)
  const { data, loading, error, refetch } = useQuery(dashboardQuery, {
    variables: { tenantId },
    pollInterval: POLL_INTERVAL,
  })

  const isProcessing = get(data, 'lambdasData.processing') || get(data, 'dynamoData.processing')

  useInterval(() => refetch(), PROCESSING_REFETCH_DELAY, isProcessing)

  useEffect(() => {
    const timerValue = safeParse(localStorage.getItem(TIMER_KEY)!)
    if (isDataLoaded) {
      setDataLoaded(true)
      setActive(isBoolean(timerValue) ? timerValue : true)
      setVisibility(true)
    }
    return () => {
      setActive(false)
      setVisibility(false)
    }
  }, [isDataLoaded, setActive, setVisibility])

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

  // onLoad Actions
  if (!isDataLoaded) {
    setDataLoaded(true)
  }

  return (
    <Wrapper>
      <Background />
      <StyledTitle>
        Last 24h
      </StyledTitle>
      <CardsWrapper>
        <LambdasGraphs timeAxisFormat="HH:mm" count={count} data={data.lambdasData.last24Hours} />
        <DynamoGraphs timeAxisFormat="HH:mm" count={count} data={data.dynamoData.last24Hours} />
      </CardsWrapper>
      <StyledTitle>
        Last 30 days
      </StyledTitle>
      <CardsWrapper>
        <LambdasGraphs timeAxisFormat="LLL d" count={count} data={data.lambdasData.last30Days} />
        <DynamoGraphs timeAxisFormat="LLL d" count={count} data={data.dynamoData.last30Days} />
      </CardsWrapper>
    </Wrapper>
  )
}
