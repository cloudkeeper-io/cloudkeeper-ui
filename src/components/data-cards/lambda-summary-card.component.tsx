import React from 'react'
import styled, { withTheme } from 'styled-components/macro'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { DateTime } from 'luxon'
import round from 'lodash/round'
import map from 'lodash/map'

import { formatNumber, processDataPoints } from '../../utils'
import { useSwitchTab } from '../../hooks'
import Card from '../card.component'
import StepIndicator from '../steps-indicator.component'

const StyledCard = styled(Card)`
  margin: auto;
  width: 100%;
  min-width: 500px;
  height: 310px;
  background: ${p => p.theme.dataCard.background};
  ${Card.Content} {
    flex-direction: column;
    align-items: flex-start;
  }
  @media (max-width: 800px) {
    min-width: auto;
    max-width: 100%;
  }
`
const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: calc(100% - 75px);
  justify-content: space-between;
  align-items: flex-start;
  margin-left: 50px;
  margin-top: 20px;
  margin-bottom: 15px;
`
const Value = styled.div`
  position: relative;
  min-height: 58px;
  min-width: 1px;
  font-size: 48px;
  color: ${p => p.theme.colors.text};
  > div {
    position: absolute;
    will-change: transform, opacity;
  }
`
const Description = styled.div`
  position: relative;
  width: 100%;
  font-size: 12px;
  min-height: 11px;
  min-width: 1px;
  color: ${p => p.theme.colors.text};
`
const StyledTooltip = Tooltip as any

interface DataPoints {
  invocations: number
  cost: number
  errors: number
  dateTime: string
}

interface Data {
  invocations: number
  errors: number
  cost: number
  dataPoints: DataPoints []
}

interface TotalInvocationsCardProps {
  data: Data
  count: number,
  timeAxisFormat: string,
  className?: string,
  theme: any,
}

type Units = 'invocations' | 'errors' | 'cost'

const tabs: Array<Units> = ['invocations', 'errors', 'cost']
const descriptions = ['Lambda Executions', 'Lambda Errors', 'Lambda Cost']
const formatters = [
  (x: number) => x.toLocaleString('ru'),
  (x: number) => x.toLocaleString('ru'),
  (x: number) => `$${round(x, 2).toLocaleString('en')}`,
]
const tickFormatters = [
  formatNumber,
  formatNumber,
  (x: number) => `$${round(x, 2).toLocaleString('en')}`,
]

const DataCard = ({ data, count, theme, timeAxisFormat, className }: TotalInvocationsCardProps) => {
  const { dataCard: colors } = theme
  const [tab, setTab] = useSwitchTab(count, tabs.length)
  const unit = tabs[tab]
  const dataPoints = processDataPoints(map(data.dataPoints, x => ({ ...x, value: x[unit] })), ['value'])

  return (
    <StyledCard showBorder={false} className={className}>
      <Header>
        <Value>
          {formatters[tab](data[unit])}
        </Value>
        <StepIndicator index={tab} steps={tabs.length} onClick={i => setTab(i)} />
        <Description>
          {descriptions[tab]}
        </Description>
      </Header>
      <ResponsiveContainer>
        <LineChart data={dataPoints} margin={{ top: 20, right: 30, left: -5, bottom: 30 }}>
          <XAxis
            dataKey="dateTime"
            stroke={colors.axis}
            tick={{ fontSize: 12 }}
            tickLine={false}
            tickFormatter={x => DateTime.fromISO(x).toFormat(timeAxisFormat)}
          />
          <YAxis
            stroke={colors.axis}
            tick={{ fontSize: 12 }}
            tickLine={false}
            type="number"
            padding={{ top: 20, bottom: 15 }}
            tickFormatter={tickFormatters[tab]}
          />
          <CartesianGrid stroke={colors.cartesianGrid} strokeWidth={0.5} />
          <Line
            filter={colors.lineFilter}
            type="monotone"
            dataKey="value"
            stroke={colors.svgLines}
            dot={false}
            strokeWidth={3}
          />
          <StyledTooltip
            wrapperStyle={{ opacity: 0.9 }}
            contentStyle={{ background: colors.tooltipBackground }}
            labelStyle={{ fontSize: 12, lineHeight: '12px', marginBottom: 10, color: colors.lines }}
            itemStyle={{ fontSize: 12, lineHeight: '12px' }}
            formatter={formatters[tab]}
            labelFormatter={(value: string) => DateTime.fromISO(value).toFormat('d LLL HH:mm')}
          />
        </LineChart>
      </ResponsiveContainer>
    </StyledCard>
  )
}

export default withTheme(DataCard)
