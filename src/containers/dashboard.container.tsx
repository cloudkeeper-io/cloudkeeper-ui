/* eslint-disable react/no-array-index-key */
import * as React from 'react'
import styled from 'styled-components/macro'
import { Query } from 'react-apollo'
import { DateTime } from 'luxon'
import orderBy from 'lodash/orderBy'

import InvocationsCard from '../components/data-cards/invocations-card.component'
import { dashboardQuery } from '../queries/dashboard.query'

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

export default () => (
  <Query query={dashboardQuery}>
    {({ data, loading, error }) => {
      if (loading) {
        return <div>Loading</div>
      }

      if (error) {
        throw error
      }

      const { dataPoints, invocations, errors } = data.dashboardData.last24Hours.totals
      const orderedPoints = orderBy(dataPoints, x => DateTime.fromISO(x.dateTime).valueOf())

      return (
        <Wrapper>
          <Title>Last 24h</Title>
          <CardsWrapper>
            {Array(13).fill(1).map((d, i) => (
              <InvocationsCard key={i} dataPoints={orderedPoints} invocations={invocations} errors={errors} />
            ))}
          </CardsWrapper>
        </Wrapper>
      )
    }}
  </Query>
)
