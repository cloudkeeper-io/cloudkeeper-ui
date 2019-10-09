import React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'
import { Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
// @ts-ignore
import Analytics from 'react-router-ga'

import Head from './head'
import RootContainer from './containers/root.container'
import SvgDefs from './styles/svg.defs'
import {
  ThemeProvider,
  TenantProvider,
  AppBarProvider,
  UserProvider,
  UserSettingsProvider,
} from './contexts'
import * as serviceWorker from './serviceWorker'
import './configs/icons.config'
import { getEnvConfig } from './configs'

const history = createBrowserHistory()

ReactDOM.render((
  <Router history={history}>
    <Analytics id={getEnvConfig().gaId}>
      <UserProvider history={history}>
        <ThemeProvider>
          <TenantProvider>
            <UserSettingsProvider>
              <AppBarProvider>
                <>
                  <SvgDefs />
                  <Head />
                  <RootContainer />
                </>
              </AppBarProvider>
            </UserSettingsProvider>
          </TenantProvider>
        </ThemeProvider>
      </UserProvider>
      <ToastContainer />
    </Analytics>
  </Router>
), document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
