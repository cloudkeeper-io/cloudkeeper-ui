import gql from 'graphql-tag'

export const createTenant = gql`
  mutation createTenant($name: String!, $accessKey: String!, $secretKey: String!, $region: String!) {
    createTenant(name: $name, accessKey: $accessKey, secretKey: $secretKey, region: $region) {
      id
      name
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
