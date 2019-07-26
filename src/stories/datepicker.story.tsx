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
  const [dateRange, setDateRange] = useState<DateRange>({ startDate: null, endDate: null })

  return (
    <Wrapper>
      <Datepicker
        id="storybook_datepicker"
        dateRange={dateRange}
        onRangeChanged={range => setDateRange(range)}
      />
    </Wrapper>
  )
}

storiesOf('Datepicker', module)
  .add('Simple Datepicker', () => (
    <DatepickerDemo />
  ))
