const env = process.env.REACT_APP_ENV || 'dev'

const config: any = {
  dev: {
    authUrl: 'https://dev-api.cloudkeeper.io/auth',
    apolloUri: 'https://dev-api.cloudkeeper.io/graphql',
    gtmContainer: 'GTM-MNL9CG8',
    gaId: 'UA-145660905-1',
    sentry: 'https://93261ef6dc7b48c7b32cd9bd55480f03@sentry.io/1780862',
  },
  prod: {
    authUrl: 'https://api.cloudkeeper.io/auth',
    apolloUri: 'https://api.cloudkeeper.io/graphql',
    gtmContainer: 'GTM-59RXFDW',
    gaId: 'UA-138079976-1',
    sentry: 'https://1cdd2afe8bd44f98b7e20ed24d7cc8fb@sentry.io/1780875',
  },
}


export const getEnvConfig = () => config[env]
