import React from 'react'
import styled, { withTheme } from 'styled-components/macro'
import map from 'lodash/map'
import startCase from 'lodash/startCase'
import toLower from 'lodash/toLower'
import first from 'lodash/first'
import last from 'lodash/last'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { DateTime } from 'luxon'

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
  flex: 1;
`
const LambdaInfo = styled.div`
  display: flex;
  ${Text} {
    margin-bottom: 3px;
  }
`
const LambdaInfoColumn = styled.div`
  flex: 1
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
  items?: number
  provisionedRead?: number
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
  header?: string
  dynamoHeader?: string
  className?: string
  units?: string[]
  summaryFormatter: (value: Data) => string
  tooltipFormatter: (value: string) => string
  yAxisFormatter: (value: any) => any
  dynamoInfo?: DynamoInfoItem []
  theme: any
}

const DataCard = (props: TopDynamoCardProps) => {
  const { data, dynamoInfo, count, theme, header, units } = props
  const { dynamoHeader, tooltipFormatter, yAxisFormatter, summaryFormatter, className } = props
  const TABS_AMOUNT = data.length + 1
  const { dataCard: colors } = theme
  const [tab, setTab] = useSwitchTab(count, TABS_AMOUNT, 0)
  const dynamo = data[tab - 1]
  const dataPoints = dynamo ? dynamo.dataPoints : []

  return (
    <StyledCard showBorder={false} className={className} isPrimary>
      <Content>
        {tab === 0 && (
          <Tab>
            <Header>
              {header}
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
            <Header>
              {`${toOrdinal(tab)} ${dynamoHeader}`}
            </Header>
            <Text>{`${data[tab - 1].name} (billing mode: ${toLower(startCase(dynamo.billingMode))})`}</Text>
            <GraphContainer>
              <ResponsiveContainer>
                <LineChart data={dataPoints} margin={{ top: 0, right: -25, left: -25, bottom: 0 }}>
                  <XAxis
                    dataKey="dateTime"
                    stroke={tab ? colors.axis : colors.secondaryAxis}
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    tickFormatter={x => DateTime.fromISO(x).toFormat('HH:mm')}
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
                    dataKey={first(units)!}
                    stroke={colors.lines}
                    dot={dataPoints.length < 3}
                    strokeWidth={1.5}
                  />
                  {dynamo.billingMode === 'PROVISIONED' && (
                    <Line
                      type="linear"
                      dataKey={last(units)!}
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
            <LambdaInfo>
              <LambdaInfoColumn>
                {map(dynamoInfo, x => dynamo[x.unit] && (
                  <Text key={x.unit} trigger={tab}>
                    {x.text}:
                    <Value>{x.valueFn(dynamo[x.unit])}</Value>
                  </Text>
                ))}
              </LambdaInfoColumn>
              <LambdaInfoColumn>
                {dynamo.items && (
                  <Text trigger={tab}>
                    items:
                    <Value>{dynamo.items.toLocaleString('ru')}</Value>
                  </Text>
                )}
                {dynamo.sizeBytes && (
                  <Text trigger={tab}>
                    size:
                    <Value>{bytesToSize(dynamo.sizeBytes)}</Value>
                  </Text>
                )}
              </LambdaInfoColumn>
            </LambdaInfo>
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
