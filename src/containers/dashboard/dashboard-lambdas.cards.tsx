import React, { memo } from 'react'
import round from 'lodash/round'

import LambdaSummaryCard from '../../components/data-cards/lambda-summary-card.component'
import TopLambdasCard from '../../components/data-cards/top-lambdas-card.component'
import { formatNumber, msToDuration } from '../../utils'

interface GraphsProps {
  count: number
  timeAxisFormat: string
  data: any
}

export const LambdasGraphs = memo(({ count, data, timeAxisFormat }: GraphsProps) => (
  <>
    <LambdaSummaryCard count={count} data={data.totals} timeAxisFormat={timeAxisFormat} />
    <TopLambdasCard
      header="Most Invoked Lambdas"
      lambdaHeader="Most Invoked Lambda"
      unit="invocations"
      count={count}
      data={data.mostInvokedLambdas}
      summaryFormatter={x => `${x.invocations!.toLocaleString('ru')} invocations`}
      yAxisFormatter={x => formatNumber(x)}
      tooltipFormatter={x => Number(x).toLocaleString()}
      timeAxisFormat={timeAxisFormat}
      lambdaInfo={[
        {
          unit: 'invocations',
          text: 'total',
          valueFn: x => x.toLocaleString('ru'),
        },
        {
          unit: 'invocationsPerSecond',
          text: 'average',
          valueFn: x => `${round(x * 60, 2).toLocaleString('en')}/min`,
        },
      ]}
    />
    <TopLambdasCard
      header="Slowest Lambdas"
      lambdaHeader="Slowest Lambda"
      unit="averageDuration"
      count={count}
      data={data.slowestLambdas}
      summaryFormatter={x => `${msToDuration(x.averageDuration!)} average`}
      yAxisFormatter={x => `${msToDuration(x)}`}
      tooltipFormatter={x => `${msToDuration(x)}`}
      timeAxisFormat={timeAxisFormat}
      lambdaInfo={[
        {
          unit: 'averageDuration',
          text: 'average',
          valueFn: x => `${msToDuration(x)}`,
        },
        {
          unit: 'maxDuration',
          text: 'max',
          valueFn: x => `${msToDuration(x)}`,
        },
      ]}
    />
    <TopLambdasCard
      header="Most Faulty Lambdas"
      lambdaHeader="Most Faulty Lambda"
      unit="errors"
      count={count}
      data={data.mostErrorsLambdas}
      summaryFormatter={x => `${x.errors!.toLocaleString('ru')} errors`}
      yAxisFormatter={x => formatNumber(x)}
      tooltipFormatter={x => Number(x).toLocaleString()}
      timeAxisFormat={timeAxisFormat}
      lambdaInfo={[
        {
          unit: 'errors',
          text: 'total',
          valueFn: x => x.toLocaleString('ru'),
        },
        {
          unit: 'errorRate',
          text: 'error rate',
          valueFn: x => `${round(x, 2).toLocaleString('en')}%`,
        },
      ]}
    />
    <TopLambdasCard
      header="Most Expensive Lambdas"
      lambdaHeader="Most Expensive Lambda"
      unit="cost"
      count={count}
      data={data.mostExpensiveLambdas}
      summaryFormatter={x => `$ ${formatNumber(x.cost!, 6).toLocaleString('en')}`}
      yAxisFormatter={x => `$ ${formatNumber(x, 4).toLocaleString('en')}`}
      tooltipFormatter={x => `$${formatNumber(Number(x), 6).toLocaleString('en')}`}
      timeAxisFormat={timeAxisFormat}
      lambdaInfo={[
        {
          unit: 'cost',
          text: 'cost',
          valueFn: x => `$ ${formatNumber(x, 6).toLocaleString('en')}`,
        },
      ]}
    />
  </>
))
