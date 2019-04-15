import gql from 'graphql-tag'

export const awsRegionsQuery = gql`
  query AwsRegions {
    awsRegions
  }
`
