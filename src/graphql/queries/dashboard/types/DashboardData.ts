/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DashboardData
// ====================================================

export interface DashboardData_lambdasData_last24Hours_totals_dataPoints {
  __typename: "TotalsDataPoint";
  errors: number | null;
  invocations: number | null;
  cost: number | null;
  dateTime: string | null;
}

export interface DashboardData_lambdasData_last24Hours_totals {
  __typename: "Totals";
  errors: number | null;
  invocations: number | null;
  cost: number | null;
  dataPoints: (DashboardData_lambdasData_last24Hours_totals_dataPoints | null)[] | null;
}

export interface DashboardData_lambdasData_last24Hours {
  __typename: "DashboardLambdaDataForPeriod";
  totals: DashboardData_lambdasData_last24Hours_totals | null;
}

export interface DashboardData_lambdasData_last30Days_totals_dataPoints {
  __typename: "TotalsDataPoint";
  errors: number | null;
  invocations: number | null;
  cost: number | null;
  dateTime: string | null;
}

export interface DashboardData_lambdasData_last30Days_totals {
  __typename: "Totals";
  errors: number | null;
  invocations: number | null;
  cost: number | null;
  dataPoints: (DashboardData_lambdasData_last30Days_totals_dataPoints | null)[] | null;
}

export interface DashboardData_lambdasData_last30Days {
  __typename: "DashboardLambdaDataForPeriod";
  totals: DashboardData_lambdasData_last30Days_totals | null;
}

export interface DashboardData_lambdasData {
  __typename: "DashboardLambdasData";
  processing: boolean | null;
  last24Hours: DashboardData_lambdasData_last24Hours | null;
  last30Days: DashboardData_lambdasData_last30Days | null;
}

export interface DashboardData_dynamoData_last24Hours_mostReadTables_dataPoints {
  __typename: "MostReadTableDataPoint";
  consumedRead: number | null;
  provisionedRead: number | null;
  dateTime: string | null;
}

export interface DashboardData_dynamoData_last24Hours_mostReadTables {
  __typename: "MostReadTableData";
  name: string;
  averageConsumedRead: number;
  consumedRead: number;
  provisionedRead: number;
  billingMode: string;
  sizeBytes: number;
  items: number;
  dataPoints: DashboardData_dynamoData_last24Hours_mostReadTables_dataPoints[] | null;
}

export interface DashboardData_dynamoData_last24Hours_mostWritesTables_dataPoints {
  __typename: "MostWritesTableDataPoint";
  consumedWrite: number | null;
  provisionedWrite: number | null;
  dateTime: string | null;
}

export interface DashboardData_dynamoData_last24Hours_mostWritesTables {
  __typename: "MostWritesTableData";
  name: string | null;
  averageConsumedWrite: number | null;
  consumedWrite: number | null;
  provisionedWrite: number | null;
  billingMode: string | null;
  sizeBytes: number | null;
  items: number | null;
  dataPoints: DashboardData_dynamoData_last24Hours_mostWritesTables_dataPoints[] | null;
}

export interface DashboardData_dynamoData_last24Hours_mostThrottledTables_dataPoints {
  __typename: "MostThrottledTableDataPoint";
  throttledRequests: number | null;
  throttledWrites: number | null;
  throttledReads: number | null;
  dateTime: string | null;
}

export interface DashboardData_dynamoData_last24Hours_mostThrottledTables {
  __typename: "MostThrottledTableData";
  name: string | null;
  billingMode: string | null;
  sizeBytes: number | null;
  items: number | null;
  throttledRequests: number | null;
  throttledWrites: number | null;
  throttledReads: number | null;
  dataPoints: DashboardData_dynamoData_last24Hours_mostThrottledTables_dataPoints[] | null;
}

export interface DashboardData_dynamoData_last24Hours_mostExpensiveTables_dataPoints {
  __typename: "MostExpensiveTableDataPoint";
  totalPrice: number | null;
  readPrice: number | null;
  writePrice: number | null;
  storagePrice: number | null;
  dateTime: string | null;
}

export interface DashboardData_dynamoData_last24Hours_mostExpensiveTables {
  __typename: "MostExpensiveTableData";
  name: string;
  billingMode: string;
  sizeBytes: number;
  items: number;
  totalPrice: number;
  readPrice: number;
  writePrice: number;
  storagePrice: number;
  dataPoints: DashboardData_dynamoData_last24Hours_mostExpensiveTables_dataPoints[] | null;
}

export interface DashboardData_dynamoData_last24Hours {
  __typename: "DashboardDynamoDataForPeriod";
  mostReadTables: DashboardData_dynamoData_last24Hours_mostReadTables[];
  mostWritesTables: DashboardData_dynamoData_last24Hours_mostWritesTables[];
  mostThrottledTables: DashboardData_dynamoData_last24Hours_mostThrottledTables[];
  mostExpensiveTables: DashboardData_dynamoData_last24Hours_mostExpensiveTables[];
}

export interface DashboardData_dynamoData_last30Days_mostReadTables_dataPoints {
  __typename: "MostReadTableDataPoint";
  consumedRead: number | null;
  provisionedRead: number | null;
  dateTime: string | null;
}

export interface DashboardData_dynamoData_last30Days_mostReadTables {
  __typename: "MostReadTableData";
  name: string;
  averageConsumedRead: number;
  billingMode: string;
  sizeBytes: number;
  items: number;
  consumedRead: number;
  provisionedRead: number;
  dataPoints: DashboardData_dynamoData_last30Days_mostReadTables_dataPoints[] | null;
}

export interface DashboardData_dynamoData_last30Days_mostWritesTables_dataPoints {
  __typename: "MostWritesTableDataPoint";
  consumedWrite: number | null;
  provisionedWrite: number | null;
  dateTime: string | null;
}

export interface DashboardData_dynamoData_last30Days_mostWritesTables {
  __typename: "MostWritesTableData";
  name: string | null;
  averageConsumedWrite: number | null;
  billingMode: string | null;
  sizeBytes: number | null;
  items: number | null;
  consumedWrite: number | null;
  provisionedWrite: number | null;
  dataPoints: DashboardData_dynamoData_last30Days_mostWritesTables_dataPoints[] | null;
}

export interface DashboardData_dynamoData_last30Days_mostThrottledTables_dataPoints {
  __typename: "MostThrottledTableDataPoint";
  throttledRequests: number | null;
  throttledWrites: number | null;
  throttledReads: number | null;
  dateTime: string | null;
}

export interface DashboardData_dynamoData_last30Days_mostThrottledTables {
  __typename: "MostThrottledTableData";
  name: string | null;
  billingMode: string | null;
  sizeBytes: number | null;
  items: number | null;
  throttledRequests: number | null;
  throttledWrites: number | null;
  throttledReads: number | null;
  dataPoints: DashboardData_dynamoData_last30Days_mostThrottledTables_dataPoints[] | null;
}

export interface DashboardData_dynamoData_last30Days_mostExpensiveTables_dataPoints {
  __typename: "MostExpensiveTableDataPoint";
  totalPrice: number | null;
  readPrice: number | null;
  writePrice: number | null;
  storagePrice: number | null;
  dateTime: string | null;
}

export interface DashboardData_dynamoData_last30Days_mostExpensiveTables {
  __typename: "MostExpensiveTableData";
  name: string;
  billingMode: string;
  totalPrice: number;
  readPrice: number;
  writePrice: number;
  storagePrice: number;
  dataPoints: DashboardData_dynamoData_last30Days_mostExpensiveTables_dataPoints[] | null;
}

export interface DashboardData_dynamoData_last30Days {
  __typename: "DashboardDynamoDataForPeriod";
  mostReadTables: DashboardData_dynamoData_last30Days_mostReadTables[];
  mostWritesTables: DashboardData_dynamoData_last30Days_mostWritesTables[];
  mostThrottledTables: DashboardData_dynamoData_last30Days_mostThrottledTables[];
  mostExpensiveTables: DashboardData_dynamoData_last30Days_mostExpensiveTables[];
}

export interface DashboardData_dynamoData {
  __typename: "DashboardDynamoData";
  processing: boolean;
  last24Hours: DashboardData_dynamoData_last24Hours | null;
  last30Days: DashboardData_dynamoData_last30Days | null;
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
  serviceCosts: DashboardData_costsData_costsPerService_serviceCosts[] | null;
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

export interface DashboardData {
  lambdasData: DashboardData_lambdasData | null;
  dynamoData: DashboardData_dynamoData | null;
  costsData: DashboardData_costsData | null;
}

export interface DashboardDataVariables {
  tenantId?: string | null;
}
