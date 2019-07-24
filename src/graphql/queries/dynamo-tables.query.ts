import gql from 'graphql-tag'

export const dynamoTablesQuery = gql`
  query dynamoTablesList ($tenantId: String!, $startDate: String, $endDate: String)    {
    dynamoTablesList (tenantId: $tenantId, startDate: $startDate, endDate: $endDate) {
      name
      items
      sizeBytes
      region
      billingMode
      avgConsumedRead
      avgConsumedWrite
      avgProvisionedRead
      avgProvisionedWrite
      throttledReads
      throttledWrites
    }
  }
`