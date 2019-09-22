import { DateTime } from 'luxon'
import { linearRegression, linearRegressionLine } from 'simple-statistics'
import { Moment } from 'moment'

import map from 'lodash/map'
import first from 'lodash/first'
import last from 'lodash/last'
import round from 'lodash/round'
import orderBy from 'lodash/orderBy'
import reduce from 'lodash/reduce'
import forEach from 'lodash/forEach'
import filter from 'lodash/filter'
import sumBy from 'lodash/sumBy'
import isFunction from 'lodash/isFunction'
import get from 'lodash/get'

import { analyzeTimeRange } from '../../../utils'

interface Fields {
  title?: string
  date: string
  value: string
}

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
    title: ({ title }: Fields) => `${title} Cost`,
    text: ({ title }: Fields) => `${title} cost is`,
    titleField: 'name',
    icon: 'cost',
    trendsField: 'mostExpensiveService',
    valueField: 'total',
    dateField: 'date',
  },
  {
    title: ({ title }: Fields) => `${title} Cost`,
    text: ({ title }: Fields) => `${title} cost is`,
    titleField: 'name',
    icon: 'cost',
    trendsField: 'secondExpensiveService',
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

export const getTrendTitle = (data: any, activeIndex: number) => {
  const trend = TRENDS[activeIndex]

  if (isFunction(trend.title)) {
    return trend.title({
      title: get(first(data), `[${trend.titleField}]`),
      value: get(first(data), `[${trend.valueField}]`),
      date: get(first(data), `[${trend.dateField}]`),
    })
  }

  return trend.title
}

export const getTrendText = (data: any, activeIndex: number, startDate: Moment, endDate: Moment) => {
  const graphData = getGraphData(data, activeIndex)
  const lastPoint = last(graphData)!
  const date = getDateIntervalText(startDate, endDate)
  const trend = TRENDS[activeIndex]

  const baseText = isFunction(trend.text) ?
    trend.text({
      title: get(first(data), `[${trend.titleField}]`),
      value: get(first(data), `[${trend.valueField}]`),
      date: get(first(data), `[${trend.dateField}]`),
    }) : trend.text

  if (lastPoint.value === lastPoint.trendData) {
    return `${baseText} stable ${date}`
  }

  if (lastPoint.value > lastPoint.trendData) {
    const percent = round(((lastPoint.value - lastPoint.trendData) / lastPoint.value) * 100, 2)
    return `${baseText} up ${percent}% ${date}`
  }

  const percent = round(((lastPoint.trendData - lastPoint.value) / lastPoint.trendData) * 100, 2)
  return `${baseText} down ${percent}% ${date}`
}

export const getMostExpensiveServiceData = (data: any[], index = 0) => {
  const dataKeys = reduce(data, (acc, x) => {
    forEach(x.serviceCosts, (service) => {
      acc[service.serviceName] = (acc[service.serviceName] || 0) + service.unblendedCost
    })
    return acc
  }, {} as any)

  const orderedServices = orderBy(map(dataKeys, (cost, name) => ({ cost, name })), 'cost', 'desc')
  const service = orderedServices[index]

  return map(data, (x) => {
    const filteredServices = filter(x.serviceCosts, (s) => service.name === s.serviceName)
    return { date: x.date, total: sumBy(filteredServices, 'unblendedCost'), name: service.name }
  })
}
