/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import styled from 'styled-components/macro'
import { storiesOf } from '@storybook/react'

import { Datepicker } from '../components/datepicker/datepicker.component'

const Wrapper = styled.div`
  button {
    margin: 5px;
  }
`

storiesOf('Datepicker', module)
  .add('Simple Datepicker', () => (
    <Wrapper>
      <Datepicker />
    </Wrapper>
  ))
