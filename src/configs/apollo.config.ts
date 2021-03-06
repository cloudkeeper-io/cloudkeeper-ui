import { InMemoryCache } from 'apollo-cache-inmemory'
import { CachePersistor } from 'apollo-cache-persist'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import ApolloClient from 'apollo-client'

import { getEnvConfig } from './env.config'

const PERSIST_LAST_PURGE_KEY = 'PERSIST_LAST_PURGE_KEY'
const PERSIST_TTL = 1000 * 60 * 20 // 20 minutes

export const getApolloClient = (getIdToken: () => Promise<string>) => {
  const cache = new InMemoryCache()

  const persistor = new CachePersistor({
    cache,
    storage: window.localStorage as any,
    maxSize: 4.5 * 1024 * 1024,
  })

  const lastPurge = localStorage.getItem(PERSIST_LAST_PURGE_KEY)
  if (!lastPurge || Number(lastPurge) < Date.now() - PERSIST_TTL) {
    localStorage.setItem(PERSIST_LAST_PURGE_KEY, String(Date.now()))
    persistor
      .purge()
      // eslint-disable-next-line no-console
      .catch((err) => console.log(`Cache purge error: ${err}`))
  } else {
    persistor
      .restore()
      // eslint-disable-next-line no-console
      .catch((err) => console.log(`Cache restore error: ${err}`))
  }

  const httpLink = createHttpLink({ uri: getEnvConfig().apolloUri })

  const middlewareLink = setContext(async () => {
    const jwtToken = await getIdToken()
    return { headers: { authorization: `Bearer ${jwtToken}` } }
  })

  const link = middlewareLink.concat(httpLink)

  return new ApolloClient({ cache, link })
}
