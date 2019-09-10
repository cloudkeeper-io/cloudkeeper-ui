/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DashboardData
// ====================================================

export interface DashboardData_lambdaTotals_dataPoints {
  __typename: "TotalsDataPoint";
  errors: number;
  invocations: number;
  cost: number;
  dateTime: string;
}

export interface DashboardData_lambdaTotals {
  __typename: "LambdaTotals";
  errors: number;
  invocations: number;
  cost: number;
  dataPoints: DashboardData_lambdaTotals_dataPoints[];
}

export interface DashboardData_mostExpensiveDynamoTables {
  __typename: "MostExpensiveDynamoTable";
  name: string;
  region: string;
  cost: number;
}

export interface DashboardData_mostExpensiveLambdas {
  __typename: "MostExpensiveLambdasListItem";
  name: string;
  region: string;
  cost: number;
}

export interface DashboardData_costsData_costsPerService_serviceCosts {
  __typename: "ServiceCostItem";
  date: string | null;
  serviceName: string | null;
  unblendedCost: number | null;
}

export interface DashboardData_costsData_costsPerService {
  __typename: "CostsPerServiceDataPoint";
  date: string | null;
  total: number | null;
  serviceCosts: DashboardData_costsData_costsPerService_serviceCosts[];
}

export interface DashboardData_costsData_costsPerStack_stackCosts {
  __typename: "StackCostItem";
  date: string | null;
  stackName: string | null;
  unblendedCost: number | null;
}

export interface DashboardData_costsData_costsPerStack {
  __typename: "CostsPerStackDataPoint";
  date: string | null;
  total: number | null;
  stackCosts: DashboardData_costsData_costsPerStack_stackCosts[];
}

export interface DashboardData_costsData {
  __typename: "CostsData";
  costsPerService: DashboardData_costsData_costsPerService[] | null;
  costsPerStack: DashboardData_costsData_costsPerStack[] | null;
}

export interface DashboardData_events {
  __typename: "Event";
  dateTime: string;
  dimension: string | null;
  message: string;
  serviceName: string;
  value: number | null;
  expectedValue: number | null;
}

export interface DashboardData {
  lambdaTotals: DashboardData_lambdaTotals;
  mostExpensiveDynamoTables: DashboardData_mostExpensiveDynamoTables[];
  mostExpensiveLambdas: DashboardData_mostExpensiveLambdas[];
  costsData: DashboardData_costsData;
  events: DashboardData_events[];
}

export interface DashboardDataVariables {
  tenantId?: string | null;
  startDate?: string | null;
  endDate?: string | null;
}
