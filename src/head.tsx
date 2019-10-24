import React, { memo } from 'react'
import { Helmet } from 'react-helmet'
import { withTheme } from 'styled-components'
import { concat } from 'lodash-es'

import { getEnvConfig } from './configs'

const MetaTags = [
  {
    name: 'description',
    content: 'In-depth monitoring for Serverless AWS applications',
  },
  {
    property: 'og:title',
    content: 'Cloud Keeper',
  },
  {
    property: 'og:description',
    content: 'In-depth monitoring for Serverless AWS applications',
  },
  {
    property: 'og:type',
    content: 'website',
  },
  {
    property: 'og:locale',
    content: 'en',
  },
  {
    name: 'twitter:card',
    content: 'summary',
  },
  {
    name: 'twitter:title',
    content: 'Cloud Keeper',
  },
  {
    name: 'twitter:description',
    content: 'In-depth monitoring for Serverless AWS applications',
  },
  {
    name: 'og:image:width',
    content: '512',
  },
  {
    name: 'og:image:height',
    content: '512',
  },
  {
    name: 'og:image',
    content: '/logo.png',
  },
  {
    name: 'keywords',
    content: 'Serverless, AWS Serverless, AWS Serverless Monitoring',
  },
]

interface HeadProps {
  theme: any
}

export default memo(withTheme(({ theme }: HeadProps) => {
  const meta = concat(MetaTags, { name: 'theme-color', content: theme.colors.background })
  return (
    <Helmet meta={meta} title="Cloud Keeper">
      <script>{
        `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${getEnvConfig().gtmContainer}');`
      }
      </script>
    </Helmet>
  )
}))
