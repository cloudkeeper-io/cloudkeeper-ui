import { ApolloClient } from 'apollo-client'

export interface Session {
  accessToken: string,
  refreshToken: string,
}

export interface User {
  username: string
  loading: boolean
  isUserLoaded: boolean
  session?: Session | null | undefined
  apolloClient: ApolloClient<any> | null
}
