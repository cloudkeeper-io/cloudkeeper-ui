import React from 'react'
import ReactDOM from 'react-dom'

import RootContainer from './containers/root.container'
import GlobalStyles from './styles/global.styles'
import { ThemeProvider } from './contexts'
import * as serviceWorker from './serviceWorker'

ReactDOM.render((
  <ThemeProvider>
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
