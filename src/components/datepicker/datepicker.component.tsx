import React, { useState } from 'react'
import { DateRangePicker } from 'react-dates'
import 'react-dates/initialize'
import moment, { Moment } from 'moment'

import 'react-dates/lib/css/_datepicker.css'
import { CalendarIcon, Wrapper } from './datepicker.styles'

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
        minimumNights={0}
      />
    </Wrapper>
  )
}
