import React from 'react'
import { Typography } from '@material-ui/core'
import moment, { Moment } from 'moment'

import { DatepickerWrapper, HeaderContainer, PredefinedDate } from './data-page-hader.styles'
import { DateRangePicker } from '../date-range-picker'
import { DateRange } from '../datepicker/datepicker.component'

interface DataPageHeaderProps {
    title: string,
    onDateRangeChanged: (range: DateRange) => void,
    startDate: Moment | null,
    endDate: Moment | null,
}

export const DataPageHeader = ({ title, startDate, endDate, onDateRangeChanged }: DataPageHeaderProps) => {
  const today = moment()

  const sevenDaysAgo = moment().subtract(6, 'days').startOf('day')
  const startOfMonth = moment().startOf('month').startOf('day')

  const normalizedStartDate = moment(startDate!).startOf('day')
  const normalizedEndDate = moment(endDate!).endOf('day')

  const startOfToday = moment(today).startOf('day')
  const endOfToday = moment(today).endOf('day')

  const isTodaySelected = startOfToday.isSame(normalizedStartDate) && endOfToday.isSame(normalizedEndDate)
  const isLast7DaysSelected = sevenDaysAgo.isSame(normalizedStartDate) && endOfToday.isSame(endDate!)
  const isThisMonthSelected = startOfMonth.isSame(startDate!) && endOfToday.isSame(endDate!)

  return (
    <HeaderContainer>
      <Typography variant="h4">
        {title}
      </Typography>
      <DatepickerWrapper>
        <PredefinedDate
          onClick={() => onDateRangeChanged({ startDate: today, endDate: today })}
          active={isTodaySelected}
        >
          Today
        </PredefinedDate>
        <PredefinedDate
          onClick={() => onDateRangeChanged({ startDate: sevenDaysAgo, endDate: today })}
          active={isLast7DaysSelected}
        >
            Last 7 days
        </PredefinedDate>
        <PredefinedDate
          onClick={() => onDateRangeChanged({ startDate: startOfMonth, endDate: today })}
          active={isThisMonthSelected}
        >
            This Month
        </PredefinedDate>
        <DateRangePicker
          id={title}
          startDate={startDate}
          endDate={endDate}
          onDateRangeChanged={onDateRangeChanged}
        />
      </DatepickerWrapper>
    </HeaderContainer>
  )
}
