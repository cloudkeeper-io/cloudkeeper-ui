/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import styled from 'styled-components/macro'
import { storiesOf } from '@storybook/react'

import Input from '../components/form/input.component'
import IconInput from '../components/form/icon-input.component'

const Wrapper = styled.div`
  width: 300px;
`

storiesOf('Input', module)
  .add('Simple Inputs', () => (
    <Wrapper>
      <Input defaultValue="Value" />
      <Input placeholder="Placeholder" />
    </Wrapper>
  ))
  .add('Icons Inputs', () => (
    <Wrapper>
      <IconInput icon="mail" placeholder="Email" />
      <IconInput icon="lock" placeholder="Password" />
    </Wrapper>
  ))
