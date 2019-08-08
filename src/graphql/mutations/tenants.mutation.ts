import gql from 'graphql-tag'

export const createTenantMutation = gql`
  mutation CreateTenant($name: String!) {
    createTenant(name: $name) {
      id
      name
      createdAt
      owner {
        id
      }
      isSetupCompleted
    }
  }
`

export const setupTenantMutation = gql`
  mutation SetupTenant($tenantId: String!, $roleArn: String!){
    setupTenant(tenantId: $tenantId, roleArn: $roleArn) {
      functions
      status
    }
  }
`

export const removeTenant = gql`
  mutation RemoveTenant($id: String!) {
    deleteTenant(id: $id) {
      id
      name
      isSetupCompleted
    }
  }
`
