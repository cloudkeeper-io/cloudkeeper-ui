import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { Query } from 'react-apollo'
import get from 'lodash/get'
import last from 'lodash/last'

import InvocationsCard from '../components/data-cards/invocations-card.component'
import Loading from '../components/loading.component'
import TimerComponent from '../components/timer.component'
import { dashboardQuery } from '../queries'
import { Tenant } from '../models'
import { useInterval } from '../hooks'


const Wrapper = styled.div`
  padding: 0 20px 20px 20px;
`
const Title = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  margin-bottom: 20px;
  filter: blur(0.25px);
`
const CardsWrapper = styled.div`
  display: grid;
  grid-auto-rows: auto;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-gap: 60px 60px;
  @media(max-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
  }
`
const Timer = styled(TimerComponent)`
  margin-left: 10px;
`

const DELAY = 10000

interface DashboardProps {
  tenants: Tenant[]
}

export default ({ tenants }: DashboardProps) => {
  const [count, setCount] = useState(1)
  const [isSwitchEnabled, setSwitchStatus] = useState(true)

  useInterval(() => {
    setCount(count + 1)
  }, DELAY, isSwitchEnabled)

  return (
    <Query query={dashboardQuery} variables={{ tenantId: get(last(tenants), 'id') }}>
      {({ data, loading, error }) => {
        if (loading) {
          return <Loading />
        }

        if (error) {
          throw error
        }

        const { totals } = data.dashboardData.last24Hours

        return (
          <Wrapper>
            <Title>
              Last 24h
              <Timer
                key={count}
                time={DELAY}
                size={40}
                active={isSwitchEnabled}
                onClick={() => setSwitchStatus(!isSwitchEnabled)}
              />
            </Title>
            <CardsWrapper>
              <InvocationsCard count={count} data={totals} />
              <InvocationsCard count={count} data={totals} />
            </CardsWrapper>
          </Wrapper>
        )
      }}
    </Query>
  )
}
