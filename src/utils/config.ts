const env = process.env.REACT_APP_ENV || 'dev'

const config: any = {
  dev: {
    authUrl: 'https://dev-api.cloudkeeper.io/auth',
    apolloUri: 'https://dev-api.cloudkeeper.io/graphql',
    gtmContainer: 'GTM-MNL9CG8',
  },
  prod: {
    authUrl: 'https://api.cloudkeeper.io/auth',
    apolloUri: 'https://api.cloudkeeper.io/graphql',
    gtmContainer: 'GTM-59RXFDW',
  },
}


export const getConfig = () => config[env]
