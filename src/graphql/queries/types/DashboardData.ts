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

export interface DashboardData_lambdasData_last24Hours_slowestLambdas_dataPoints {
  __typename: "SlowLambdaDataPoint";
  averageDuration: number | null;
  maxDuration: number | null;
  dateTime: string | null;
}

export interface DashboardData_lambdasData_last24Hours_slowestLambdas {
  __typename: "SlowLambdaData";
  lambdaName: string | null;
  runtime: string | null;
  size: number | null;
  codeSize: number | null;
  timeout: number | null;
  averageDuration: number | null;
  maxDuration: number | null;
  dataPoints: (DashboardData_lambdasData_last24Hours_slowestLambdas_dataPoints | null)[] | null;
}

export interface DashboardData_lambdasData_last24Hours_mostInvokedLambdas_dataPoints {
  __typename: "MostInvokedLambdaDataPoint";
  invocations: number | null;
  dateTime: string | null;
}

export interface DashboardData_lambdasData_last24Hours_mostInvokedLambdas {
  __typename: "MostInvokedLambdaData";
  lambdaName: string | null;
  invocations: number | null;
  runtime: string | null;
  size: number | null;
  codeSize: number | null;
  timeout: number | null;
  invocationsPerSecond: number | null;
  dataPoints: (DashboardData_lambdasData_last24Hours_mostInvokedLambdas_dataPoints | null)[] | null;
}

export interface DashboardData_lambdasData_last24Hours_mostErrorsLambdas_dataPoints {
  __typename: "MostErrorsLambdaDataPoint";
  errors: number | null;
  dateTime: string | null;
}

export interface DashboardData_lambdasData_last24Hours_mostErrorsLambdas {
  __typename: "MostErrorsLambdaData";
  lambdaName: string | null;
  errors: number | null;
  runtime: string | null;
  size: number | null;
  codeSize: number | null;
  errorRate: number | null;
  timeout: number | null;
  dataPoints: (DashboardData_lambdasData_last24Hours_mostErrorsLambdas_dataPoints | null)[] | null;
}

export interface DashboardData_lambdasData_last24Hours_mostExpensiveLambdas_dataPoints {
  __typename: "MostExpensiveLambdaDataPoint";
  cost: number | null;
  dateTime: string | null;
}

export interface DashboardData_lambdasData_last24Hours_mostExpensiveLambdas {
  __typename: "MostExpensiveLambdaData";
  lambdaName: string | null;
  runtime: string | null;
  size: number | null;
  codeSize: number | null;
  timeout: number | null;
  cost: number | null;
  dataPoints: (DashboardData_lambdasData_last24Hours_mostExpensiveLambdas_dataPoints | null)[] | null;
}

export interface DashboardData_lambdasData_last24Hours {
  __typename: "DashboardLambdaDataForPeriod";
  totals: DashboardData_lambdasData_last24Hours_totals | null;
  slowestLambdas: (DashboardData_lambdasData_last24Hours_slowestLambdas | null)[] | null;
  mostInvokedLambdas: (DashboardData_lambdasData_last24Hours_mostInvokedLambdas | null)[] | null;
  mostErrorsLambdas: (DashboardData_lambdasData_last24Hours_mostErrorsLambdas | null)[] | null;
  mostExpensiveLambdas: (DashboardData_lambdasData_last24Hours_mostExpensiveLambdas | null)[] | null;
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

export interface DashboardData_lambdasData_last30Days_slowestLambdas_dataPoints {
  __typename: "SlowLambdaDataPoint";
  averageDuration: number | null;
  maxDuration: number | null;
  dateTime: string | null;
}

export interface DashboardData_lambdasData_last30Days_slowestLambdas {
  __typename: "SlowLambdaData";
  lambdaName: string | null;
  runtime: string | null;
  size: number | null;
  codeSize: number | null;
  timeout: number | null;
  maxDuration: number | null;
  averageDuration: number | null;
  dataPoints: (DashboardData_lambdasData_last30Days_slowestLambdas_dataPoints | null)[] | null;
}

export interface DashboardData_lambdasData_last30Days_mostInvokedLambdas_dataPoints {
  __typename: "MostInvokedLambdaDataPoint";
  invocations: number | null;
  dateTime: string | null;
}

export interface DashboardData_lambdasData_last30Days_mostInvokedLambdas {
  __typename: "MostInvokedLambdaData";
  lambdaName: string | null;
  runtime: string | null;
  size: number | null;
  timeout: number | null;
  codeSize: number | null;
  invocations: number | null;
  invocationsPerSecond: number | null;
  dataPoints: (DashboardData_lambdasData_last30Days_mostInvokedLambdas_dataPoints | null)[] | null;
}

export interface DashboardData_lambdasData_last30Days_mostErrorsLambdas_dataPoints {
  __typename: "MostErrorsLambdaDataPoint";
  errors: number | null;
  dateTime: string | null;
}

export interface DashboardData_lambdasData_last30Days_mostErrorsLambdas {
  __typename: "MostErrorsLambdaData";
  lambdaName: string | null;
  runtime: string | null;
  size: number | null;
  timeout: number | null;
  codeSize: number | null;
  errors: number | null;
  errorRate: number | null;
  dataPoints: (DashboardData_lambdasData_last30Days_mostErrorsLambdas_dataPoints | null)[] | null;
}

export interface DashboardData_lambdasData_last30Days_mostExpensiveLambdas_dataPoints {
  __typename: "MostExpensiveLambdaDataPoint";
  cost: number | null;
  dateTime: string | null;
}

export interface DashboardData_lambdasData_last30Days_mostExpensiveLambdas {
  __typename: "MostExpensiveLambdaData";
  lambdaName: string | null;
  runtime: string | null;
  size: number | null;
  timeout: number | null;
  codeSize: number | null;
  cost: number | null;
  dataPoints: (DashboardData_lambdasData_last30Days_mostExpensiveLambdas_dataPoints | null)[] | null;
}

export interface DashboardData_lambdasData_last30Days {
  __typename: "DashboardLambdaDataForPeriod";
  totals: DashboardData_lambdasData_last30Days_totals | null;
  slowestLambdas: (DashboardData_lambdasData_last30Days_slowestLambdas | null)[] | null;
  mostInvokedLambdas: (DashboardData_lambdasData_last30Days_mostInvokedLambdas | null)[] | null;
  mostErrorsLambdas: (DashboardData_lambdasData_last30Days_mostErrorsLambdas | null)[] | null;
  mostExpensiveLambdas: (DashboardData_lambdasData_last30Days_mostExpensiveLambdas | null)[] | null;
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
  name: string | null;
  averageConsumedRead: number | null;
  consumedRead: number | null;
  provisionedRead: number | null;
  billingMode: string | null;
  sizeBytes: number | null;
  items: number | null;
  dataPoints: (DashboardData_dynamoData_last24Hours_mostReadTables_dataPoints | null)[] | null;
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
  dataPoints: (DashboardData_dynamoData_last24Hours_mostWritesTables_dataPoints | null)[] | null;
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
  dataPoints: (DashboardData_dynamoData_last24Hours_mostThrottledTables_dataPoints | null)[] | null;
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
  name: string | null;
  billingMode: string | null;
  sizeBytes: number | null;
  items: number | null;
  totalPrice: number | null;
  readPrice: number | null;
  writePrice: number | null;
  storagePrice: number | null;
  dataPoints: (DashboardData_dynamoData_last24Hours_mostExpensiveTables_dataPoints | null)[] | null;
}

export interface DashboardData_dynamoData_last24Hours {
  __typename: "DashboardDynamoDataForPeriod";
  mostReadTables: (DashboardData_dynamoData_last24Hours_mostReadTables | null)[] | null;
  mostWritesTables: (DashboardData_dynamoData_last24Hours_mostWritesTables | null)[] | null;
  mostThrottledTables: (DashboardData_dynamoData_last24Hours_mostThrottledTables | null)[] | null;
  mostExpensiveTables: (DashboardData_dynamoData_last24Hours_mostExpensiveTables | null)[] | null;
}

export interface DashboardData_dynamoData_last30Days_mostReadTables_dataPoints {
  __typename: "MostReadTableDataPoint";
  consumedRead: number | null;
  provisionedRead: number | null;
  dateTime: string | null;
}

export interface DashboardData_dynamoData_last30Days_mostReadTables {
  __typename: "MostReadTableData";
  name: string | null;
  averageConsumedRead: number | null;
  billingMode: string | null;
  sizeBytes: number | null;
  items: number | null;
  consumedRead: number | null;
  provisionedRead: number | null;
  dataPoints: (DashboardData_dynamoData_last30Days_mostReadTables_dataPoints | null)[] | null;
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
  dataPoints: (DashboardData_dynamoData_last30Days_mostWritesTables_dataPoints | null)[] | null;
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
  dataPoints: (DashboardData_dynamoData_last30Days_mostThrottledTables_dataPoints | null)[] | null;
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
  name: string | null;
  billingMode: string | null;
  totalPrice: number | null;
  readPrice: number | null;
  writePrice: number | null;
  storagePrice: number | null;
  dataPoints: (DashboardData_dynamoData_last30Days_mostExpensiveTables_dataPoints | null)[] | null;
}

export interface DashboardData_dynamoData_last30Days {
  __typename: "DashboardDynamoDataForPeriod";
  mostReadTables: (DashboardData_dynamoData_last30Days_mostReadTables | null)[] | null;
  mostWritesTables: (DashboardData_dynamoData_last30Days_mostWritesTables | null)[] | null;
  mostThrottledTables: (DashboardData_dynamoData_last30Days_mostThrottledTables | null)[] | null;
  mostExpensiveTables: (DashboardData_dynamoData_last30Days_mostExpensiveTables | null)[] | null;
}

export interface DashboardData_dynamoData {
  __typename: "DashboardDynamoData";
  processing: boolean | null;
  last24Hours: DashboardData_dynamoData_last24Hours | null;
  last30Days: DashboardData_dynamoData_last30Days | null;
}

export interface DashboardData {
  lambdasData: DashboardData_lambdasData | null;
  dynamoData: DashboardData_dynamoData | null;
}

export interface DashboardDataVariables {
  tenantId?: string | null;
}
