import React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import { Router } from 'react-router-dom'

import Head from './head'
import RootContainer from './containers/root.container'
import GlobalStyles from './styles/global.styles'
import SvgDefs from './styles/svg.defs'
import { ThemeProvider, UserProvider, TimerProvider, TenantProvider } from './contexts'
import * as serviceWorker from './serviceWorker'
import './icons.config'

const history = createBrowserHistory()

ReactDOM.render((
  <Router history={history}>
    <UserProvider history={history}>
      {({ client }) => (client ? (
        <ApolloProvider client={client}>
          <ApolloHooksProvider client={client}>
            <ThemeProvider>
              <TimerProvider>
                <TenantProvider>
                  <>
                    <SvgDefs />
                    <Head />
                    <GlobalStyles />
                    <RootContainer />
                  </>
                </TenantProvider>
              </TimerProvider>
            </ThemeProvider>
          </ApolloHooksProvider>
        </ApolloProvider>
      ) : <div />)}
    </UserProvider>
  </Router>
), document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
