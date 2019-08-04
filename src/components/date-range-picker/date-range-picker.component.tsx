import React from 'react'
import { Datepicker, DatepickerProps } from '../datepicker/datepicker.component'

export const DateRangePicker = ({ id, startDate, endDate, onDateRangeChanged }: DatepickerProps) => (
  <Datepicker
    id={id}
    onDateRangeChanged={onDateRangeChanged}
    startDate={startDate}
    endDate={endDate}
  />
)
