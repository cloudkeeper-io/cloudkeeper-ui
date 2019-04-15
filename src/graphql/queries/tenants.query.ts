import gql from 'graphql-tag'

export const tenantsQuery = gql`{
  tenants {
    id
    name
    createdAt
    isSetupCompleted
  }
}
`
