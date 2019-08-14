import gql from 'graphql-tag'

export const events = gql`
  fragment Events on DashboardEventsData {
    events {
      dateTime
      dimension
      message
      serviceName
      value
    }
    processing
  }
`
