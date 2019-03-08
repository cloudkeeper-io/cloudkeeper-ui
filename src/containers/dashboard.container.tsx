/* eslint-disable react/no-array-index-key */
import * as React from 'react'
import styled from 'styled-components/macro'
import { XAxis, YAxis, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip } from 'recharts'
import { DateTime } from 'luxon'
import orderBy from 'lodash/orderBy'
import { Query } from 'react-apollo'

import Card from '../components/card.component'
import { formatNumber } from '../utils'
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
const StyledCard = styled(Card)`
  margin: auto;
  width: 100%;
  ${Card.Wrapper} {
    background: ${p => p.theme.dataCard.background};
  }
`
const StyledTooltip = Tooltip as any

export default () => (
  <Query query={dashboardQuery}>
    {({ data, loading, error }) => {
      if (loading) {
        return <div>Loading</div>
      }

      if (error) {
        throw error
      }

      const { dataPoints } = data.dashboardData.last24Hours.totals
      const orderedData = orderBy(dataPoints, x => DateTime.fromISO(x.dateTime).valueOf())

      return (
        <Wrapper>
          <Title>Last 24h</Title>
          <CardsWrapper>
            {Array(13).fill(1).map((d, i) => (
              <StyledCard showBorder={false} key={i}>
                <ResponsiveContainer>
                  <LineChart data={orderedData} margin={{ top: 40, right: 30, left: -5, bottom: 30 }}>
                    <XAxis
                      dataKey="dateTime"
                      stroke="#B9FFEC"
                      tick={{ fontSize: 12 }}
                      tickFormatter={x => DateTime.fromISO(x).toFormat('HH:mm')}
                    />
                    <YAxis
                      stroke="#B9FFEC"
                      tick={{ fontSize: 12 }}
                      tickFormatter={x => formatNumber(x)}
                    />
                    <CartesianGrid stroke="#B9FFEC" strokeOpacity={0.75} />
                    <Line type="linear" dataKey="errors" stroke="pink" fill="pink" />
                    <Line type="linear" dataKey="invocations" stroke="#FFFFFF" />
                    <StyledTooltip
                      wrapperStyle={{ opacity: 0.9 }}
                      contentStyle={{ background: '#0E0B20' }}
                      labelStyle={{ fontSize: 12, lineHeight: '12px', marginBottom: 10, color: '#B9FFEC' }}
                      itemStyle={{ fontSize: 12, lineHeight: '12px' }}
                      formatter={(value: string) => Number(value).toLocaleString()}
                      labelFormatter={(value: string) => DateTime.fromISO(value).toFormat('HH:mm')}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </StyledCard>
            ))}
          </CardsWrapper>
        </Wrapper>
      )
    }}
  </Query>
)
