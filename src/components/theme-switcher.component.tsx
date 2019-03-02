import React from 'react'
import styled from 'styled-components'

import { ThemeConsumer } from '../contexts'
import Button from './button.component'

const Wrapper = styled.div`
  margin: 0 20px 0 0;
`

export default () => (
  <Wrapper>
    <ThemeConsumer>
      {({ dispatch }) => (
        <Button onClick={() => dispatch({ type: 'toggle' })}>
          Toggle Theme
        </Button>
      )}
    </ThemeConsumer>
  </Wrapper>
)
