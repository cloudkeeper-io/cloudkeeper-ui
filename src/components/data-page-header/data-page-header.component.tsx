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
  const sevenDaysAgo = moment().subtract(7, 'days')
  const startOfMonth = moment().startOf('month')

  return (
    <HeaderContainer>
      <Typography variant="h4">
        {title}
      </Typography>
      <DatepickerWrapper>
        <PredefinedDate
          onClick={() => onDateRangeChanged({ startDate: today, endDate: today })}
          active={today.isSame(startDate!, 'day') && today.isSame(endDate!, 'day')}
        >
          Today
        </PredefinedDate>
        <PredefinedDate
          onClick={() => onDateRangeChanged({ startDate: sevenDaysAgo, endDate: today })}
          active={sevenDaysAgo.isSame(startDate!, 'day') && today.isSame(endDate!, 'day')}
        >
            Last 7 days
        </PredefinedDate>
        <PredefinedDate
          onClick={() => onDateRangeChanged({ startDate: startOfMonth, endDate: today })}
          active={startOfMonth.isSame(startDate!, 'day') && today.isSame(endDate!, 'day')}
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
