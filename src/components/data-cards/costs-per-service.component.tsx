import React, { useContext, memo } from 'react'
import styled, { ThemeContext } from 'styled-components/macro'
import { BarChart, XAxis, ResponsiveContainer, YAxis, Bar, Tooltip, CartesianGrid } from 'recharts'
import { Typography } from '@material-ui/core'
import { DateTime } from 'luxon'
import map from 'lodash/map'
import reduce from 'lodash/reduce'
import forEach from 'lodash/forEach'
import fromPairs from 'lodash/fromPairs'
import orderBy from 'lodash/orderBy'
import isEmpty from 'lodash/isEmpty'
import compact from 'lodash/compact'
import take from 'lodash/take'

const ChartWrapper = styled.div`
  display: block;
  width: 100%;
  height: 100%;
`
const Title = styled(Typography)`
  margin: 10px 0 0 20px;
`
const Legend = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 0 20px;
`
const LegendItem = styled.div`
  display: flex;
  margin: 10px;
`
const LegendCell = styled.div<{ color: string }>`
  width: 12px;
  height: 12px;
  background-color: ${(p) => p.color};
  border-radius: 50%;
`
const LegendText = styled.div`
  font-size: 14px;
  line-height: 18px;
  margin-left: 10px;
`
const StyledTooltip = Tooltip as any

interface CostsPerServiceProps {
  data: any[],
}

export const CostsPerService = memo(({ data }: CostsPerServiceProps) => {
  const { colors } = useContext(ThemeContext)
  const COLORS = colors.seriesColors

  const formattedData = compact(map(data, (x) => {
    const pairs = map(x.serviceCosts, (service) => [service.serviceName, service.unblendedCost])

    if (isEmpty(pairs)) {
      return null
    }

    return {
      date: x.date,
      total: x.total,
      ...fromPairs(pairs),
    }
  }))

  const dataKeys = reduce(data, (acc, x) => {
    forEach(x.serviceCosts, (service) => {
      acc[service.serviceName] = (acc[service.serviceName] || 0) + service.unblendedCost
    })
    return acc
  }, {} as any)

  const orderedDataKeys = take(orderBy(map(dataKeys, (cost, name) => ({ cost, name })), 'cost', 'desc'), 5)

  return (
    <ChartWrapper>
      <Title variant="h5">Costs Per Service</Title>
      <ResponsiveContainer height={230}>
        <BarChart
          data={formattedData}
          margin={{ top: 15, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid stroke={colors.cartesianGrid} strokeWidth={0.5} />
          <XAxis dataKey="date" stroke={colors.axis} tickFormatter={(x) => DateTime.fromISO(x).toFormat('LLL d')} />
          <YAxis stroke={colors.axis} dataKey="total" />
          <StyledTooltip
            cursor={{ opacity: 0.1 }}
            wrapperStyle={{ opacity: 0.9 }}
            contentStyle={{ background: colors.mainBackground }}
            labelStyle={{ fontSize: 12, lineHeight: '12px', marginBottom: 10 }}
            itemStyle={{ fontSize: 12, lineHeight: '12px' }}
          />
          {map(orderedDataKeys, (key, index) => (
            <Bar
              key={key.name}
              dataKey={key.name}
              stackId="a"
              fill={COLORS[index]}
              stroke={COLORS[index]}
              maxBarSize={10}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
      <Legend>
        {map(orderedDataKeys, (key, index) => (
          <LegendItem key={index}>
            <LegendCell color={COLORS[index]} />
            <LegendText>
              {key.name}
            </LegendText>
          </LegendItem>
        ))}
      </Legend>
    </ChartWrapper>
  )
})
