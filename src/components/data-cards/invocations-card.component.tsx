import React, { memo, useState } from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { DateTime } from 'luxon'
import styled from 'styled-components/macro'

import { formatNumber } from '../../utils'
import { useInterval } from '../../hooks'
import Card from '../card.component'
import Timer from '../timer.component'

interface InvocationsCardProps {
  invocations: number
  errors: number
  dataPoints: Array<{
    invocations: number
    errors: number
    dateTime: string
  }>
  className?: string
}

const StyledCard = styled(Card)`
  margin: auto;
  width: 100%;
  height: 300px;
  ${Card.Content} {
    background: ${p => p.theme.dataCard.background};
    flex-direction: column;
    align-items: flex-start;
  }
`
const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: calc(100% - 80px);
  justify-content: space-between;
  align-items: center;
  margin-left: 50px;
  margin-top: 20px;
  margin-bottom: 15px;
`
const Value = styled.div`
  font-size: 48px;
`
const Description = styled.div`
  width: 100%;
  font-size: 9px;
`
const StyledTooltip = Tooltip as any

export default memo(({ invocations, errors, dataPoints, className }: InvocationsCardProps) => {
  const [count, setCount] = useState(1)

  useInterval(() => {
    setCount(count + 1)
  }, 10000)

  return (
    <StyledCard showBorder={false} className={className}>
      <Header>
        <Value>{count % 2 ? invocations : errors}</Value>
        <Timer color="#B9FFEC" size={48} key={count} />
        <Description>{count % 2 ? 'Lambda Executions' : 'Errors'}</Description>
      </Header>
      <ResponsiveContainer>
        <LineChart data={dataPoints} margin={{ top: 20, right: 30, left: -5, bottom: 30 }}>
          <XAxis
            dataKey="dateTime"
            stroke="#B9FFEC"
            tick={{ fontSize: 12 }}
            tickLine={false}
            tickFormatter={x => DateTime.fromISO(x).toFormat('HH:mm')}
          />
          <YAxis
            stroke="#B9FFEC"
            tick={{ fontSize: 12 }}
            tickLine={false}
            type="number"
            padding={{ top: 20, bottom: 5 }}
            tickFormatter={x => formatNumber(x)}
          />
          <CartesianGrid stroke="#B9FFEC" strokeOpacity={0.35} />
          {count % 2 && <Line type="linear" dataKey="invocations" stroke="#FFFFFF" dot={false} />}
          {!(count % 2) && <Line type="linear" dataKey="errors" stroke="pink" fill="pink" dot={false} />}
          <StyledTooltip
            wrapperStyle={{ opacity: 0.9 }}
            contentStyle={{ background: '#0E0B20' }}
            labelStyle={{ fontSize: 12, lineHeight: '12px', marginBottom: 10, color: '#B9FFEC' }}
            itemStyle={{ fontSize: 12, lineHeight: '12px' }}
            formatter={(value: string) => Number(value).toLocaleString()}
            labelFormatter={(value: string) => DateTime.fromISO(value).toFormat('d LLL HH:mm')}
          />
        </LineChart>
      </ResponsiveContainer>
    </StyledCard>
  )
})
