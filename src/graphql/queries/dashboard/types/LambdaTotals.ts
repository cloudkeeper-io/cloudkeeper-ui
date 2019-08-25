/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: LambdaTotals
// ====================================================

export interface LambdaTotals_dataPoints {
  __typename: "TotalsDataPoint";
  errors: number;
  invocations: number;
  cost: number;
  dateTime: string;
}

export interface LambdaTotals {
  __typename: "LambdaTotals";
  errors: number;
  invocations: number;
  cost: number;
  dataPoints: LambdaTotals_dataPoints[];
}
