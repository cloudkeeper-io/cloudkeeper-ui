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

const DATA = orderBy([
  { invocations: '9704', errors: '1514', dateTime: '2019-03-03T18:00:00.000Z' },
  { invocations: '9664', errors: '1481', dateTime: '2019-03-03T17:00:00.000Z' },
  { invocations: '9389', errors: '1487', dateTime: '2019-03-03T16:00:00.000Z' },
  { invocations: '9420', errors: '1503', dateTime: '2019-03-03T15:00:00.000Z' },
  { invocations: '9386', errors: '1482', dateTime: '2019-03-03T14:00:00.000Z' },
  { invocations: '9395', errors: '1487', dateTime: '2019-03-03T13:00:00.000Z' },
  { invocations: '9586', errors: '1510', dateTime: '2019-03-03T12:00:00.000Z' },
  { invocations: '9221', errors: '1486', dateTime: '2019-03-03T11:00:00.000Z' },
  { invocations: '9538', errors: '1492', dateTime: '2019-03-03T10:00:00.000Z' },
  { invocations: '9940', errors: '1505', dateTime: '2019-03-03T09:00:00.000Z' },
  { invocations: '9479', errors: '1482', dateTime: '2019-03-03T08:00:00.000Z' },
  { invocations: '9385', errors: '1482', dateTime: '2019-03-03T07:00:00.000Z' },
  { invocations: '9635', errors: '1516', dateTime: '2019-03-03T06:00:00.000Z' },
  { invocations: '8926', errors: '1479', dateTime: '2019-03-03T05:00:00.000Z' },
  { invocations: '8922', errors: '1481', dateTime: '2019-03-03T04:00:00.000Z' },
  { invocations: '9550', errors: '1506', dateTime: '2019-03-03T03:00:00.000Z' },
  { invocations: '8926', errors: '1485', dateTime: '2019-03-03T02:00:00.000Z' },
  { invocations: '8922', errors: '1479', dateTime: '2019-03-03T01:00:00.000Z' },
  { invocations: '11079', errors: '1552', dateTime: '2019-03-03T00:00:00.000Z' },
  { invocations: '9218', errors: '1487', dateTime: '2019-03-02T23:00:00.000Z' },
  { invocations: '9094', errors: '1483', dateTime: '2019-03-02T22:00:00.000Z' },
  { invocations: '9240', errors: '1509', dateTime: '2019-03-02T21:00:00.000Z' },
  { invocations: '8955', errors: '1484', dateTime: '2019-03-02T20:00:00.000Z' },
], x => DateTime.fromISO(x.dateTime).valueOf())

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
      console.log(data)
      if (loading) {
        return <div>Loading</div>
      }

      if (error) {
        throw error
      }

      return (
        <Wrapper>
          <Title>Last 24h</Title>
          <CardsWrapper>
            {Array(13).fill(1).map((d, i) => (
              <StyledCard showBorder={false} key={i}>
                <ResponsiveContainer>
                  <LineChart data={DATA} margin={{ top: 40, right: 30, left: -5, bottom: 30 }}>
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
