/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import { text } from '@storybook/addon-knobs'
import Button from '../components/button/button.component'

storiesOf('Button', module)
  .add('Simple Button', () => (
    <Button>
      {text('Label', 'Your Text')}
    </Button>
  ))
