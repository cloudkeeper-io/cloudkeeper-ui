import gql from 'graphql-tag'

export const tenantsQuery = gql`{
  tenants {
    id
    name
    region
    createdAt
    isSetupCompleted
  }
}
`
