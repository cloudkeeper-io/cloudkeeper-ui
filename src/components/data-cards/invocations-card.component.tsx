import React from 'react'
import styled, { withTheme } from 'styled-components/macro'
import { useTransition, animated } from 'react-spring'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { DateTime } from 'luxon'

import { formatNumber } from '../../utils'
import { useSwitchTab } from '../../hooks'
import Card from '../card.component'
import StepIndicator from '../steps-indicator.component'

interface InvocationsCardProps {
  invocations: number
  errors: number
  count: number,
  dataPoints: Array<{
    invocations: number
    errors: number
    dateTime: string
  }>
  className?: string,
  theme: any,
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
const Value = styled(animated.div)`
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
  font-size: 9px;
  min-height: 11px;
  min-width: 1px;
  color: ${p => p.theme.colors.text};
  > div {
    position: absolute;
    will-change: transform, opacity;
  }
`
const StyledTooltip = Tooltip as any

const DataCard = ({ invocations, errors, count, dataPoints, theme, className }: InvocationsCardProps) => {
  const TABS_AMOUNT = 2
  const [tab, setTab] = useSwitchTab(count, TABS_AMOUNT)
  const { dataCard: colors } = theme

  const transitions = useTransition(tab, p => p, {
    from: { opacity: 0, transform: 'translate3d(100%, 0, 0)' },
    enter: { opacity: 1, transform: 'translate3d(0, 0. 0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%, 0, 0)' },
  })

  return (
    <StyledCard showBorder={false} className={className}>
      <Header>
        <Value>
          {transitions.map(({ props, key }) => (
            <animated.div key={key} style={{ ...props }}>{tab === 0 ? invocations : errors}</animated.div>
          ))}
        </Value>
        <StepIndicator index={tab} steps={TABS_AMOUNT} onClick={i => setTab(i)} />
        <Description>
          {transitions.map(({ props, key }) => (
            <animated.div key={key} style={{ ...props }}>{tab === 0 ? 'Lambda Executions' : 'Errors'}</animated.div>
          ))}
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
          {tab === 0 && <Line type="linear" dataKey="invocations" stroke={colors.lines} dot={false} />}
          {tab !== 0 && <Line type="linear" dataKey="errors" stroke={colors.lines} dot={false} />}
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
