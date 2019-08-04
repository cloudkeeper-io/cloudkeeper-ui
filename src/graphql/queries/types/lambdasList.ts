/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: lambdasList
// ====================================================

export interface lambdasList_lambdasList {
  __typename: "LambdasListItem";
  tenantId: string | null;
  name: string | null;
  region: string | null;
  runtime: string | null;
  size: number | null;
  codeSize: number | null;
  timeout: number | null;
  avgExecutionTime: number | null;
  invocations: number | null;
  errors: number | null;
  errorRate: number | null;
  cost: number | null;
}

export interface lambdasList {
  lambdasList: (lambdasList_lambdasList | null)[] | null;
}

export interface lambdasListVariables {
  tenantId: string;
  startDate?: string | null;
  endDate?: string | null;
}
