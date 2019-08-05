import gql from 'graphql-tag'

export const lambdas = gql`
  fragment Lambdas on DashboardLambdasData {
    processing
    last24Hours {
      totals {
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
    }
    last30Days {
      totals {
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
    }
  }
`
