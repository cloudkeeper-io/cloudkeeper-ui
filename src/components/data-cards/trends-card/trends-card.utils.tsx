import { DateTime } from 'luxon'
import { linearRegression, linearRegressionLine } from 'simple-statistics'
import { Moment } from 'moment'

import map from 'lodash/map'
import first from 'lodash/first'
import last from 'lodash/last'
import round from 'lodash/round'
import take from 'lodash/take'
import orderBy from 'lodash/orderBy'
import reduce from 'lodash/reduce'
import forEach from 'lodash/forEach'
import includes from 'lodash/includes'
import filter from 'lodash/filter'
import sumBy from 'lodash/sumBy'
import { analyzeTimeRange } from '../../../utils'

export const TRENDS = [
  {
    title: 'Global Costs',
    icon: 'cost',
    text: 'Global costs is',
    trendsField: 'costsData',
    valueField: 'total',
    dateField: 'date',
  },
  {
    title: 'Lambda Executions',
    icon: 'AWS Lambda',
    text: 'Lambda executions is',
    trendsField: 'lambdasData',
    valueField: 'invocations',
    dateField: 'dateTime',
  },
  {
    title: 'Lambda Errors',
    icon: 'AWS Lambda',
    text: 'Lambda errors is',
    trendsField: 'lambdasData',
    valueField: 'errors',
    dateField: 'dateTime',
  },
  {
    title: 'Most Expensive Services',
    icon: 'cost',
    text: 'Top 2 most expensive services cost is',
    trendsField: 'mostExpensiveCost',
    valueField: 'total',
    dateField: 'date',
  },
]

const getDateIntervalText = (startDate: Moment, endDate: Moment) => {
  const { isTodaySelected, isLast7DaysSelected, isThisMonthSelected } = analyzeTimeRange(startDate!, endDate!)

  if (isTodaySelected) {
    return 'today'
  }

  if (isLast7DaysSelected) {
    return 'in last 7 days'
  }

  if (isThisMonthSelected) {
    return 'in last 30 days'
  }

  return `in period from ${startDate.format('DD MMM YYYY')} to ${endDate.format('DD MMM YYYY')}`
}

export const getGraphData = (data: any, activeIndex: number) => {
  const { dateField, valueField } = TRENDS[activeIndex]
  const formattedCostData = map(data, (x) => ({ date: DateTime.fromISO(x[dateField]).valueOf(), value: x[valueField] }))
  const regressionData = map(formattedCostData, (x) => [x.date, x.value])
  const regression = linearRegression(regressionData)
  const lineFn = linearRegressionLine(regression)

  return map(formattedCostData, (x, index) => ({ ...x, trendData: lineFn(first(regressionData[index])) }))
}

export const getTrendText = (data: any, activeIndex: number, startDate: Moment, endDate: Moment) => {
  const graphData = getGraphData(data, activeIndex)
  const lastPoint = last(graphData)!
  const date = getDateIntervalText(startDate, endDate)

  if (lastPoint.value === lastPoint.trendData) {
    return `${TRENDS[activeIndex].text} stable ${date}`
  }

  if (lastPoint.value > lastPoint.trendData) {
    const percent = round(((lastPoint.value - lastPoint.trendData) / lastPoint.value) * 100, 2)
    return `${TRENDS[activeIndex].text} up ${percent}% ${date}`
  }

  const percent = round(((lastPoint.trendData - lastPoint.value) / lastPoint.trendData) * 100, 2)
  return `${TRENDS[activeIndex].text} down ${percent}% ${date}`
}

export const getTop2ExpensiveServiceData = (data: any[]) => {
  const dataKeys = reduce(data, (acc, x) => {
    forEach(x.serviceCosts, (service) => {
      acc[service.serviceName] = (acc[service.serviceName] || 0) + service.unblendedCost
    })
    return acc
  }, {} as any)

  const orderedServices = orderBy(map(dataKeys, (cost, name) => ({ cost, name })), 'cost', 'desc')
  const top2ServiceNames = map(take(orderedServices, 2), (x) => x.name)

  return map(data, (x) => {
    const filteredServices = filter(x.serviceCosts, (service) => includes(top2ServiceNames, service.serviceName))
    return { ...x, total: sumBy(filteredServices, 'unblendedCost') }
  })
}
