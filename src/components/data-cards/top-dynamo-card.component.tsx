import React from 'react'
import styled, { withTheme } from 'styled-components/macro'
import map from 'lodash/map'
import startCase from 'lodash/startCase'
import toLower from 'lodash/toLower'
import first from 'lodash/first'
import last from 'lodash/last'
import isEmpty from 'lodash/isEmpty'
import isNil from 'lodash/isNil'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { DateTime } from 'luxon'
import { transparentize } from 'polished'

import { useSwitchTab } from '../../hooks'
import Card from '../card.component'
import StepIndicator from '../steps-indicator.component'
import AnimatedText from '../animated-text.component'
import { bytesToSize, toOrdinal } from '../../utils'

const StyledCard = styled(Card)<{ isPrimary: boolean }>`  margin: auto;
  width: 100%;
  min-width: 500px;
  height: 300px;
  ${Card.Content} {
    background: ${p => (p.isPrimary ? p.theme.dataCard.background : p.theme.dataCard.secondaryBackground)};
    color: ${p => (p.isPrimary ? p.theme.colors.text : p.theme.colors.activeText)};
    overflow: hidden;
  }
`
const Content = styled.div`
  display: flex;
  width: 100%;
  height: calc(100% - 10px);
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0 20px 0 50px;
`
const Header = styled(AnimatedText)`
  font-size: 22px;
  line-height: 24px;
  margin-top: 10px;
  margin-bottom: 5px;
`
const Text = styled(AnimatedText)`
  position: relative;
  margin-bottom: 8px;
  font-size: 14px;
  line-height: 19px;
  white-space: nowrap;
`
const InfoText = styled(Text)`
  display: flex;
  justify-content: space-between;
  :last-child {
    margin-bottom: 0;
  }
`
const Value = styled.span`
  margin-left: 15px;
`
const GraphContainer = styled.div`
  width: 100%;
  height: 130px;
  margin-left: -32px;
  svg {
    overflow: visible;
  }
`
const Tab = styled.div`
  width: 100%;
  max-height: calc(100% - 22px);
  flex: 1;
`
const Legend = styled.div`
  display: flex;
  margin-bottom: 5px;
`
const LegendItem = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-right: 20px;
  color: ${p => p.color};
`
const LegendLine = styled.div<{ color: string }>`
  width: 40px;
  margin-right: 10px;
  height: 2px;
  background: ${p => p.color};
  box-shadow: 0 0 4px ${p => transparentize(0.5, p.color)};
`
const DynamoInfo = styled.div`
  display: flex;
  width: 80%;
  ${Text} {
    margin-bottom: 3px;
  }
`
const DynamoInfoColumn = styled.div`
  flex: 1;
  margin-right: 30px;
`
const TabIndicator = styled(StepIndicator)`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
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
  const dataPoints = dynamo ? dynamo.dataPoints : []

  if (isEmpty(data)) {
    return null
  }

  return (
    <StyledCard showBorder={false} className={className} isPrimary>
      <Content>
        {tab === 0 && (
          <Tab>
            <Header trigger={tab}>
              {`Top ${data.length} ${header}`}
            </Header>
            {map(data, x => (
              <Text key={x.name} trigger={tab}>
                <div>{x.name}</div>
                <div>{summaryFormatter(x)}</div>
              </Text>
            ))}
          </Tab>
        )}
        {tab > 0 && (
          <Tab>
            <Header trigger={tab}>
              {`${tab === 1 ? '' : toOrdinal(tab)} ${dynamoHeader}`}
            </Header>
            <Text trigger={tab}>
              {`${data[tab - 1].name} (billing mode: ${toLower(startCase(dynamo.billingMode))})`}
            </Text>
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
                    padding={{ top: 20, bottom: 5 }}
                    tickFormatter={yAxisFormatter}
                  />
                  <CartesianGrid stroke={tab ? colors.axis : colors.secondaryAxis} strokeOpacity={0.35} />
                  <Line
                    type="linear"
                    dataKey={first(units)!.value}
                    name={first(units)!.label}
                    stroke={colors.lines}
                    dot={dataPoints.length < 3}
                    strokeWidth={1.5}
                  />
                  {dynamo.billingMode === 'PROVISIONED' && (
                    <Line
                      type="linear"
                      dataKey={last(units)!.value}
                      name={last(units)!.label}
                      stroke="#DB60FF"
                      dot={dataPoints.length < 3}
                      strokeWidth={1.5}
                    />
                  )}
                  <StyledTooltip
                    wrapperStyle={{ opacity: 0.9 }}
                    contentStyle={{ background: tab ? colors.tooltipBackground : colors.secondaryTooltipBackground }}
                    labelStyle={{
                      fontSize: 12,
                      lineHeight: '12px',
                      marginBottom: 10,
                      color: tab ? colors.lines : colors.secondaryLines,
                    }}
                    itemStyle={{ fontSize: 12, lineHeight: '12px' }}
                    formatter={tooltipFormatter}
                    labelFormatter={(value: string) => DateTime.fromISO(value).toFormat('d LLL HH:mm')}
                  />
                </LineChart>
              </ResponsiveContainer>
            </GraphContainer>
            <Legend>
              {map(units, (unit, index) => (
                <LegendItem key={unit.label} color={index ? '#DB60FF' : colors.lines}>
                  <LegendLine color={index ? '#DB60FF' : colors.lines} />
                  {unit.label}
                </LegendItem>
              ))}
            </Legend>
            <DynamoInfo>
              <DynamoInfoColumn>
                {map(dynamoInfo, x => !isNil(dynamo[x.unit]) && (
                  <InfoText key={x.unit} trigger={tab}>
                    {x.text}:
                    <Value>{x.valueFn(dynamo[x.unit])}</Value>
                  </InfoText>
                ))}
              </DynamoInfoColumn>
              <DynamoInfoColumn>
                {dynamo.items && (
                  <InfoText trigger={tab}>
                    items:
                    <Value>{dynamo.items.toLocaleString('ru')}</Value>
                  </InfoText>
                )}
                {dynamo.sizeBytes && (
                  <InfoText trigger={tab}>
                    size:
                    <Value>{bytesToSize(dynamo.sizeBytes)}</Value>
                  </InfoText>
                )}
              </DynamoInfoColumn>
            </DynamoInfo>
          </Tab>
        )}
        <TabIndicator
          color={colors.primaryTab}
          index={tab}
          steps={TABS_AMOUNT}
          onClick={i => setTab(i)}
        />
      </Content>
    </StyledCard>
  )
}

export default withTheme(DataCard)
