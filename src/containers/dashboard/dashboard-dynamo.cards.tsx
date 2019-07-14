import React, { memo } from 'react'
import round from 'lodash/round'

import TopDynamoCard from '../../components/data-cards/top-dynamo-card.component'
import { formatNumber } from '../../utils'

interface GraphsProps {
  timeAxisFormat: string
  data: any
}

export const DynamoGraphs = memo(({ data, timeAxisFormat }: GraphsProps) => (
  <>
    <TopDynamoCard
      header="Read Heavy Tables"
      dynamoHeader="Most Read Table"
      units={[{ label: 'consumed', value: 'consumedRead' }, { label: 'provisioned', value: 'provisionedRead' }]}
      data={data.mostReadTables}
      summaryFormatter={x => `${x.consumedRead!.toLocaleString('ru')} read units`}
      yAxisFormatter={x => formatNumber(x)}
      tooltipFormatter={x => Number(x).toLocaleString()}
      timeAxisFormat={timeAxisFormat}
      dynamoInfo={[
        { unit: 'consumedRead', text: 'total', valueFn: x => x.toLocaleString('ru') },
        { unit: 'averageConsumedRead', text: 'average', valueFn: x => `${round(x, 2).toLocaleString('en')}/s` },
      ]}
    />
    <TopDynamoCard
      header="Write Heavy Tables"
      dynamoHeader="Most Written Table"
      units={[{ label: 'consumed', value: 'consumedWrite' }, { label: 'provisioned', value: 'provisionedWrite' }]}
      data={data.mostWritesTables}
      summaryFormatter={x => `${x.consumedWrite!.toLocaleString('ru')} write units`}
      yAxisFormatter={x => formatNumber(x)}
      tooltipFormatter={x => Number(x).toLocaleString()}
      timeAxisFormat={timeAxisFormat}
      dynamoInfo={[
        { unit: 'consumedWrite', text: 'total', valueFn: x => x.toLocaleString('ru') },
        { unit: 'averageConsumedWrite', text: 'average', valueFn: x => `${round(x, 2).toLocaleString('en')}/s` },
      ]}
    />
    <TopDynamoCard
      header="Throttling Tables"
      dynamoHeader="Most Throttled Table"
      units={[
        { label: 'throttled reads', value: 'throttledReads' },
        { label: 'throttled writes', value: 'throttledWrites' },
      ]}
      data={data.mostThrottledTables}
      summaryFormatter={x => `${x.throttledRequests!.toLocaleString('ru')} throttled requests`}
      yAxisFormatter={x => formatNumber(x)}
      tooltipFormatter={x => Number(x).toLocaleString()}
      timeAxisFormat={timeAxisFormat}
      dynamoInfo={[
        { unit: 'throttledReads', text: 'throttled reads', valueFn: x => x.toLocaleString('ru') },
        { unit: 'throttledWrites', text: 'throttled writes', valueFn: x => x.toLocaleString('ru') },
      ]}
    />
    <TopDynamoCard
      header="Expensive Tables"
      dynamoHeader="Most Expensive Table"
      units={[{ label: 'read price', value: 'readPrice' }, { label: 'write price', value: 'writePrice' }]}
      data={data.mostExpensiveTables}
      summaryFormatter={x => `$ ${(x.readPrice! + x.writePrice!).toLocaleString('en')}`}
      yAxisFormatter={x => `$ ${formatNumber(x)}`}
      tooltipFormatter={x => `$ ${Number(x).toLocaleString()}`}
      timeAxisFormat={timeAxisFormat}
      dynamoInfo={[
        { unit: 'readPrice', text: 'read price', valueFn: x => `$ ${x.toLocaleString('en')}` },
        { unit: 'writePrice', text: 'write price', valueFn: x => `$ ${x.toLocaleString('en')}` },
      ]}
    />
  </>
))
