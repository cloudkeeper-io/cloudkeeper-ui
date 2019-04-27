/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import { text } from '@storybook/addon-knobs'
import figmaDecorator from 'storybook-addon-figma'

import Button from '../components/button/button.component'
import '../configs/icons.config'


storiesOf('Button', module)
  .addDecorator(figmaDecorator({
    url: 'https://www.figma.com/file/fpTdyGvQZd9sIGUFa22WGRzr/cloudkeeper?node-id=451%3A0',
  }))
  .add('Simple Button', () => (
    <Button>
      <span role="img" aria-label="so cool">
        {text('Label', 'Your Text')}
      </span>
    </Button>
  ))
