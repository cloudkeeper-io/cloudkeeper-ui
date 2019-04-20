import React from 'react'
import styled, { withTheme } from 'styled-components/macro'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { DateTime } from 'luxon'
import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'
import isNil from 'lodash/isNil'

import { useSwitchTab } from '../../hooks'
import { processDataPoints, toOrdinal } from '../../utils'
import {
  StyledCard,
  Content,
  Header,
  Text,
  InfoText,
  TabIndicator,
  Value,
  GraphContainer,
  Tab,
} from './data-card.styles'

const LambdaInfo = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  ${Text} {
    margin-bottom: 3px;
  }
`
const LambdaInfoColumn = styled.div`
  flex: 1;
  margin-right: 30px;
`
const StyledTooltip = Tooltip as any

interface Data {
  lambdaName: string
  runtime?: string
  invocations?: number
  invocationsPerSecond?: number
  averageDuration?: number
  errors?: number
  errorRate?: number
  maxDuration?: number
  size?: number
  cost?: number
  codeSize?: number
  timeout?: number
  dataPoints: Array<{
    invocations: number
    dateTime: string
  }>
}

interface LambdaInfoItem {
  unit: keyof Data
  text: string
  valueFn: (value: any) => any
}

interface MostInvokedCardProps {
  data: Data []
  count: number
  timeAxisFormat: string
  header?: string
  lambdaHeader?: string
  className?: string
  unit: 'invocations' | 'averageDuration' | 'errors' | 'cost'
  summaryFormatter: (value: Data) => string
  tooltipFormatter: (value: string) => string
  yAxisFormatter: (value: any) => any
  lambdaInfo?: LambdaInfoItem []
  theme: any
}

const DataCard = (props: MostInvokedCardProps) => {
  const { data, lambdaInfo, count, unit, theme, header, timeAxisFormat } = props
  const { lambdaHeader, tooltipFormatter, yAxisFormatter, summaryFormatter, className } = props
  const TABS_AMOUNT = data.length + 1
  const { dataCard: colors } = theme
  const [tab, setTab] = useSwitchTab(count, TABS_AMOUNT, 0)
  const lambda = data[tab - 1]

  if (isEmpty(data)) {
    return null
  }

  const dataPoints = processDataPoints(lambda ? lambda.dataPoints : [], [unit])

  return (
    <StyledCard className={className}>
      <Content>
        <Tab>
          <Header>
            <div>
              {tab === 0 ? `Top ${data.length} ${header}` : `${tab === 1 ? '' : toOrdinal(tab)} ${lambdaHeader}`}
            </div>
            <TabIndicator index={tab} steps={TABS_AMOUNT} onClick={i => setTab(i)} />
          </Header>
          {tab === 0 && (
            <>
              {map(data, x => (
                <Text key={x.lambdaName}>
                  <div>{x.lambdaName}</div>
                  <div>{summaryFormatter(x)}</div>
                </Text>
              ))}
            </>
          )}
          {tab > 0 && (
            <>
              <Text>{data[tab - 1].lambdaName}</Text>
              <GraphContainer>
                <ResponsiveContainer>
                  <LineChart data={dataPoints} margin={{ top: 0, right: -25, left: -25, bottom: 0 }}>
                    <XAxis
                      dataKey="dateTime"
                      stroke={tab ? colors.axis : colors.secondaryAxis}
                      tick={{ fontSize: 12 }}
                      tickLine={false}
                      tickFormatter={x => DateTime.fromISO(x).toFormat(timeAxisFormat)}
                    />
                    <YAxis
                      stroke={tab ? colors.axis : colors.secondaryAxis}
                      tick={{ fontSize: 12 }}
                      tickLine={false}
                      type="number"
                      padding={{ top: 20, bottom: 15 }}
                      tickFormatter={yAxisFormatter}
                    />
                    <CartesianGrid stroke={colors.cartesianGrid} strokeWidth={0.5} />
                    <Line
                      type="monotone"
                      filter={colors.lineFilter}
                      dataKey={unit}
                      stroke={colors.svgLines}
                      dot={dataPoints.length < 3}
                      strokeWidth={3}
                    />
                    <StyledTooltip
                      wrapperStyle={{ opacity: 0.9 }}
                      contentStyle={{ background: colors.tooltipBackground }}
                      labelStyle={{
                        fontSize: 12,
                        lineHeight: '12px',
                        marginBottom: 10,
                        color: colors.lines,
                      }}
                      itemStyle={{ fontSize: 12, lineHeight: '12px' }}
                      formatter={tooltipFormatter}
                      labelFormatter={(value: string) => DateTime.fromISO(value).toFormat('d LLL HH:mm')}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </GraphContainer>
              <LambdaInfo>
                <LambdaInfoColumn>
                  {map(lambdaInfo, x => !isNil(lambda[x.unit]) && (
                    <InfoText key={x.unit}>
                      {x.text}:
                      <Value>{x.valueFn(lambda[x.unit])}</Value>
                    </InfoText>
                  ))}
                </LambdaInfoColumn>
                <LambdaInfoColumn>
                  {lambda.runtime && (
                    <InfoText>
                      runtime:
                      <Value>{lambda.runtime}</Value>
                    </InfoText>
                  )}
                  {lambda.size && (
                    <InfoText>
                      memory size:
                      <Value>{lambda.size}MB</Value>
                    </InfoText>
                  )}
                  {lambda.timeout && (
                    <InfoText>
                      timeout:
                      <Value>{lambda.timeout}s</Value>
                    </InfoText>
                  )}
                </LambdaInfoColumn>
              </LambdaInfo>
            </>
          )}
        </Tab>
      </Content>
    </StyledCard>
  )
}

export default withTheme(DataCard)
