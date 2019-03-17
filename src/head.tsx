import React, { memo } from 'react'
import { Helmet } from 'react-helmet'
import { withTheme } from 'styled-components'

interface HeadProps {
  theme: any
}

export default memo(withTheme(({ theme }: HeadProps) => (
  <Helmet>
    <title>Cloud Keeper</title>
    <meta name="theme-color" content={theme.colors.background} data-react-helmet="true" />
    <link rel="shortcut icon" href={theme.favicon} />
  </Helmet>
)))
