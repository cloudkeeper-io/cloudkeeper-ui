import React, { useState } from 'react'
import { DateRangePicker } from 'react-dates'
import 'react-dates/initialize'
import moment, { Moment } from 'moment'
import { useMediaQuery } from '@material-ui/core'

import { CalendarIcon, Wrapper } from './datepicker.styles'
import { mobileMediaQuery } from '../../utils'

export interface DateRange {
    startDate: Moment | null,
    endDate: Moment | null,
}

export interface DatepickerProps {
    onDateRangeChanged: (range: DateRange) => void,
    startDate: Moment | null,
    endDate: Moment | null,
    id: string,
}

moment.updateLocale('en', { weekdaysMin: 'U_M_T_W_R_F_S'.split('_') })

export const Datepicker = ({ onDateRangeChanged, startDate, endDate, id }: DatepickerProps) => {
  const isMobile = useMediaQuery(`(${mobileMediaQuery})`)

  const [focusedInput, setFocusedInput] = useState<'startDate'| 'endDate' | null>(null)

  return (
    <Wrapper>
      <DateRangePicker
        hideKeyboardShortcutsPanel
        startDate={startDate}
        startDateId={`${id}_start_date`}
        endDate={endDate}
        endDateId={`${id}_end_date`}
        weekDayFormat="dd"
        customInputIcon={<CalendarIcon />}
        onDatesChange={range => onDateRangeChanged(range)}
        initialVisibleMonth={() => moment().subtract(1, 'M')}
        focusedInput={focusedInput}
        onFocusChange={newFocusedInput => setFocusedInput(newFocusedInput)}
        isOutsideRange={date => date.isAfter(moment(), 'day')}
        customArrowIcon={<span>&mdash;</span>}
        displayFormat="D MMM YYYY"
        minimumNights={0}
        numberOfMonths={isMobile ? 1 : 2}
      />
    </Wrapper>
  )
}
