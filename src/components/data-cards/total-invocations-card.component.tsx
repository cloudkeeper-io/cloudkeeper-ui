import React from 'react'
import styled, { withTheme } from 'styled-components/macro'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { DateTime } from 'luxon'
import map from 'lodash/map'

import { formatNumber } from '../../utils'
import { useSwitchTab } from '../../hooks'
import Card from '../card.component'
import StepIndicator from '../steps-indicator.component'
import AnimatedText from '../animated-text.component'

const StyledCard = styled(Card)`
  margin: auto;
  width: 100%;
  min-width: 500px;
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
const Value = styled(AnimatedText)`
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
const Description = styled(AnimatedText)`
  position: relative;
  width: 100%;
  font-size: 9px;
  min-height: 11px;
  min-width: 1px;
  color: ${p => p.theme.colors.text};
`
const StyledTooltip = Tooltip as any

interface TotalInvocationsCardProps {
  data: {
    invocations: number
    errors: number
    dataPoints: Array<{
      invocations: number
      errors: number
      dateTime: string
    }>
  }
  count: number,
  className?: string,
  theme: any,
}

const DataCard = ({ data, count, theme, className }: TotalInvocationsCardProps) => {
  const TABS_AMOUNT = 2
  const { invocations, errors } = data
  const { dataCard: colors } = theme
  const [tab, setTab] = useSwitchTab(count, TABS_AMOUNT)
  const dataPoints = map(data.dataPoints, x => ({ ...x, value: tab === 0 ? x.invocations : x.errors }))

  return (
    <StyledCard showBorder={false} className={className}>
      <Header>
        <Value>
          {tab === 0 ? invocations.toLocaleString('ru') : errors.toLocaleString('ru')}
        </Value>
        <StepIndicator index={tab} steps={TABS_AMOUNT} onClick={i => setTab(i)} />
        <Description>
          {tab === 0 ? 'Lambda Executions' : 'Errors'}
        </Description>
      </Header>
      <ResponsiveContainer>
        <LineChart data={dataPoints} margin={{ top: 20, right: 30, left: -5, bottom: 30 }}>
          <XAxis
            dataKey="dateTime"
            stroke={colors.axis}
            tick={{ fontSize: 12 }}
            tickLine={false}
            tickFormatter={x => DateTime.fromISO(x).toFormat('HH:mm')}
          />
          <YAxis
            stroke={colors.axis}
            tick={{ fontSize: 12 }}
            tickLine={false}
            type="number"
            padding={{ top: 20, bottom: 5 }}
            tickFormatter={x => formatNumber(x)}
          />
          <CartesianGrid stroke={colors.axis} strokeOpacity={0.35} />
          <Line type="linear" dataKey="value" stroke={colors.lines} dot={false} strokeWidth={1.5} />
          <StyledTooltip
            wrapperStyle={{ opacity: 0.9 }}
            contentStyle={{ background: colors.tooltipBackground }}
            labelStyle={{ fontSize: 12, lineHeight: '12px', marginBottom: 10, color: colors.lines }}
            itemStyle={{ fontSize: 12, lineHeight: '12px' }}
            formatter={(value: string) => Number(value).toLocaleString()}
            labelFormatter={(value: string) => DateTime.fromISO(value).toFormat('d LLL HH:mm')}
          />
        </LineChart>
      </ResponsiveContainer>
    </StyledCard>
  )
}

export default withTheme(DataCard)
