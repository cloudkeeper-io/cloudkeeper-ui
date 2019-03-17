import React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'
import { ApolloProvider } from 'react-apollo'

import RootContainer from './containers/root.container'
import GlobalStyles from './styles/global.styles'
import { ThemeProvider, UserProvider } from './contexts'
import * as serviceWorker from './serviceWorker'
import './icons.config'

const history = createBrowserHistory()

ReactDOM.render((
  <UserProvider history={history}>
    {({ user, client }) => (
      <ApolloProvider client={client}>
        <ThemeProvider>
          <>
            <GlobalStyles />
            <RootContainer user={user} history={history} />
          </>
        </ThemeProvider>
      </ApolloProvider>
    )}
  </UserProvider>
), document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
