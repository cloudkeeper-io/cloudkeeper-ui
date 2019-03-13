import gql from 'graphql-tag'

export const tenantsQuery = gql`{
  tenants {
    tenantId
    name
    isSetupCompleted
  }
}
`
