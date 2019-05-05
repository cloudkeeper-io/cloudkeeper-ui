/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'

import Spinner from '../components/spinners/spinner.component'
import SquareSpinner from '../components/spinners/square-spinner.component'
import SpringSpinner from '../components/spinners/spring-spinner.component'

storiesOf('Spinners', module)
  .add('Simple Spinners', () => (
    <>
      <Spinner />
      <Spinner strokeWidth={5} />
      <Spinner color="red" />
      <Spinner size={100} />
    </>
  ))
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
