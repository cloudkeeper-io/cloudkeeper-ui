import gql from 'graphql-tag'

export const tenantsQuery = gql`
  query Tenants {
    tenants {
      id
      name
      createdAt
      isSetupCompleted
      owner {
        id
      }
      initialProcessing {
        done
      }
    }
  }
`
