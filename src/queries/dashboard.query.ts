import gql from 'graphql-tag'

export const dashboardQuery = gql`
  query getReports ($tenantId: String) {
    dashboardData (tenantId: $tenantId)  {
      last24Hours {
        totals {
           errors
           invocations
           dataPoints {
            errors
            invocations
            dateTime
          }
        }
        slowestLambdas {
          lambdaName
          averageDuration
          dataPoints {
            averageDuration
            maxDuration
            dateTime
          }
        }
        mostInvokedLambdas {
          lambdaName
          invocations
          dataPoints {
            invocations
            dateTime
          }
        }
        mostErrorsLambdas {
          lambdaName
          errors
          dataPoints {
            errors
            dateTime
          }
        }
      }
    }
  }
`
