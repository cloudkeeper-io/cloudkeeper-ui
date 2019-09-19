import React, { memo, useContext, useState } from 'react'
import styled, { ThemeContext } from 'styled-components/macro'
import { Typography } from '@material-ui/core'
import { DateTime } from 'luxon'
import { Moment } from 'moment'
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
import every from 'lodash/every'

import { getIconByServiceName } from '../../../utils'
import { getGraphData, getTrendText, TRENDS } from './trends-card.utils'

const Wrapper = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
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
  max-width: 450px;
`
const TrendText = styled.div`
  margin-left: 15px;
`
const Trend = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  padding: 5px 20px;
  ${TrendText} {
    color: ${(p) => (p.active ? p.theme.palette.secondary.main : p.theme.colors.text)};
  }
  svg {
    color: ${(p) => (p.active ? p.theme.palette.secondary.main : p.theme.colors.text)};
    transition: none;
  }
  cursor: pointer;
`

const Title = styled(Typography)`
  margin: 10px 0 15px 20px;
`
const GraphTitle = styled(Typography)`
  margin: 10px 0 15px 60px;
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
    costsData: any
    lambdasData: any
    [x: string]: any
  },
  startDate: Moment
  endDate: Moment
  timeAxisFormat: string,
}

export const TrendsCard = memo(({ trends, startDate, endDate, timeAxisFormat }: TrendsCardProps) => {
  const [active, setActive] = useState(0)
  const { dataCard: colors } = useContext(ThemeContext)
  const activeTrend = TRENDS[active]

  const graphData = getGraphData(trends[activeTrend.trendsField], active)

  const isStraightLine = every(graphData, (point) => point.value === first(graphData)!.value)
  const isStraightTrendLine = every(graphData, (point) => point.trendData === first(graphData)!.trendData)

  return (
    <Wrapper>
      <Content>
        <Trends>
          <Title variant="h5">Trends</Title>
          {map(TRENDS, (trend, index) => (
            <Trend key={trend.title} active={index === active} onClick={() => setActive(index)}>
              {getIconByServiceName(trend.icon)}
              <TrendText>{getTrendText(trends[TRENDS[index].trendsField], index, startDate, endDate)}</TrendText>
            </Trend>
          ))}
        </Trends>
        <ChartWrapper>
          <GraphTitle variant="h5">{TRENDS[active].title}</GraphTitle>
          <ResponsiveContainer>
            <AreaChart data={graphData} margin={{ right: 30 }}>
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
                dataKey="value"
                stroke={isStraightLine ? colors.areaColor : colors.svgAreaColor}
                fill="transparent"
                strokeWidth={3}
              />
              <Area
                dataKey="value"
                stroke={isStraightLine ? colors.areaColor : colors.svgAreaColor}
                fill={isStraightLine ? colors.areaColor : colors.svgAreaColor}
                mask="url(#fadeMask)"
                strokeWidth={3}
              />
              <Area
                dataKey="trendData"
                stroke={isStraightTrendLine ? colors.areaTrend : colors.svgAreaTrend}
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
