/* eslint-disable react/no-array-index-key */
import * as React from 'react'
import styled from 'styled-components/macro'
import { Query } from 'react-apollo'
import get from 'lodash/get'
import last from 'lodash/last'

import InvocationsCard from '../components/data-cards/invocations-card.component'
import Loading from '../components/loading.component'
import { dashboardQuery } from '../queries'
import { Tenant } from '../models'

const Wrapper = styled.div`
  padding: 0 20px 20px 20px;
`
const Title = styled.div`
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

interface DashboardProps {
  tenants: Tenant[]
}

export default ({ tenants }: DashboardProps) => (
  <Query query={dashboardQuery} variables={{ tenantId: get(last(tenants), 'id') }}>
    {({ data, loading, error }) => {
      if (loading) {
        return <Loading />
      }

      if (error) {
        throw error
      }

      const { dataPoints, invocations, errors } = data.dashboardData.last24Hours.totals

      return (
        <Wrapper>
          <Title>Last 24h</Title>
          <CardsWrapper>
            {Array(13).fill(1).map((d, i) => (
              <InvocationsCard key={i} dataPoints={dataPoints} invocations={invocations} errors={errors} />
            ))}
          </CardsWrapper>
        </Wrapper>
      )
    }}
  </Query>
)
