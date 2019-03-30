import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components/macro'
import { Query } from 'react-apollo'
import get from 'lodash/get'
import last from 'lodash/last'
import round from 'lodash/round'
import { Duration } from 'luxon'

import TotalInvocationsCard from '../components/data-cards/total-invocations-card.component'
import TopLambdasCard from '../components/data-cards/top-lambdas-card.component'
import Loading from '../components/loading.component'
import { dashboardQuery } from '../queries'
import { Tenant } from '../models'
import { formatNumber, msToSeconds } from '../utils'
import { TimerContext } from '../contexts'

const Wrapper = styled.div`
  position: relative;
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
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  grid-gap: 60px 60px;
  margin-bottom: 30px;
  @media(max-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
  }
`

interface DashboardProps {
  tenants: Tenant[]
}

export default ({ tenants }: DashboardProps) => {
  const [isDataLoaded, setDataLoaded] = useState(false)
  const { count, setActive, setVisibility } = useContext(TimerContext)

  useEffect(() => {
    if (isDataLoaded) {
      setDataLoaded(true)
      setActive(true)
      setVisibility(true)
    }
    return () => {
      setActive(false)
      setVisibility(false)
    }
  }, [isDataLoaded])

  return (
    <Query query={dashboardQuery} variables={{ tenantId: get(last(tenants), 'id') }}>
      {({ data, loading, error }) => {
        if (loading) {
          return <Loading height="calc(100vh - 60px)" />
        }

        if (error) {
          throw error
        }

        // onLoad Actions
        if (!isDataLoaded) {
          setDataLoaded(true)
          setActive(true)
        }

        const { last24Hours, last30Days } = data.lambdasData

        return (
          <Wrapper>
            <Title>
              Last 24h
            </Title>
            <CardsWrapper>
              <TotalInvocationsCard count={count} data={last24Hours.totals} />
              <TopLambdasCard
                header="Top 5 Most Invoked Lambdas"
                lambdaHeader="Most Invoked Lambdas Last 24h"
                unit="invocations"
                count={count}
                data={last24Hours.mostInvokedLambdas}
                summaryFormatter={x => `${x.invocations!.toLocaleString('ru')} invocations`}
                yAxisFormatter={x => formatNumber(x)}
                tooltipFormatter={x => Number(x).toLocaleString()}
                lambdaInfo={[
                  {
                    unit: 'invocations',
                    text: 'total',
                    valueFn: x => x.toLocaleString('ru'),
                  },
                  {
                    unit: 'invocationsPerSecond',
                    text: 'average',
                    valueFn: x => `${round(x * 60, 2).toLocaleString('en')}/min`,
                  },
                ]}
              />
              <TopLambdasCard
                header="Top 5 Slowest Lambdas"
                lambdaHeader="Slowest Lambdas Last 24h"
                unit="averageDuration"
                count={count}
                data={last24Hours.slowestLambdas}
                summaryFormatter={x => `${msToSeconds(x.averageDuration!)} sec average`}
                yAxisFormatter={x => `${msToSeconds(x)}s`}
                tooltipFormatter={x => `${msToSeconds(x)}s`}
                lambdaInfo={[
                  {
                    unit: 'averageDuration',
                    text: 'average',
                    valueFn: x => `${Duration.fromObject({ milliseconds: x }).toFormat('s')}s`,
                  },
                  {
                    unit: 'maxDuration',
                    text: 'max',
                    valueFn: x => `${Duration.fromObject({ milliseconds: x }).toFormat('s')}s`,
                  },
                ]}
              />
              <TopLambdasCard
                header="Top 5 Most Faulty Lambdas"
                lambdaHeader="Most Faulty Lambdas Last 24h"
                unit="errors"
                count={count}
                data={last24Hours.mostErrorsLambdas}
                summaryFormatter={x => `${x.errors!.toLocaleString('ru')} errors`}
                yAxisFormatter={x => formatNumber(x)}
                tooltipFormatter={x => Number(x).toLocaleString()}
                lambdaInfo={[
                  {
                    unit: 'errors',
                    text: 'total',
                    valueFn: x => x.toLocaleString('ru'),
                  },
                  {
                    unit: 'errorRate',
                    text: 'error rate',
                    valueFn: x => `${round(x, 2).toLocaleString('en')}%`,
                  },
                ]}
              />
              <TopLambdasCard
                header="Top 5 Most Expensive Lambdas"
                lambdaHeader="Most Expensive Lambdas Last 24h"
                unit="cost"
                count={count}
                data={last24Hours.mostExpensiveLambdas}
                summaryFormatter={x => `$ ${round(x.cost!, 2).toLocaleString('en')}`}
                yAxisFormatter={x => `$ ${round(x, 2).toLocaleString('en')}`}
                tooltipFormatter={x => `$${round(Number(x), 2).toLocaleString('en')}`}
                lambdaInfo={[
                  {
                    unit: 'cost',
                    text: '24h cost:',
                    valueFn: x => `$ ${round(x, 2).toLocaleString('en')}`,
                  },
                ]}
              />
            </CardsWrapper>
            <Title>
              Last 30 days
            </Title>
            <CardsWrapper>
              <TotalInvocationsCard count={count} data={last30Days.totals} />
              <TopLambdasCard
                header="Top 5 Most Invoked Lambdas"
                lambdaHeader="Most Invoked Lambdas Last 30 Days"
                unit="invocations"
                count={count}
                data={last30Days.mostInvokedLambdas}
                summaryFormatter={x => `${x.invocations!.toLocaleString('ru')} invocations`}
                yAxisFormatter={x => formatNumber(x)}
                tooltipFormatter={x => Number(x).toLocaleString()}
                lambdaInfo={[
                  {
                    unit: 'invocations',
                    text: 'total',
                    valueFn: x => x.toLocaleString('ru'),
                  },
                  {
                    unit: 'invocationsPerSecond',
                    text: 'average',
                    valueFn: x => `${round(x * 60, 2).toLocaleString('en')}/min`,
                  },
                ]}
              />
              <TopLambdasCard
                header="Top 5 Slowest Lambdas"
                lambdaHeader="Slowest Lambdas Last 30 Days"
                unit="averageDuration"
                count={count}
                data={last30Days.slowestLambdas}
                summaryFormatter={x => `${msToSeconds(x.averageDuration!)} sec average`}
                yAxisFormatter={x => `${msToSeconds(x)}s`}
                tooltipFormatter={x => `${msToSeconds(x)}s`}
                lambdaInfo={[
                  {
                    unit: 'averageDuration',
                    text: 'average',
                    valueFn: x => `${Duration.fromObject({ milliseconds: x }).toFormat('s')}s`,
                  },
                  {
                    unit: 'maxDuration',
                    text: 'max',
                    valueFn: x => `${Duration.fromObject({ milliseconds: x }).toFormat('s')}s`,
                  },
                ]}
              />
              <TopLambdasCard
                header="Top 5 Most Faulty Lambdas"
                lambdaHeader="Most Faulty Lambdas Last 30 Days"
                unit="errors"
                count={count}
                data={last30Days.mostErrorsLambdas}
                summaryFormatter={x => `${x.errors!.toLocaleString('ru')} errors`}
                yAxisFormatter={x => formatNumber(x)}
                tooltipFormatter={x => Number(x).toLocaleString()}
                lambdaInfo={[
                  {
                    unit: 'errors',
                    text: 'total',
                    valueFn: x => x.toLocaleString('ru'),
                  },
                  {
                    unit: 'errorRate',
                    text: 'error rate',
                    valueFn: x => `${round(x, 2).toLocaleString('en')}%`,
                  },
                ]}
              />
              <TopLambdasCard
                header="Top 5 Most Expensive Lambdas"
                lambdaHeader="Most Expensive Lambdas Last 30 Days"
                unit="cost"
                count={count}
                data={last30Days.mostExpensiveLambdas}
                summaryFormatter={x => `$ ${round(x.cost!, 2).toLocaleString('en')}`}
                yAxisFormatter={x => `$ ${round(x, 2).toLocaleString('en')}`}
                tooltipFormatter={x => `$${round(Number(x), 2).toLocaleString('en')}`}
                lambdaInfo={[
                  {
                    unit: 'cost',
                    text: 'monthly cost',
                    valueFn: x => `$ ${round(x, 2).toLocaleString('en')}`,
                  },
                ]}
              />
            </CardsWrapper>
          </Wrapper>
        )
      }}
    </Query>
  )
}
