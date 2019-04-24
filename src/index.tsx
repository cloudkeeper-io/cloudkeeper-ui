import React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'
import { Router } from 'react-router-dom'

import Head from './head'
import RootContainer from './containers/root.container'
import GlobalStyles from './styles/global.styles'
import SvgDefs from './styles/svg.defs'
import { ThemeProvider, TimerProvider, TenantProvider, FirebaseProvider, UserSettingsProvider } from './contexts'
import * as serviceWorker from './serviceWorker'
import './configs/icons.config'

const history = createBrowserHistory()

ReactDOM.render((
  <Router history={history}>
    <FirebaseProvider>
      <ThemeProvider>
        <TimerProvider>
          <TenantProvider>
            <UserSettingsProvider>
              <>
                <SvgDefs />
                <Head />
                <GlobalStyles />
                <RootContainer />
              </>
            </UserSettingsProvider>
          </TenantProvider>
        </TimerProvider>
      </ThemeProvider>
    </FirebaseProvider>
  </Router>
), document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
