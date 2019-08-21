/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Events
// ====================================================

export interface Events_events {
  __typename: "Event";
  dateTime: string | null;
  dimension: string | null;
  message: string | null;
  serviceName: string | null;
  value: number | null;
  expectedValue: number | null;
}

export interface Events {
  __typename: "DashboardEventsData";
  events: (Events_events | null)[] | null;
  processing: boolean | null;
}
