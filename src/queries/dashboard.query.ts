import gql from 'graphql-tag'

export const dashboardQuery = gql`
  query getReports ($tenantId: String) {
    lambdasData(tenantId: $tenantId) {
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
        mostExpensiveLambdas {
          lambdaName
          cost
          dataPoints {
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
        mostExpensiveLambdas {
          lambdaName
          cost
          dataPoints {
            cost
            dateTime
          }
        }
      }
    }
  }
`
