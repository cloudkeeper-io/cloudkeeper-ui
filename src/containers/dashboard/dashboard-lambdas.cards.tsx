/* eslint-disable react/no-multi-comp */
import React, { memo } from 'react'
import { Duration } from 'luxon'
import round from 'lodash/round'

import TotalInvocationsCard from '../../components/data-cards/total-invocations-card.component'
import TopLambdasCard from '../../components/data-cards/top-lambdas-card.component'
import { formatNumber, msToSeconds } from '../../utils'

interface GraphsProps {
  count: number
  data: any
}

export const LambdasGraphs24h = memo(({ count, data }: GraphsProps) => (
  <>
    <TotalInvocationsCard count={count} data={data.totals} />
    <TopLambdasCard
      header="Top 5 Most Invoked Lambdas"
      lambdaHeader="Most Invoked Lambda"
      unit="invocations"
      count={count}
      data={data.mostInvokedLambdas}
      summaryFormatter={x => `${x.invocations!.toLocaleString('ru')} invocations`}
      yAxisFormatter={x => formatNumber(x)}
      tooltipFormatter={x => Number(x).toLocaleString()}
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
      header="Top 5 Slowest Lambdas"
      lambdaHeader="Slowest Lambda"
      unit="averageDuration"
      count={count}
      data={data.slowestLambdas}
      summaryFormatter={x => `${msToSeconds(x.averageDuration!)} sec average`}
      yAxisFormatter={x => `${msToSeconds(x)}s`}
      tooltipFormatter={x => `${msToSeconds(x)}s`}
      lambdaInfo={[
        {
          unit: 'averageDuration',
          text: 'average',
          valueFn: x => `${Duration.fromObject({ milliseconds: x }).toFormat('s')}s`,
        },
        {
          unit: 'maxDuration',
          text: 'max',
          valueFn: x => `${Duration.fromObject({ milliseconds: x }).toFormat('s')}s`,
        },
      ]}
    />
    <TopLambdasCard
      header="Top 5 Most Faulty Lambdas"
      lambdaHeader="Most Faulty Lambda"
      unit="errors"
      count={count}
      data={data.mostErrorsLambdas}
      summaryFormatter={x => `${x.errors!.toLocaleString('ru')} errors`}
      yAxisFormatter={x => formatNumber(x)}
      tooltipFormatter={x => Number(x).toLocaleString()}
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
      header="Top 5 Most Expensive Lambdas"
      lambdaHeader="Most Expensive Lambda"
      unit="cost"
      count={count}
      data={data.mostExpensiveLambdas}
      summaryFormatter={x => `$ ${round(x.cost!, 2).toLocaleString('en')}`}
      yAxisFormatter={x => `$ ${round(x, 2).toLocaleString('en')}`}
      tooltipFormatter={x => `$${round(Number(x), 2).toLocaleString('en')}`}
      lambdaInfo={[
        {
          unit: 'cost',
          text: '24h cost:',
          valueFn: x => `$ ${round(x, 2).toLocaleString('en')}`,
        },
      ]}
    />
  </>
))

export const LambdasGraphs30d = memo(({ count, data }: GraphsProps) => (
  <>
    <TotalInvocationsCard count={count} data={data.totals} />
    <TopLambdasCard
      header="Top 5 Most Invoked Lambdas"
      lambdaHeader="Most Invoked Lambdas Last 30 Days"
      unit="invocations"
      count={count}
      data={data.mostInvokedLambdas}
      summaryFormatter={x => `${x.invocations!.toLocaleString('ru')} invocations`}
      yAxisFormatter={x => formatNumber(x)}
      tooltipFormatter={x => Number(x).toLocaleString()}
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
      header="Top 5 Slowest Lambdas"
      lambdaHeader="Slowest Lambdas Last 30 Days"
      unit="averageDuration"
      count={count}
      data={data.slowestLambdas}
      summaryFormatter={x => `${msToSeconds(x.averageDuration!)} sec average`}
      yAxisFormatter={x => `${msToSeconds(x)}s`}
      tooltipFormatter={x => `${msToSeconds(x)}s`}
      lambdaInfo={[
        {
          unit: 'averageDuration',
          text: 'average',
          valueFn: x => `${Duration.fromObject({ milliseconds: x }).toFormat('s')}s`,
        },
        {
          unit: 'maxDuration',
          text: 'max',
          valueFn: x => `${Duration.fromObject({ milliseconds: x }).toFormat('s')}s`,
        },
      ]}
    />
    <TopLambdasCard
      header="Top 5 Most Faulty Lambdas"
      lambdaHeader="Most Faulty Lambdas Last 30 Days"
      unit="errors"
      count={count}
      data={data.mostErrorsLambdas}
      summaryFormatter={x => `${x.errors!.toLocaleString('ru')} errors`}
      yAxisFormatter={x => formatNumber(x)}
      tooltipFormatter={x => Number(x).toLocaleString()}
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
      header="Top 5 Most Expensive Lambdas"
      lambdaHeader="Most Expensive Lambdas Last 30 Days"
      unit="cost"
      count={count}
      data={data.mostExpensiveLambdas}
      summaryFormatter={x => `$ ${round(x.cost!, 2).toLocaleString('en')}`}
      yAxisFormatter={x => `$ ${round(x, 2).toLocaleString('en')}`}
      tooltipFormatter={x => `$${round(Number(x), 2).toLocaleString('en')}`}
      lambdaInfo={[
        {
          unit: 'cost',
          text: 'monthly cost',
          valueFn: x => `$ ${round(x, 2).toLocaleString('en')}`,
        },
      ]}
    />
  </>
))
