import moment, { Moment } from 'moment'

export const analyzeTimeRange = (startDate: Moment, endDate: Moment) => {
  const today = moment()

  const sevenDaysAgo = moment().subtract(6, 'days').startOf('day')
  const startOfMonth = moment().startOf('month').startOf('day')

  const normalizedStartDate = moment(startDate).startOf('day')
  const normalizedEndDate = moment(endDate).endOf('day')

  const startOfToday = moment(today).startOf('day')
  const endOfToday = moment(today).endOf('day')

  const isTodaySelected = startOfToday.isSame(normalizedStartDate) && endOfToday.isSame(normalizedEndDate)
  const isLast7DaysSelected = sevenDaysAgo.isSame(normalizedStartDate) && endOfToday.isSame(normalizedEndDate!)
  const isThisMonthSelected = startOfMonth.isSame(normalizedStartDate!) && endOfToday.isSame(normalizedEndDate!)

  return { isTodaySelected, isLast7DaysSelected, isThisMonthSelected }
}
