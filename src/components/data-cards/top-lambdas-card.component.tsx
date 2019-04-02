import React from 'react'
import styled, { withTheme } from 'styled-components/macro'
import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { DateTime } from 'luxon'

import { useSwitchTab } from '../../hooks'
import Card from '../card.component'
import StepIndicator from '../steps-indicator.component'
import AnimatedText from '../animated-text.component'
import { toOrdinal } from '../../utils'

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

`
const InfoText = styled(Text)`
  display: flex;
  justify-content: space-between;
  :last-child {
    margin-bottom: 0;
  }
`
const Value = styled.div`
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
  width: 80%;
  ${Text} {
    margin-bottom: 3px;
  }
`
const LambdaInfoColumn = styled.div`
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
  const dataPoints = lambda ? lambda.dataPoints : []

  if (isEmpty(data)) {
    return null
  }

  return (
    <StyledCard showBorder={false} className={className} isPrimary={Boolean(tab)}>
      <Content>
        {tab === 0 && (
          <Tab>
            <Header>
              {`Top ${data.length} ${header}`}
            </Header>
            {map(data, x => (
              <Text key={x.lambdaName} trigger={tab}>
                <div>{x.lambdaName}</div>
                <div>{summaryFormatter(x)}</div>
              </Text>
            ))}
          </Tab>
        )}
        {tab > 0 && (
          <Tab>
            <Header>
              {`${toOrdinal(tab)} ${lambdaHeader}`}
            </Header>
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
                    padding={{ top: 20, bottom: 5 }}
                    tickFormatter={yAxisFormatter}
                  />
                  <CartesianGrid stroke={tab ? colors.axis : colors.secondaryAxis} strokeOpacity={0.35} />
                  <Line
                    type="linear"
                    dataKey={unit}
                    stroke={colors.lines}
                    dot={dataPoints.length < 3}
                    strokeWidth={1.5}
                  />
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
                {map(lambdaInfo, x => lambda[x.unit] && (
                  <InfoText key={x.unit} trigger={tab}>
                    {x.text}:
                    <Value>{x.valueFn(lambda[x.unit])}</Value>
                  </InfoText>
                ))}
              </LambdaInfoColumn>
              <LambdaInfoColumn>
                {lambda.runtime && (
                  <InfoText trigger={tab}>
                    runtime:
                    <Value>{lambda.runtime}</Value>
                  </InfoText>
                )}
                {lambda.size && (
                  <InfoText trigger={tab}>
                    memory size:
                    <Value>{lambda.size}MB</Value>
                  </InfoText>
                )}
                {lambda.timeout && (
                  <InfoText trigger={tab}>
                    timeout:
                    <Value>{lambda.timeout}s</Value>
                  </InfoText>
                )}
              </LambdaInfoColumn>
            </LambdaInfo>
          </Tab>
        )}
        <TabIndicator
          color={tab ? colors.primaryTab : colors.secondaryTab}
          index={tab}
          steps={TABS_AMOUNT}
          onClick={i => setTab(i)}
        />
      </Content>
    </StyledCard>
  )
}

export default withTheme(DataCard)
