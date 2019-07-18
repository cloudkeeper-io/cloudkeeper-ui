import React from 'react'
import { configure, addParameters, addDecorator } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { themes } from '@storybook/theming'
import styled from 'styled-components'

import { ThemeProvider } from '../src/contexts/theme.context'
import GlobalStyles from '../src/styles/global.styles'
import SVGDefs from '../src/styles/svg.defs'
import ThemeSwitcher from '../src/components/theme-switcher.component'

const Wrapper = styled.div`
  padding: 30px 20px 20px 20px;
`
const StyledThemeSwitcher = styled(ThemeSwitcher)`
  position: fixed;
  right: 30px;
  top: 10px;
  cursor: pointer;
  user-select: none;
`

const StyledDecorator = story => (
  <ThemeProvider>
    <Wrapper>
      <StyledThemeSwitcher />
      <GlobalStyles />
      <SVGDefs />
      {story()}
    </Wrapper>
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
