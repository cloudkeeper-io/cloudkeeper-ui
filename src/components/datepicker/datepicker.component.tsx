import React, { useState } from 'react'
import { DateRangePicker } from 'react-dates'
import 'react-dates/initialize'
import moment, { Moment } from 'moment'
import 'react-dates/lib/css/_datepicker.css'
import { Wrapper } from './datepicker.styles'

export interface DateRange {
    startDate: Moment | null,
    endDate: Moment | null,
}

export interface DatepickerProps {
    onRangeChanged: (range: DateRange) => void
    dateRange: DateRange
    id: string
}

moment.updateLocale('en', { weekdaysMin: 'U_M_T_W_R_F_S'.split('_') })

export const Datepicker = ({ onRangeChanged, dateRange, id }: DatepickerProps) => {
  const [focusedInput, setFocusedInput] = useState<'startDate'| 'endDate' | null>(null)

  return (
    <Wrapper>
      <DateRangePicker
        hideKeyboardShortcutsPanel
        startDate={dateRange.startDate}
        startDateId={`${id}_start_date`}
        endDate={dateRange.endDate}
        endDateId={`${id}_end_date`}
        weekDayFormat="dd"
        onDatesChange={onRangeChanged}
        initialVisibleMonth={() => moment().subtract(1, 'M')}
        focusedInput={focusedInput}
        onFocusChange={newFocusedInput => setFocusedInput(newFocusedInput)}
        isOutsideRange={date => date.isAfter(moment(), 'day')}
        customArrowIcon={<span>&mdash;</span>}
      />
    </Wrapper>
  )
}
