import gql from 'graphql-tag'

export const createTenantMutation = gql`
  mutation createTenant($name: String!) {
    createTenant(name: $name) {
      id
      name
      createdAt
      isSetupCompleted
    }
  }
`

export const removeTenant = gql`
  mutation removeTenant($id: String!) {
    deleteTenant(id: $id) {
      id
      name
      isSetupCompleted
    }
  }
`
