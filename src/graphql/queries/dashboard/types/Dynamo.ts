/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Dynamo
// ====================================================

export interface Dynamo_last24Hours_mostReadTables_dataPoints {
  __typename: "MostReadTableDataPoint";
  consumedRead: number | null;
  provisionedRead: number | null;
  dateTime: string | null;
}

export interface Dynamo_last24Hours_mostReadTables {
  __typename: "MostReadTableData";
  name: string | null;
  averageConsumedRead: number | null;
  consumedRead: number | null;
  provisionedRead: number | null;
  billingMode: string | null;
  sizeBytes: number | null;
  items: number | null;
  dataPoints: Dynamo_last24Hours_mostReadTables_dataPoints[] | null;
}

export interface Dynamo_last24Hours_mostWritesTables_dataPoints {
  __typename: "MostWritesTableDataPoint";
  consumedWrite: number | null;
  provisionedWrite: number | null;
  dateTime: string | null;
}

export interface Dynamo_last24Hours_mostWritesTables {
  __typename: "MostWritesTableData";
  name: string | null;
  averageConsumedWrite: number | null;
  consumedWrite: number | null;
  provisionedWrite: number | null;
  billingMode: string | null;
  sizeBytes: number | null;
  items: number | null;
  dataPoints: Dynamo_last24Hours_mostWritesTables_dataPoints[] | null;
}

export interface Dynamo_last24Hours_mostThrottledTables_dataPoints {
  __typename: "MostThrottledTableDataPoint";
  throttledRequests: number | null;
  throttledWrites: number | null;
  throttledReads: number | null;
  dateTime: string | null;
}

export interface Dynamo_last24Hours_mostThrottledTables {
  __typename: "MostThrottledTableData";
  name: string | null;
  billingMode: string | null;
  sizeBytes: number | null;
  items: number | null;
  throttledRequests: number | null;
  throttledWrites: number | null;
  throttledReads: number | null;
  dataPoints: Dynamo_last24Hours_mostThrottledTables_dataPoints[] | null;
}

export interface Dynamo_last24Hours_mostExpensiveTables_dataPoints {
  __typename: "MostExpensiveTableDataPoint";
  totalPrice: number | null;
  readPrice: number | null;
  writePrice: number | null;
  storagePrice: number | null;
  dateTime: string | null;
}

export interface Dynamo_last24Hours_mostExpensiveTables {
  __typename: "MostExpensiveTableData";
  name: string | null;
  billingMode: string | null;
  sizeBytes: number | null;
  items: number | null;
  totalPrice: number | null;
  readPrice: number | null;
  writePrice: number | null;
  storagePrice: number | null;
  dataPoints: Dynamo_last24Hours_mostExpensiveTables_dataPoints[] | null;
}

export interface Dynamo_last24Hours {
  __typename: "DashboardDynamoDataForPeriod";
  mostReadTables: (Dynamo_last24Hours_mostReadTables | null)[] | null;
  mostWritesTables: (Dynamo_last24Hours_mostWritesTables | null)[] | null;
  mostThrottledTables: Dynamo_last24Hours_mostThrottledTables[] | null;
  mostExpensiveTables: Dynamo_last24Hours_mostExpensiveTables[] | null;
}

export interface Dynamo_last30Days_mostReadTables_dataPoints {
  __typename: "MostReadTableDataPoint";
  consumedRead: number | null;
  provisionedRead: number | null;
  dateTime: string | null;
}

export interface Dynamo_last30Days_mostReadTables {
  __typename: "MostReadTableData";
  name: string | null;
  averageConsumedRead: number | null;
  billingMode: string | null;
  sizeBytes: number | null;
  items: number | null;
  consumedRead: number | null;
  provisionedRead: number | null;
  dataPoints: Dynamo_last30Days_mostReadTables_dataPoints[] | null;
}

export interface Dynamo_last30Days_mostWritesTables_dataPoints {
  __typename: "MostWritesTableDataPoint";
  consumedWrite: number | null;
  provisionedWrite: number | null;
  dateTime: string | null;
}

export interface Dynamo_last30Days_mostWritesTables {
  __typename: "MostWritesTableData";
  name: string | null;
  averageConsumedWrite: number | null;
  billingMode: string | null;
  sizeBytes: number | null;
  items: number | null;
  consumedWrite: number | null;
  provisionedWrite: number | null;
  dataPoints: Dynamo_last30Days_mostWritesTables_dataPoints[] | null;
}

export interface Dynamo_last30Days_mostThrottledTables_dataPoints {
  __typename: "MostThrottledTableDataPoint";
  throttledRequests: number | null;
  throttledWrites: number | null;
  throttledReads: number | null;
  dateTime: string | null;
}

export interface Dynamo_last30Days_mostThrottledTables {
  __typename: "MostThrottledTableData";
  name: string | null;
  billingMode: string | null;
  sizeBytes: number | null;
  items: number | null;
  throttledRequests: number | null;
  throttledWrites: number | null;
  throttledReads: number | null;
  dataPoints: Dynamo_last30Days_mostThrottledTables_dataPoints[] | null;
}

export interface Dynamo_last30Days_mostExpensiveTables_dataPoints {
  __typename: "MostExpensiveTableDataPoint";
  totalPrice: number | null;
  readPrice: number | null;
  writePrice: number | null;
  storagePrice: number | null;
  dateTime: string | null;
}

export interface Dynamo_last30Days_mostExpensiveTables {
  __typename: "MostExpensiveTableData";
  name: string | null;
  billingMode: string | null;
  totalPrice: number | null;
  readPrice: number | null;
  writePrice: number | null;
  storagePrice: number | null;
  dataPoints: Dynamo_last30Days_mostExpensiveTables_dataPoints[] | null;
}

export interface Dynamo_last30Days {
  __typename: "DashboardDynamoDataForPeriod";
  mostReadTables: (Dynamo_last30Days_mostReadTables | null)[] | null;
  mostWritesTables: (Dynamo_last30Days_mostWritesTables | null)[] | null;
  mostThrottledTables: Dynamo_last30Days_mostThrottledTables[] | null;
  mostExpensiveTables: Dynamo_last30Days_mostExpensiveTables[] | null;
}

export interface Dynamo {
  __typename: "DashboardDynamoData";
  processing: boolean | null;
  last24Hours: Dynamo_last24Hours | null;
  last30Days: Dynamo_last30Days | null;
}
