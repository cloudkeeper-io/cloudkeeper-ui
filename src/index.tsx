import React from 'react'
import { hydrate, render } from 'react-dom'
import { createBrowserHistory } from 'history'
import { Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Analytics from 'react-router-ga'
import * as Sentry from '@sentry/browser'

import Head from './head'
import RootContainer from './containers/root.container'
import ErrorContainer from './containers/error.container'
import SvgDefs from './styles/svg.defs'
import { ThemeProvider, TenantProvider, AppBarProvider, UserProvider, UserSettingsProvider } from './contexts'
import * as serviceWorker from './serviceWorker'
import { getEnvConfig } from './configs'
import './configs/icons.config'

const config = getEnvConfig()
const history = createBrowserHistory()

if (process.env.NODE_ENV === 'production') {
  Sentry.init({ dsn: config.sentry })
}

class App extends React.PureComponent {
  // eslint-disable-next-line react/state-in-constructor
  public state = {
    isError: false,
  }

  public componentDidCatch() {
    this.setState({ isError: true })
  }

  public render() {
    const { isError } = this.state

    if (isError) {
      return (
        <ThemeProvider>
          <TenantProvider>
            <ErrorContainer />
          </TenantProvider>
        </ThemeProvider>
      )
    }

    return (
      <Router history={history}>
        <Analytics id={config.gaId}>
          <UserProvider history={history}>
            <ThemeProvider>
              <TenantProvider>
                <UserSettingsProvider>
                  <AppBarProvider>
                    <>
                      <ToastContainer />
                      <SvgDefs />
                      <Head />
                      <RootContainer />
                    </>
                  </AppBarProvider>
                </UserSettingsProvider>
              </TenantProvider>
            </ThemeProvider>
          </UserProvider>
        </Analytics>
      </Router>
    )
  }
}

const rootElement = document.getElementById('root')

if (rootElement!.hasChildNodes()) {
  hydrate(<App />, rootElement)
} else {
  render(<App />, rootElement)
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
