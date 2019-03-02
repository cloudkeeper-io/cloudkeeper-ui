import React from 'react'
import ReactDOM from 'react-dom'
import createHistory from 'history/createBrowserHistory'

import RootContainer from './containers/root.container'
import GlobalStyles from './styles/global.styles'
import { ThemeProvider, UserProvider } from './contexts'
import { BACK_URL_KEY } from './constants'
import * as serviceWorker from './serviceWorker'

const history = createHistory()
history.listen(() => {
  const { pathname } = window.location
  const restrictedRedirects = ['/', '/login']
  if (!restrictedRedirects.includes(pathname)) {
    localStorage.setItem(BACK_URL_KEY, pathname)
  }
})

ReactDOM.render((
  <UserProvider history={history}>
    {({ user }) => (
      <ThemeProvider>
        <>
          <GlobalStyles />
          <RootContainer user={user} history={history} />
        </>
      </ThemeProvider>

    )}
  </UserProvider>

), document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
