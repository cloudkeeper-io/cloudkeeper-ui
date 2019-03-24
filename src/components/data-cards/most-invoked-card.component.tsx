import React from 'react'
import styled, { withTheme } from 'styled-components/macro'
import map from 'lodash/map'
import sumBy from 'lodash/sumBy'
import random from 'lodash/random'

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { DateTime } from 'luxon'
import { formatNumber } from '../../utils'

import { useSwitchTab } from '../../hooks'
import Card from '../card.component'
import StepIndicator from '../steps-indicator.component'
import AnimatedText from '../animated-text.component'

const StyledCard = styled(Card)`
  margin: auto;
  width: 100%;
  height: 300px;
  ${Card.Content} {
    background: ${p => p.theme.dataCard.secondaryBackground};
    color: ${p => p.theme.colors.activeText};
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
  padding: 10px 20px 0 50px;
`
const Header = styled(AnimatedText)`
  font-size: 22px;
  line-height: 24px;
  margin-top: 10px;
  margin-bottom: 10px;
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
const GraphContainer = styled.div`
  width: 100%;
  height: 130px;
  margin-left: -32px;
`
const Tab = styled.div`
  width: 100%;
  flex: 1;
`
const LambdaInfo = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-gap: 0 10px;
  ${Text} {
    margin-bottom: 0;
  }
`
const TabIndicator = styled(StepIndicator)`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`
const StyledTooltip = Tooltip as any

interface MostInvokedCardProps {
  data: Array<{
    lambdaName: string,
    invocations: number,
    dataPoints: Array<{
      invocations: number,
      dateTime: string,
    }>
  }>,
  count: number,
  className?: string,
  theme: any,
}

const DataCard = ({ data, count, theme, className }: MostInvokedCardProps) => {
  const TABS_AMOUNT = 6
  const { dataCard: colors } = theme
  const [tab, setTab] = useSwitchTab(count, TABS_AMOUNT, 1)
  const dataPoints = tab > 0 ? data[tab - 1].dataPoints : []

  return (
    <StyledCard showBorder={false} className={className}>
      <Content>
        {tab === 0 && (
          <Tab>
            <Header>
              Top 5 Most Invoked Lambdas
            </Header>
            {map(data, x => (
              <Text key={x.lambdaName} trigger={tab}>
                <>
                  <div>{x.lambdaName}</div>
                  <div>{x.invocations.toLocaleString('ru')} invocations</div>
                </>
              </Text>
            ))}
          </Tab>
        )}
        {tab > 0 && (
          <Tab>
            <Header>
              Most Invoked Lambda Last 24h
            </Header>
            <Text>{data[tab - 1].lambdaName}</Text>
            <GraphContainer>
              <ResponsiveContainer>
                <LineChart data={dataPoints} margin={{ top: 0, right: 30, left: -25, bottom: 0 }}>
                  <XAxis
                    dataKey="dateTime"
                    stroke={colors.secondaryAxis}
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    tickFormatter={x => DateTime.fromISO(x).toFormat('HH:mm')}
                  />
                  <YAxis
                    stroke={colors.secondaryAxis}
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    type="number"
                    padding={{ top: 20, bottom: 5 }}
                    tickFormatter={x => formatNumber(x)}
                  />
                  <CartesianGrid stroke={colors.secondaryAxis} strokeOpacity={0.35} />
                  <Line
                    type="linear"
                    dataKey="invocations"
                    stroke={colors.secondaryLines}
                    dot={false}
                    strokeWidth={1.5}
                  />
                  <StyledTooltip
                    wrapperStyle={{ opacity: 0.9 }}
                    contentStyle={{ background: colors.secondaryTooltipBackground }}
                    labelStyle={{ fontSize: 12, lineHeight: '12px', marginBottom: 10, color: colors.secondaryLines }}
                    itemStyle={{ fontSize: 12, lineHeight: '12px' }}
                    formatter={(value: string) => Number(value).toLocaleString()}
                    labelFormatter={(value: string) => DateTime.fromISO(value).toFormat('d LLL HH:mm')}
                  />
                </LineChart>
              </ResponsiveContainer>
            </GraphContainer>
            <LambdaInfo>
              <Text>{`total: ${sumBy(dataPoints, 'invocations').toLocaleString('ru')}`}</Text>
              <Text trigger={tab}>runtime: node.js 8.10</Text>
              <Text>{`average: ${(random(100, 600)).toLocaleString('ru')}ms`}</Text>
              <Text trigger={tab}>size: 2048mb</Text>
              <Text trigger={tab}>timeout: 60s</Text>
            </LambdaInfo>
          </Tab>
        )}
        <TabIndicator color={colors.secondaryTab} index={tab} steps={TABS_AMOUNT} onClick={i => setTab(i)} />
      </Content>
    </StyledCard>
  )
}

export default withTheme(DataCard)
