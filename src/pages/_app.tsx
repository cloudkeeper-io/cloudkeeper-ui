import App, { Container } from 'next/app'
import * as React from 'react'
import { ThemeProvider } from 'styled-components'
import Head from 'next-server/head'

import themes from '../styles/themes'
import GlobalStyles from '../styles/global.styles'

interface AppProps {
  Component: any;
  router: any;
  ctx: any;
}

export default class MyApp extends App<AppProps> {
  public static async getInitialProps({ Component, ctx }: AppProps) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  public render() {
    const { Component, pageProps } = this.props
    return (
      <>
        <Head>
          <title>CloudKeeper</title>
        </Head>
        <ThemeProvider theme={themes.dark}>
          <Container>
            <GlobalStyles />
            <Component {...pageProps} />
          </Container>
        </ThemeProvider>
      </>
    )
  }
}
