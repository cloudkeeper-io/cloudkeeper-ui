import React, { memo } from 'react'
import { Helmet } from 'react-helmet'
import { withTheme } from 'styled-components'

import { getConfig } from './utils'

interface HeadProps {
  theme: any
}

export default memo(withTheme(({ theme }: HeadProps) => {
  console.log(getConfig())
  return (
    <Helmet>
      <title>Cloud Keeper</title>
      <meta name="theme-color" content={theme.colors.background} data-react-helmet="true"/>
      <link rel="shortcut icon" href={theme.favicon}/>
      <script>{
        `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${getConfig().gtmContainer}');`
      }
      </script>
    </Helmet>
  );
}))
