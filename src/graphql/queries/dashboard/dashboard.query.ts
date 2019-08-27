import gql from 'graphql-tag'
import { cost, LambdaTotals, events } from '.'

export const dashboardQuery = gql`
  query DashboardData ($tenantId: String, $startDate: String, $endDate: String){
    lambdaTotals(tenantId: $tenantId, startDate: $startDate, endDate: $endDate) {
      ...LambdaTotals
    }
    mostExpensiveDynamoTables(tenantId: $tenantId, startDate: $startDate, endDate: $endDate) {
      name
      region
      cost
    }
    mostExpensiveLambdas(tenantId: $tenantId, startDate: $startDate, endDate: $endDate) {
      name
      region
      cost
    }
    costsData(tenantId: $tenantId, startDate: $startDate, endDate: $endDate) {
      ...Cost
    }
    events(tenantId: $tenantId, startDate: $startDate, endDate: $endDate) {
      ...Events
    }
  }
  ${LambdaTotals}
  ${cost}
  ${events}
`
