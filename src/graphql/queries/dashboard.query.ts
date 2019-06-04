import gql from 'graphql-tag'

export const dashboardQuery = gql`
  query DashboardData ($tenantId: String){
    lambdasData(tenantId: $tenantId) {
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
    dynamoData(tenantId: $tenantId) {
      processing
      last24Hours {
        mostReadTables {
          name
          averageConsumedRead
          consumedRead
          provisionedRead
          billingMode
          sizeBytes
          items
          dataPoints {
            consumedRead
            provisionedRead
            dateTime
          }
        }
        mostWritesTables {
          name
          averageConsumedWrite
          consumedWrite
          provisionedWrite
          billingMode
          sizeBytes
          items
          dataPoints {
            consumedWrite
            provisionedWrite
            dateTime
          }
        }
        mostThrottledTables {
          name
          billingMode
          sizeBytes
          items
          throttledRequests
          throttledWrites
          throttledReads
          dataPoints {
            throttledRequests
            throttledWrites
            throttledReads
            dateTime
          }
        }
        mostExpensiveTables {
          name
          billingMode
          sizeBytes
          items
          totalPrice
          readPrice
          writePrice
          storagePrice
          dataPoints {
            totalPrice
            readPrice
            writePrice
            storagePrice
            dateTime
          }
        }
      }
      last30Days {
        mostReadTables {
          name
          averageConsumedRead
          billingMode
          sizeBytes
          items
          consumedRead
          provisionedRead
          dataPoints {
            consumedRead
            provisionedRead
            dateTime
          }
        }
        mostWritesTables {
          name
          averageConsumedWrite
          billingMode
          sizeBytes
          items
          consumedWrite
          provisionedWrite
          dataPoints {
            consumedWrite
            provisionedWrite
            dateTime
          }
        }
        mostThrottledTables {
          name
          billingMode
          sizeBytes
          items
          throttledRequests
          throttledWrites
          throttledReads
          dataPoints {
            throttledRequests
            throttledWrites
            throttledReads
            dateTime
          }
        }
        mostExpensiveTables {
          name
          billingMode
          totalPrice
          readPrice
          writePrice
          storagePrice
          dataPoints {
            totalPrice
            readPrice
            writePrice
            storagePrice
            dateTime
          }
        }
      }
    }
  }
`
