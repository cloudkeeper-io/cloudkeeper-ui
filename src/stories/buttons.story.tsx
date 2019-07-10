/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import styled from 'styled-components/macro'
import { storiesOf } from '@storybook/react'
import { text, boolean } from '@storybook/addon-knobs'

import Button from '../components/button/button.component'

const Wrapper = styled.div`
  button {
    margin: 5px;
  }
`

storiesOf('Button', module)
  .add('Simple Button', () => (
    <Wrapper>
      <Button>
        {text('Label', 'Your Text')}
      </Button>
      <Button disabled={boolean('Disabled', true)}>
        Disabled
      </Button>
    </Wrapper>
  ))
