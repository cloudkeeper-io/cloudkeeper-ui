/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { storiesOf } from '@storybook/react'

import { Datepicker, DateRange } from '../components/datepicker/datepicker.component'

const Wrapper = styled.div`
  button {
    margin: 5px;
  }
`

const DatepickerDemo = () => {
  const [{ startDate, endDate }, setDateRange] = useState<DateRange>({ startDate: null, endDate: null })

  return (
    <Wrapper>
      <Datepicker
        id="storybook_datepicker"
        startDate={startDate}
        endDate={endDate}
        onDateRangeChanged={(range) => setDateRange(range)}
      />
    </Wrapper>
  )
}

storiesOf('Datepicker', module)
  .add('Simple Datepicker', () => (
    <DatepickerDemo />
  ))
