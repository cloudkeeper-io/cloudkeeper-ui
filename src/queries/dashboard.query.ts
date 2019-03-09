import gql from 'graphql-tag'

export const dashboardQuery = gql` {
  dashboardData {
    last24Hours {
      totals {
        invocations
        errors
        dataPoints {
          dateTime
          invocations
          errors
        }
      }
    }
  }
}`
