import React, { memo } from 'react'
import styled from 'styled-components/macro'
import { Typography } from '@material-ui/core'
import { linearRegression, linearRegressionLine } from 'simple-statistics'
import { DateTime } from 'luxon'
import map from 'lodash/map'
import first from 'lodash/first'
import last from 'lodash/last'
import { AreaChart, ResponsiveContainer } from 'recharts'

const Wrapper = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding-bottom: 20px;
`
const Title = styled(Typography)`
  margin: 10px 0 15px 20px;
`

interface TrendsCardProps {
  trends: {
    costsData: any,
    lambdasData: any,
  }
}

// global costs
// invocations
// errors
// Top 2 todays most expensive services trends
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
export const TrendsCard = memo(({ trends }: TrendsCardProps) => {
  const { costsData } = trends
  // date, total
  const formattedCostData = map(costsData, (x) => ({ date: DateTime.fromISO(x.date).valueOf(), total: x.total}))
  const regressionData = map(formattedCostData, (x) => [x.date, x.total])
  const regression = linearRegression(regressionData)
  console.log(regression)
  console.log(costsData)
  const lineFn = linearRegressionLine(regression)

  const trendLine = [first(first(regressionData)), first(last(regressionData))]
    .map((x) => ({ date: x, total: lineFn(x) }))

  console.log(trendLine)

  return (
    <Wrapper>
      <Title variant="h5">Trends</Title>
      <div>
        <ResponsiveContainer>
          <AreaChart data={formattedCostData}>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Wrapper>
  )
})
