import React, { memo, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/macro'
import { Typography } from '@material-ui/core'
import { linearRegression, linearRegressionLine } from 'simple-statistics'
import { DateTime } from 'luxon'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import map from 'lodash/map'
import first from 'lodash/first'
import round from 'lodash/round'

import { getIconByServiceName } from '../../utils'

const Wrapper = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding-bottom: 20px;
`
const ChartWrapper = styled.div`
  flex: 1;
  height: 100%;
  min-width: 320px;
  overflow: visible;
`
const Trends = styled.div`
  min-width: 250px;
`
const Trend = styled.div`
  padding: 5px 20px;
`
const TrendText = styled.span`
  margin-left: 10px;
`
const Title = styled(Typography)`
  margin: 10px 0 15px 20px;
`
const Content = styled.div`
  display: flex;
  height: calc(100% - 60px);
  width: calc(100% - 20px);
  flex-wrap: wrap;
`
const StyledTooltip = Tooltip as any

interface TrendsCardProps {
  trends: {
    costsData: any,
    lambdasData: any,
  },
  timeAxisFormat: string,
}

// global costs
// invocations
// errors
// Top 2 todays most expensive services trends
export const TrendsCard = memo(({ trends, timeAxisFormat }: TrendsCardProps) => {
  const { dataCard: colors } = useContext(ThemeContext)
  const { costsData } = trends

  const formattedCostData = map(costsData, (x) => ({ date: DateTime.fromISO(x.date).valueOf(), total: x.total }))
  const regressionData = map(formattedCostData, (x) => [x.date, x.total])
  const regression = linearRegression(regressionData)
  const lineFn = linearRegressionLine(regression)

  const dataWithTrends = map(formattedCostData, (x, index) => (
    { ...x, trendData: lineFn(first(regressionData[index])) }))

  return (
    <Wrapper>
      <Title variant="h5">Trends</Title>
      <Content>
        <Trends>
          <Trend>
            {getIconByServiceName('cost')}
            <TrendText>Lambda executions is up 30% in the last 7 days</TrendText>
          </Trend>
          <Trend>{getIconByServiceName('cost')} test</Trend>
          <Trend>{getIconByServiceName('cost')} test</Trend>
        </Trends>
        <ChartWrapper>
          <ResponsiveContainer>
            <AreaChart data={dataWithTrends} margin={{ right: 30 }}>
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                stroke={colors.axis}
                tick={{ fontSize: 12 }}
                tickLine={false}
                tickFormatter={(x) => DateTime.fromMillis(x).toFormat(timeAxisFormat)}
              />
              <YAxis
                stroke={colors.axis}
                tick={{ fontSize: 12 }}
                tickLine={false}
                type="number"
                padding={{ top: 20, bottom: 15 }}
                // tickFormatter={tickFormatters[tab]}
              />
              <CartesianGrid stroke={colors.cartesianGrid} strokeWidth={0.5} />
              <StyledTooltip
                wrapperStyle={{ opacity: 0.9 }}
                contentStyle={{ background: colors.tooltipBackground }}
                labelStyle={{ fontSize: 12, lineHeight: '12px', marginBottom: 10 }}
                itemStyle={{ fontSize: 12, lineHeight: '12px' }}
                formatter={(val: number) => round(val, 3)}
                labelFormatter={(value: number) => DateTime.fromMillis(value).toFormat(timeAxisFormat)}
              />
              <Area
                dataKey="total"
                stroke={colors.areaColor}
                fill="transparent"
                strokeWidth={3}
              />
              <Area
                dataKey="total"
                stroke={colors.areaColor}
                fill={colors.areaColor}
                mask="url(#fadeMask)"
                strokeWidth={3}
              />
              <Area
                dataKey="trendData"
                stroke={colors.areaTrend}
                fill="transparent"
                strokeWidth={3}
                connectNulls
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartWrapper>
      </Content>
    </Wrapper>
  )
})
