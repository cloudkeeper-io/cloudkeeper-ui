import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components/macro'
import { useQuery } from 'react-apollo'
import get from 'lodash/get'

import Loading from '../../components/spinners/loading.component'
import SetupTenant from './components/setup-tenant.component'
import Processing from '../../components/processing.component'
import HeaderTabs, { TabContent } from '../../components/header-tabs.component'
import { Title } from '../../components/typography.component'
import { dashboardQuery } from '../../graphql'
import { TenantContext } from '../../contexts'
import { DynamoGraphs } from './dashboard-dynamo.cards'
import { useInterval } from '../../hooks'

const Wrapper = styled.div`
  position: relative;
  padding: 60px 20px 20px 20px;
  margin-top: -60px;
  overflow-x: hidden;
`
const StyledTitle = styled(Title)`
  margin: 20px 0;
`
const Hr = styled.div`
  position: relative;
  width: 100%;
  height: 4px;
  background: ${(p) => p.theme.dashboard.hr};
  margin-bottom: 30px;
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

export default () => {
  const [tab, setTab] = useState(0)
  const [isDataLoaded, setDataLoaded] = useState(false)
  const { tenantId, currentTenant } = useContext(TenantContext)

  const { data, loading, error, refetch } = useQuery(dashboardQuery, {
    variables: { tenantId },
    pollInterval: POLL_INTERVAL,
  })

  const isProcessing = get(data, 'lambdasData.processing') || get(data, 'dynamoData.processing')

  useInterval(refetch, PROCESSING_REFETCH_DELAY, isProcessing)

  useEffect(() => {
    if (isDataLoaded) {
      setDataLoaded(true)
      // setActive(true)
      // setVisibility(true)
    }
    return () => {
      // setActive(false)
      // setVisibility(false)
    }
  }, [isDataLoaded])

  if (loading && !isDataLoaded) {
    return <Loading height="calc(100vh - 60px)" />
  }

  if (error) {
    throw error
  }

  if (!currentTenant.isSetupCompleted) {
    return <SetupTenant tenant={currentTenant} />
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
      <StyledTitle>
        <HeaderTabs tabs={['Last 24h', 'Last 30 days']} selectedIndex={tab} onChange={(i) => setTab(i)} />
      </StyledTitle>
      <Hr />
      {tab === 0 && (
        <TabContent>
          <CardsWrapper>
            <DynamoGraphs timeAxisFormat="HH:mm" data={data.dynamoData.last24Hours} />
          </CardsWrapper>
        </TabContent>
      )}
      {tab === 1 && (
        <TabContent>
          <CardsWrapper>
            <DynamoGraphs timeAxisFormat="LLL d" data={data.dynamoData.last30Days} />
          </CardsWrapper>
        </TabContent>
      )}
    </Wrapper>
  )
}
