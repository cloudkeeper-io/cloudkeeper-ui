import gql from 'graphql-tag'

export const dashboardQuery = gql` {
  dashboardData {
    last24Hours {
      totals {
        totals {
          errors
          invocations
        }
        dataPoints {
          dateTime
          invocations
          errors
        }
      }
    }
  }
}`
