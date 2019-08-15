import gql from 'graphql-tag'
import { cost, lambdas, dynamo, events } from '.'

export const dashboardQuery = gql`
  query DashboardData ($tenantId: String){
    lambdasData(tenantId: $tenantId) {
      ...Lambdas
    }
    dynamoData(tenantId: $tenantId) {
      ...Dynamo
    }
    costsData(tenantId: $tenantId) {
      ...Cost
    }
    events(tenantId: $tenantId) {
      ...Events
    }
  }
  ${lambdas}
  ${dynamo}
  ${cost}
  ${events}
`
