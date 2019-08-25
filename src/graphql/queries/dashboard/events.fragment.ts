import gql from 'graphql-tag'

export const events = gql`
  fragment Events on Event {
    dateTime
    dimension
    message
    serviceName
    value
    expectedValue
  }
`
