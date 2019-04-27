/* eslint-disable */
import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import styled from 'styled-components/macro'

import { ThemeConsumer, ThemeProvider } from '../contexts/theme.context'
import GlobalStyles from '../styles/global.styles'
import Button from '../components/button/button.component'
import Icon from '../components/icon.component'
import '../configs/icons.config'

const Wrapper = styled.div`
  padding: 20px;
`
const ThemeToggleIcon = styled(Icon)`
  position: fixed;
  right: 30px;
  top: 30px;
  cursor: pointer;
`

const StyledDecorator = (story: any) => (
  <ThemeProvider>
    <ThemeConsumer>
      {({ toggleTheme }) => (
        <Wrapper>
          <ThemeToggleIcon icon="lightbulb" size="1x" onClick={toggleTheme} />
          <GlobalStyles />
          {story()}
        </Wrapper>
      )}
    </ThemeConsumer>
  </ThemeProvider>
)

storiesOf('Button', module)
  .addDecorator(StyledDecorator)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        rere RERER rerere
      </span>
    </Button>
  ))
