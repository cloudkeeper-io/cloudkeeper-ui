import getConfig from 'next/config'
import Document, { Head, Main, NextScript } from 'next/document'
import * as React from 'react'
import { ServerStyleSheet } from 'styled-components'

const prefix = getConfig().publicRuntimeConfig.basePath

interface LayoutProps {
    styleTags: string;
}

export default class Layout extends Document<LayoutProps> {
  public static getInitialProps({ renderPage }: any) {
    const sheet = new ServerStyleSheet()
    const page = renderPage((App: any) => (props: any) => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }

  public render() {
    return (
      <html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1.0, user-scalable=0"
          />
          <link rel="icon" type="image/x-icon" href={`${prefix}/static/favicon.png`} />
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i"
            rel="stylesheet"
          />
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
