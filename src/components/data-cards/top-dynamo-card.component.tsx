import React from 'react'
import styled, { withTheme } from 'styled-components/macro'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { DateTime } from 'luxon'
import { transparentize } from 'polished'
import map from 'lodash/map'
import startCase from 'lodash/startCase'
import toLower from 'lodash/toLower'
import first from 'lodash/first'
import last from 'lodash/last'
import isEmpty from 'lodash/isEmpty'
import isNil from 'lodash/isNil'

import { useSwitchTab } from '../../hooks'
import { Text as CommonText } from '../typography.component'
import { bytesToSize, toOrdinal, processDataPoints } from '../../utils'
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

const LegendItem = styled(CommonText)`
  display: flex;
  align-items: center;
  min-height: 25px;
`
const LegendCircle = styled.div<{ color: string }>`
  width: 10px;
  height: 10px;
  margin-right: 15px;
  background: ${p => p.color};
  box-shadow: 0 0 4px ${p => transparentize(0.5, p.color)};
  border-radius: 50%;
`
const DynamoInfo = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  ${Text} {
    margin-bottom: 3px;
  }
`
const DynamoInfoColumn = styled.div`
  flex: 1;
  margin-right: 30px;
`

const StyledTooltip = Tooltip as any

interface Data {
  name: string
  billingMode?: string
  consumedRead?: number
  provisionedRead?: number
  averageConsumedRead?: number
  consumedWrite?: number
  provisionedWrite?: number
  averageConsumedWrite?: number
  readPrice?: number
  writePrice?: number
  throttledRequests?: number
  throttledReads?: number
  throttledWrites?: number
  items?: number
  sizeBytes?: number
  dataPoints: Array<{
    consumedRead: number
    provisionedRead: number
    dateTime: string
  }>
}

interface DynamoInfoItem {
  unit: keyof Data
  text: string
  valueFn: (value: any) => any
}

interface TopDynamoCardProps {
  data: Data []
  count: number
  timeAxisFormat: string
  header?: string
  dynamoHeader?: string
  className?: string
  units?: Array<{
    label: string
    value: string
  }>
  summaryFormatter: (value: Data) => string
  tooltipFormatter: (value: string) => string
  yAxisFormatter: (value: any) => any
  dynamoInfo?: DynamoInfoItem []
  theme: any
}

const DataCard = (props: TopDynamoCardProps) => {
  const { data, dynamoInfo, count, theme, header, units, timeAxisFormat } = props
  const { dynamoHeader, tooltipFormatter, yAxisFormatter, summaryFormatter, className } = props
  const TABS_AMOUNT = data.length + 1
  const { dataCard: colors } = theme
  const [tab, setTab] = useSwitchTab(count, TABS_AMOUNT, 0)
  const dynamo = data[tab - 1]

  if (isEmpty(data)) {
    return null
  }

  const dataPoints = processDataPoints(dynamo ? dynamo.dataPoints : [], map(units, x => x.value))

  return (
    <StyledCard className={className}>
      <Content>
        <Tab>
          <Header>
            <div>
              {tab === 0 ? `Top ${data.length} ${header}` : `${tab === 1 ? '' : toOrdinal(tab)} ${dynamoHeader}`}
            </div>
            <TabIndicator index={tab} steps={TABS_AMOUNT} onClick={i => setTab(i)} />
          </Header>
          {tab === 0 && (
            <>
              {map(data, x => (
                <Text key={x.name}>
                  <div>{x.name}</div>
                  <div>{summaryFormatter(x)}</div>
                </Text>
              ))}
            </>
          )}
          {tab > 0 && (
            <>
              <Text>
                {data[tab - 1].name}
              </Text>
              <GraphContainer>
                <ResponsiveContainer>
                  <LineChart data={dataPoints} margin={{ top: 0, right: -25, left: -25, bottom: 0 }}>
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
                      tickFormatter={yAxisFormatter}
                    />
                    <CartesianGrid stroke={colors.cartesianGrid} strokeWidth={0.5} />
                    {dynamo.billingMode === 'PROVISIONED' && (
                      <Line
                        type="monotone"
                        filter={colors.lineFilter}
                        dataKey={last(units)!.value}
                        name={last(units)!.label}
                        stroke={colors.svgLinesSecondary}
                        dot={dataPoints.length < 3}
                        strokeWidth={3}
                      />
                    )}
                    <Line
                      type="monotone"
                      filter={colors.lineFilter}
                      dataKey={first(units)!.value}
                      name={first(units)!.label}
                      stroke={colors.svgLines}
                      dot={dataPoints.length < 3}
                      strokeWidth={3}
                    />
                    <StyledTooltip
                      wrapperStyle={{ opacity: 0.9 }}
                      contentStyle={{ background: tab ? colors.tooltipBackground : colors.secondaryTooltipBackground }}
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
              <DynamoInfo>
                {map(units, (unit, index) => (
                  <LegendItem key={unit.label}>
                    <LegendCircle color={index ? colors.linesSecondary : colors.lines} />
                    {unit.label}
                  </LegendItem>
                ))}
                <DynamoInfoColumn>
                  {map(dynamoInfo, x => !isNil(dynamo[x.unit]) && (
                    <InfoText key={x.unit}>
                      {x.text}:
                      <Value>{x.valueFn(dynamo[x.unit])}</Value>
                    </InfoText>
                  ))}
                </DynamoInfoColumn>
                <DynamoInfoColumn>
                  {dynamo.items && (
                    <InfoText>
                      items:
                      <Value>{dynamo.items.toLocaleString('ru')}</Value>
                    </InfoText>
                  )}
                  {dynamo.sizeBytes && (
                    <InfoText>
                      size:
                      <Value>{bytesToSize(dynamo.sizeBytes)}</Value>
                    </InfoText>
                  )}
                  {dynamo.billingMode && (
                    <InfoText>
                      billing mode:
                      <Value>{toLower(startCase(dynamo.billingMode))}</Value>
                    </InfoText>
                  )}
                </DynamoInfoColumn>
              </DynamoInfo>
            </>
          )}
        </Tab>
      </Content>
    </StyledCard>
  )
}

export default withTheme(DataCard)
