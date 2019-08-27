import gql from 'graphql-tag'

export const LambdaTotals = gql`
  fragment LambdaTotals on LambdaTotals {
    errors
    invocations
    cost
    dataPoints {
      errors
      invocations
      cost
      dateTime
    }
  }
`
