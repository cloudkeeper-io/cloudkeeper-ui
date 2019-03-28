import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { Query } from 'react-apollo'
import get from 'lodash/get'
import last from 'lodash/last'
import round from 'lodash/round'

import TotalInvocationsCard from '../components/data-cards/total-invocations-card.component'
import TopLambdasCard from '../components/data-cards/top-lambdas-card.component'
import Loading from '../components/loading.component'
import TimerComponent from '../components/timer.component'
import { dashboardQuery } from '../queries'
import { Tenant } from '../models'
import { useInterval } from '../hooks'
import { formatNumber, msToSeconds } from '../utils'

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
          return <Loading height="calc(100vh - 60px)" />
        }

        if (error) {
          throw error
        }

        const {
          totals,
          mostInvokedLambdas,
          slowestLambdas,
          mostErrorsLambdas,
          mostExpensiveLambdas,
        } = data.lambdasData.last24Hours

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
              <TotalInvocationsCard count={count} data={totals} />
              <TopLambdasCard
                header="Top 5 Most Invoked Lambdas"
                lambdaHeader="Most Invoked Lambdas Last 24h"
                unit="invocations"
                count={count}
                data={mostInvokedLambdas}
                summaryFormatter={x => `${x.invocations!.toLocaleString('ru')} invocations`}
                yAxisFormatter={x => formatNumber(x)}
                tooltipFormatter={x => Number(x).toLocaleString()}
              />
              <TopLambdasCard
                header="Top 5 Slowest Lambdas"
                lambdaHeader="Slowest Lambdas Last 24h"
                unit="averageDuration"
                count={count}
                data={slowestLambdas}
                summaryFormatter={x => `${msToSeconds(x.averageDuration!)} sec average`}
                yAxisFormatter={x => `${msToSeconds(x)}s`}
                tooltipFormatter={x => `${msToSeconds(x)}s`}
              />
              <TopLambdasCard
                header="Top 5 Most Faulty Lambdas"
                lambdaHeader="Most Faulty Lambdas Last 24h"
                unit="errors"
                count={count}
                data={mostErrorsLambdas}
                summaryFormatter={x => `${x.errors!.toLocaleString('ru')} errors`}
                yAxisFormatter={x => formatNumber(x)}
                tooltipFormatter={x => Number(x).toLocaleString()}
              />
              <TopLambdasCard
                header="Top 5 Most Expensive Lambdas"
                lambdaHeader="Most Expensive Lambdas Last 24h"
                unit="cost"
                count={count}
                data={mostExpensiveLambdas}
                summaryFormatter={x => `$ ${round(x.cost!, 2).toLocaleString('en')}`}
                yAxisFormatter={x => `$ ${round(x, 2).toLocaleString('en')}`}
                tooltipFormatter={x => `$${round(Number(x), 2).toLocaleString('en')}`}
              />
            </CardsWrapper>
          </Wrapper>
        )
      }}
    </Query>
  )
}
