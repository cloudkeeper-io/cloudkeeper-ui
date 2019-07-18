/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'

import SquareSpinner from '../components/spinners/square-spinner.component'
import SpringSpinner from '../components/spinners/spring-spinner.component'

storiesOf('Spinners', module)
  .add('Square Spinners', () => (
    <>
      <SquareSpinner />
    </>
  ))
  .add('React-Spring Spinners', () => (
    <>
      <SpringSpinner />
    </>
  ))
