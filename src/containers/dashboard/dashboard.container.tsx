import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components/macro'
import { Query } from 'react-apollo'
import get from 'lodash/get'
import last from 'lodash/last'

import Loading from '../../components/loading.component'
import { dashboardQuery } from '../../graphql'
import { Tenant } from '../../models'
import { TimerContext } from '../../contexts'
import { LambdasGraphs24h, LambdasGraphs30d } from './dashboard-lambdas.cards'
import { DynamoGraphs24h } from './dashboard-dynamo.cards'

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
      setActive(false)
      setVisibility(true)
    }
    return () => {
      setActive(false)
      setVisibility(false)
    }
  }, [isDataLoaded, setActive, setVisibility])

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
        }

        return (
          <Wrapper>
            <Title>
              Last 24h
            </Title>
            <CardsWrapper>
              <LambdasGraphs24h count={count} data={data.lambdasData.last24Hours} />
              <DynamoGraphs24h count={count} data={data.dynamoData.last24Hours} />
            </CardsWrapper>
            <Title>
              Last 30 days
            </Title>
            <CardsWrapper>
              <LambdasGraphs30d count={count} data={data.lambdasData.last30Days} />
            </CardsWrapper>
          </Wrapper>
        )
      }}
    </Query>
  )
}
