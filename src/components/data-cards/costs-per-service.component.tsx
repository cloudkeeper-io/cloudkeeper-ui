import React, { useContext, memo } from 'react'
import styled, { ThemeContext } from 'styled-components/macro'
import { BarChart, XAxis, ResponsiveContainer, YAxis, Bar, Tooltip, CartesianGrid } from 'recharts'
import { Typography, Tooltip as MaterialTooltip } from '@material-ui/core'
import { DateTime } from 'luxon'
import map from 'lodash-es/map'
import reduce from 'lodash-es/reduce'
import forEach from 'lodash-es/forEach'
import fromPairs from 'lodash-es/fromPairs'
import orderBy from 'lodash-es/orderBy'
import isEmpty from 'lodash-es/isEmpty'
import compact from 'lodash-es/compact'
import take from 'lodash-es/take'
import get from 'lodash-es/get'

import { formatNumber } from '../../utils'

const ChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 25px 30px 25px 10px;
`
const Title = styled(Typography)`
  margin: 0 0 20px 30px;
`
const Legend = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 0 0 0 20px;
`
const LegendItem = styled.div`
  display: flex;
  margin: 10px;
  max-width: calc(33% - 20px);
  align-items: center;
`
const LegendCell = styled.div<{ color: string }>`
  min-width: 12px;
  min-height: 12px;
  height: 12px;
  background-color: ${(p) => p.color};
  border-radius: 50%;
`
const LegendText = styled.div`
  font-size: 14px;
  line-height: 18px;
  margin-left: 10px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`
const Placeholder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
`
const StyledTooltip = Tooltip as any

interface CostsPerServiceProps {
  data: any[],
  timeAxisFormat: string,
}

export const CostsPerService = memo(({ data, timeAxisFormat }: CostsPerServiceProps) => {
  const { dataCard: colors, colors: { seriesColors: COLORS } } = useContext(ThemeContext)

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

  const isEmptyData = isEmpty(data) ||
    isEmpty(orderedDataKeys) ||
    (data.length === 1 && isEmpty(get(data, '0.serviceCosts')))

  return (
    <ChartWrapper>
      <Title variant="h5">Costs Per Service</Title>
      {isEmptyData && (
        <Placeholder>
          <Typography variant="h6">
            No Data Available
          </Typography>
        </Placeholder>
      )}
      {!isEmptyData && (
        <>
          <ResponsiveContainer height={190}>
            <BarChart
              data={formattedData}
              margin={{ top: 0, right: 10, left: 5, bottom: 0 }}
            >
              <CartesianGrid stroke={colors.cartesianGrid} strokeWidth={0.5} />
              <XAxis
                dataKey="date"
                stroke={colors.axis}
                tick={{ fontSize: 12 }}
                tickLine={false}
                tickFormatter={(x) => DateTime.fromISO(x).toFormat(timeAxisFormat)}
              />
              <YAxis
                dataKey="total"
                stroke={colors.axis}
                tick={{ fontSize: 12 }}
                tickLine={false}
                tickFormatter={(value: number) => `${formatNumber(value)} $`}
                type="number"
              />
              <StyledTooltip
                cursor={{ opacity: 0.1 }}
                wrapperStyle={{ opacity: 0.9 }}
                contentStyle={{ background: colors.tooltipBackground }}
                labelStyle={{ fontSize: 12, lineHeight: '12px', marginBottom: 10 }}
                formatter={(x: number) => `${formatNumber(x)} $`}
                labelFormatter={(x: string) => DateTime.fromISO(x).toFormat(timeAxisFormat)}
                itemStyle={{ fontSize: 12, lineHeight: '12px' }}
              />
              {map(orderedDataKeys, (key, index) => (
                <Bar
                  key={key.name}
                  dataKey={key.name}
                  stackId="a"
                  fill={COLORS[index]}
                  stroke={COLORS[index]}
                  maxBarSize={12}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
          <Legend>
            {map(orderedDataKeys, (key, index) => (
              <LegendItem key={index}>
                <LegendCell color={COLORS[index]} />
                <MaterialTooltip title={key.name} placement="top">
                  <LegendText>
                    {key.name}
                  </LegendText>
                </MaterialTooltip>
              </LegendItem>
            ))}
          </Legend>
        </>
      )}
    </ChartWrapper>
  )
})
