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
          runtime
          size
          codeSize
          timeout
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
          runtime
          size
          codeSize
          timeout
            
          dataPoints {
            invocations
            dateTime
          }
        }
        mostErrorsLambdas {
          lambdaName
          errors
          runtime
          size
          codeSize
          timeout
          dataPoints {
            errors
            dateTime
          }
        }
        mostExpensiveLambdas {
          lambdaName
          runtime
          size
          codeSize
          timeout
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
          runtime
          size
          codeSize
          timeout
          averageDuration
          dataPoints {
            averageDuration
            maxDuration
            dateTime
          }
        }
        mostInvokedLambdas {
          lambdaName
          runtime
          size
          timeout
          codeSize
          invocations
          dataPoints {
            invocations
            dateTime
          }
        }
        mostErrorsLambdas {
          lambdaName
          runtime
          size
          timeout
          codeSize
          errors
          dataPoints {
            errors
            dateTime
          }
        }
        mostExpensiveLambdas {
          lambdaName
          runtime
          size
          timeout
          codeSize
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
