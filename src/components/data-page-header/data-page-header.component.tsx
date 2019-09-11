import React, { useEffect, useState } from 'react'
import { Typography } from '@material-ui/core'
import moment, { Moment } from 'moment'

import { DatepickerWrapper, HeaderContainer, PredefinedDate } from './data-page-header.styles'
import { DateRangePicker } from '../date-range-picker'

export interface DefinedDateRange {
  startDate: Moment,
  endDate: Moment,
}

interface DataPageHeaderProps {
    title: string,
    onDateRangeChanged: (range: DefinedDateRange) => void,
    startDate: Moment | null,
    endDate: Moment | null,
}

export const DataPageHeader = ({ title, startDate, endDate, onDateRangeChanged }: DataPageHeaderProps) => {
  const today = moment()

  const [{ innerStartDate, innerEndDate }, setInnerRange] = useState({ innerStartDate: startDate, innerEndDate: endDate })

  useEffect(() => {
    setInnerRange({ innerStartDate: startDate, innerEndDate: endDate })
  }, [startDate, endDate])

  const sevenDaysAgo = moment().subtract(6, 'days').startOf('day')
  const startOfMonth = moment().startOf('month').startOf('day')

  const normalizedStartDate = moment(innerStartDate!).startOf('day')
  const normalizedEndDate = moment(innerEndDate!).endOf('day')

  const startOfToday = moment(today).startOf('day')
  const endOfToday = moment(today).endOf('day')

  const isTodaySelected = startOfToday.isSame(normalizedStartDate) && endOfToday.isSame(normalizedEndDate)
  const isLast7DaysSelected = sevenDaysAgo.isSame(normalizedStartDate) && endOfToday.isSame(normalizedEndDate!)
  const isThisMonthSelected = startOfMonth.isSame(normalizedStartDate!) && endOfToday.isSame(normalizedEndDate!)

  return (
    <HeaderContainer>
      <Typography variant="h4">
        {title}
      </Typography>
      <DatepickerWrapper>
        <PredefinedDate
          onClick={() => onDateRangeChanged({ startDate: startOfToday, endDate: endOfToday })}
          active={isTodaySelected}
        >
          Today
        </PredefinedDate>
        <PredefinedDate
          onClick={() => onDateRangeChanged({ startDate: sevenDaysAgo, endDate: endOfToday })}
          active={isLast7DaysSelected}
        >
            Last 7 days
        </PredefinedDate>
        <PredefinedDate
          onClick={() => onDateRangeChanged({ startDate: startOfMonth, endDate: endOfToday })}
          active={isThisMonthSelected}
        >
            This Month
        </PredefinedDate>
        <DateRangePicker
          id={title}
          startDate={innerStartDate}
          endDate={innerEndDate}
          onDateRangeChanged={({ startDate: newStartDate, endDate: newEndDate }) => {
            setInnerRange({ innerStartDate: newStartDate, innerEndDate: newEndDate })

            if (newStartDate && newEndDate) {
              onDateRangeChanged({
                startDate: newStartDate!.startOf('day'),
                endDate: newEndDate!.isSame(today, 'day') ?
                  moment().startOf('hour')
                  : newEndDate!.endOf('day'),
              })
            }
          }}
        />
      </DatepickerWrapper>
    </HeaderContainer>
  )
}
