import gql from 'graphql-tag'

export const cost = gql`
  fragment Cost on CostsData {
    costsPerService {
      date
      total
      serviceCosts {
        date
        serviceName
        unblendedCost
      }
    }
    costsPerStack {
      date
      total
      stackCosts {
        date
        stackName
        unblendedCost
      }
    }
  }

`
