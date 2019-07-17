import gql from 'graphql-tag'

export const lambdasListQuery = gql`
  query lambdasList ($tenantId: String!, $startDate: String, $endDate: String)    {
    lambdasList (tenantId: $tenantId, startDate: $startDate, endDate: $endDate) {
      tenantId
      name
      region
      runtime
      size
      codeSize
      timeout
      avgExecutionTime
      invocations
      errors
      errorRate
      cost
    }
  }
`
