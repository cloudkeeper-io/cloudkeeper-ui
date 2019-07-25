import React, { useState } from 'react'
import { DateRangePicker } from 'react-dates'
import 'react-dates/initialize'
import moment, { Moment } from 'moment'
import 'react-dates/lib/css/_datepicker.css'
import { Wrapper } from './datepicker.styles'

export interface DatepickerState {
    startDate: Moment | null
    endDate: Moment | null
}

moment.updateLocale('en', { weekdaysMin: 'U_M_T_W_R_F_S'.split('_') })

export const Datepicker = () => {
  const [range, setDateRange] = useState<DatepickerState>({ startDate: null, endDate: null })
  const [focusedInput, setFocusedInput] = useState<'startDate'| 'endDate' | null>(null)

  return (
    <Wrapper>
      <DateRangePicker
        hideKeyboardShortcutsPanel
        startDate={range.startDate}
        startDateId="your_unique_start_date_id"
        endDate={range.endDate}
        endDateId="your_unique_end_date_id"
        weekDayFormat="dd"
        onDatesChange={({ startDate, endDate }) => setDateRange({ startDate, endDate })}
        focusedInput={focusedInput}
        onFocusChange={newFocusedInput => setFocusedInput(newFocusedInput)}
        customArrowIcon={<span>&mdash;</span>}
      />
    </Wrapper>
  )
}
