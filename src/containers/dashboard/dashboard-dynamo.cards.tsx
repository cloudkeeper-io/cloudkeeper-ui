import React, { memo } from 'react'

import TopDynamoCard from '../../components/data-cards/top-dynamo-card.component'
import { formatNumber } from '../../utils'

interface GraphsProps {
  count: number
  data: any
}


export const DynamoGraphs24h = memo(({ count, data }: GraphsProps) => {
  console.log(count)
  console.log(data)
  return (
    <>
      <TopDynamoCard
        header="Top 5 Read Heavy Tables"
        dynamoHeader="Most Read Table"
        units={['consumedRead', 'provisionedRead']}
        count={count}
        data={data.mostReadTables}
        summaryFormatter={x => `${x.consumedRead!.toLocaleString('ru')} read units`}
        yAxisFormatter={x => formatNumber(x)}
        tooltipFormatter={x => Number(x).toLocaleString()}
        dynamoInfo={[
          {
            unit: 'consumedRead',
            text: 'total',
            valueFn: x => x.toLocaleString('ru'),
          },
          // {
          //   unit: 'invocationsPerSecond',
          //   text: 'average',
          //   valueFn: x => `${round(x * 60, 2).toLocaleString('en')}/min`,
          // },
        ]}
      />
    </>
  )
})
