/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Lambdas
// ====================================================

export interface Lambdas_last24Hours_totals_dataPoints {
  __typename: "TotalsDataPoint";
  errors: number | null;
  invocations: number | null;
  cost: number | null;
  dateTime: string | null;
}

export interface Lambdas_last24Hours_totals {
  __typename: "Totals";
  errors: number | null;
  invocations: number | null;
  cost: number | null;
  dataPoints: (Lambdas_last24Hours_totals_dataPoints | null)[] | null;
}

export interface Lambdas_last24Hours {
  __typename: "DashboardLambdaDataForPeriod";
  totals: Lambdas_last24Hours_totals | null;
}

export interface Lambdas_last30Days_totals_dataPoints {
  __typename: "TotalsDataPoint";
  errors: number | null;
  invocations: number | null;
  cost: number | null;
  dateTime: string | null;
}

export interface Lambdas_last30Days_totals {
  __typename: "Totals";
  errors: number | null;
  invocations: number | null;
  cost: number | null;
  dataPoints: (Lambdas_last30Days_totals_dataPoints | null)[] | null;
}

export interface Lambdas_last30Days {
  __typename: "DashboardLambdaDataForPeriod";
  totals: Lambdas_last30Days_totals | null;
}

export interface Lambdas {
  __typename: "DashboardLambdasData";
  processing: boolean | null;
  last24Hours: Lambdas_last24Hours | null;
  last30Days: Lambdas_last30Days | null;
}
