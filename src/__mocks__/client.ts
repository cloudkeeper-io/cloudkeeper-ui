import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { SchemaLink } from 'apollo-link-schema'
import { makeExecutableSchema } from 'graphql-tools'
import { loader } from 'graphql.macro'

import resolvers from './resolvers'

const cache = new InMemoryCache()
const schema = loader('../../schema.graphql')

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers: resolvers as any,
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
})

export const mockClient = new ApolloClient({
  link: new SchemaLink({ schema: executableSchema }),
  cache,
})
