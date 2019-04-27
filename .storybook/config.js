import React from 'react'
import { configure, addParameters, addDecorator } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { themes } from '@storybook/theming'
import styled from 'styled-components'

import { ThemeConsumer, ThemeProvider } from '../src/contexts/theme.context'
import GlobalStyles from '../src/styles/global.styles'
import Icon from '../src/components/icon.component'

const Wrapper = styled.div`
  padding: 20px;
`
const ThemeToggleIcon = styled(Icon)`
  position: fixed;
  right: 30px;
  top: 30px;
  cursor: pointer;
  user-select: none;
`

const StyledDecorator = story => (
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

addParameters({
  options: {
    theme: themes.dark,
  },
})

addDecorator(withKnobs)
addDecorator(StyledDecorator)

function loadStories() {
  require('../src/stories')
}

configure(loadStories, module)
