import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components/macro'

import RootContainer from './containers/root.container'
import themes from './styles/themes'
import GlobalStyles from './styles/global.styles'
import * as serviceWorker from './serviceWorker'

ReactDOM.render((
  <ThemeProvider theme={themes.dark}>
    <>
      <GlobalStyles />
      <RootContainer />
    </>
  </ThemeProvider>
), document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
