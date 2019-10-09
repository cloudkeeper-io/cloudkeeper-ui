const env = process.env.REACT_APP_ENV || 'dev'

const config: any = {
  dev: {
    authUrl: 'https://dev-api.cloudkeeper.io/auth',
    apolloUri: 'https://dev-api.cloudkeeper.io/graphql',
    gtmContainer: 'GTM-MNL9CG8',
    gaId: 'UA-145660905-1',
  },
  prod: {
    authUrl: 'https://api.cloudkeeper.io/auth',
    apolloUri: 'https://api.cloudkeeper.io/graphql',
    gtmContainer: 'GTM-59RXFDW',
    gaId: 'UA-138079976-1',
  },
}


export const getEnvConfig = () => config[env]
