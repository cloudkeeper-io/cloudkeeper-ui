import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components/macro'
import { Query } from 'react-apollo'
import get from 'lodash/get'
import last from 'lodash/last'
import isBoolean from 'lodash/isBoolean'

import Loading from '../../components/loading.component'
import { dashboardQuery } from '../../graphql'
import { Tenant } from '../../models'
import { TimerContext } from '../../contexts'
import { LambdasGraphs } from './dashboard-lambdas.cards'
import { DynamoGraphs } from './dashboard-dynamo.cards'
import { safeParse } from '../../utils'
import { TIMER_KEY } from '../../constants'

const Wrapper = styled.div`
  position: relative;
  padding: 0 20px 20px 20px;
`
const Title = styled.div`
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

interface DashboardProps {
  tenants: Tenant[]
}

export default ({ tenants }: DashboardProps) => {
  const [isDataLoaded, setDataLoaded] = useState(false)
  const { count, setActive, setVisibility } = useContext(TimerContext)

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

  // TODO: update pollInterval when the data isProcessing to something like 10 seconds

  return (
    <Query query={dashboardQuery} variables={{ tenantId: get(last(tenants), 'id') }} pollInterval={30 * 60 * 1000}>
      {({ data, loading, error }) => {
        if (loading && !isDataLoaded) {
          return <Loading height="calc(100vh - 60px)" />
        }

        if (error) {
          throw error
        }

        // onLoad Actions
        if (!isDataLoaded) {
          setDataLoaded(true)
        }

        if (data.lambdasData.processing || data.dynamoData.processing) {
          return (
            <div>
              We&apos;re processing your data. It will take several minutes to do so.
              We will automatically show the data when we have it.
            </div>
          )
        }

        return (
          <Wrapper>
            <Title>
              Last 24h
            </Title>
            <CardsWrapper>
              <LambdasGraphs timeAxisFormat="HH:mm" count={count} data={data.lambdasData.last24Hours} />
              <DynamoGraphs timeAxisFormat="HH:mm" count={count} data={data.dynamoData.last24Hours} />
            </CardsWrapper>
            <Title>
              Last 30 days
            </Title>
            <CardsWrapper>
              <LambdasGraphs timeAxisFormat="LLL d" count={count} data={data.lambdasData.last30Days} />
              <DynamoGraphs timeAxisFormat="LLL d" count={count} data={data.dynamoData.last30Days} />
            </CardsWrapper>
          </Wrapper>
        )
      }}
    </Query>
  )
}
