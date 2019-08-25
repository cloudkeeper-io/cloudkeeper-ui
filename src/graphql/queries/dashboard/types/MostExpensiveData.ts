/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MostExpensiveData
// ====================================================

export interface MostExpensiveData_last24Hours_mostReadTables_dataPoints {
  __typename: "MostReadTableDataPoint";
  consumedRead: number | null;
  provisionedRead: number | null;
  dateTime: string | null;
}

export interface MostExpensiveData_last24Hours_mostReadTables {
  __typename: "MostReadTableData";
  name: string;
  averageConsumedRead: number;
  consumedRead: number;
  provisionedRead: number;
  billingMode: string;
  sizeBytes: number;
  items: number;
  dataPoints: MostExpensiveData_last24Hours_mostReadTables_dataPoints[] | null;
}

export interface MostExpensiveData_last24Hours_mostWritesTables_dataPoints {
  __typename: "MostWritesTableDataPoint";
  consumedWrite: number | null;
  provisionedWrite: number | null;
  dateTime: string | null;
}

export interface MostExpensiveData_last24Hours_mostWritesTables {
  __typename: "MostWritesTableData";
  name: string | null;
  averageConsumedWrite: number | null;
  consumedWrite: number | null;
  provisionedWrite: number | null;
  billingMode: string | null;
  sizeBytes: number | null;
  items: number | null;
  dataPoints: MostExpensiveData_last24Hours_mostWritesTables_dataPoints[] | null;
}

export interface MostExpensiveData_last24Hours_mostThrottledTables_dataPoints {
  __typename: "MostThrottledTableDataPoint";
  throttledRequests: number | null;
  throttledWrites: number | null;
  throttledReads: number | null;
  dateTime: string | null;
}

export interface MostExpensiveData_last24Hours_mostThrottledTables {
  __typename: "MostThrottledTableData";
  name: string | null;
  billingMode: string | null;
  sizeBytes: number | null;
  items: number | null;
  throttledRequests: number | null;
  throttledWrites: number | null;
  throttledReads: number | null;
  dataPoints: MostExpensiveData_last24Hours_mostThrottledTables_dataPoints[] | null;
}

export interface MostExpensiveData_last24Hours_mostExpensiveTables_dataPoints {
  __typename: "MostExpensiveTableDataPoint";
  totalPrice: number | null;
  readPrice: number | null;
  writePrice: number | null;
  storagePrice: number | null;
  dateTime: string | null;
}

export interface MostExpensiveData_last24Hours_mostExpensiveTables {
  __typename: "MostExpensiveTableData";
  name: string;
  billingMode: string;
  sizeBytes: number;
  items: number;
  totalPrice: number;
  readPrice: number;
  writePrice: number;
  storagePrice: number;
  dataPoints: MostExpensiveData_last24Hours_mostExpensiveTables_dataPoints[] | null;
}

export interface MostExpensiveData_last24Hours {
  __typename: "DashboardDynamoDataForPeriod";
  mostReadTables: MostExpensiveData_last24Hours_mostReadTables[];
  mostWritesTables: MostExpensiveData_last24Hours_mostWritesTables[];
  mostThrottledTables: MostExpensiveData_last24Hours_mostThrottledTables[];
  mostExpensiveTables: MostExpensiveData_last24Hours_mostExpensiveTables[];
}

export interface MostExpensiveData_last30Days_mostReadTables_dataPoints {
  __typename: "MostReadTableDataPoint";
  consumedRead: number | null;
  provisionedRead: number | null;
  dateTime: string | null;
}

export interface MostExpensiveData_last30Days_mostReadTables {
  __typename: "MostReadTableData";
  name: string;
  averageConsumedRead: number;
  billingMode: string;
  sizeBytes: number;
  items: number;
  consumedRead: number;
  provisionedRead: number;
  dataPoints: MostExpensiveData_last30Days_mostReadTables_dataPoints[] | null;
}

export interface MostExpensiveData_last30Days_mostWritesTables_dataPoints {
  __typename: "MostWritesTableDataPoint";
  consumedWrite: number | null;
  provisionedWrite: number | null;
  dateTime: string | null;
}

export interface MostExpensiveData_last30Days_mostWritesTables {
  __typename: "MostWritesTableData";
  name: string | null;
  averageConsumedWrite: number | null;
  billingMode: string | null;
  sizeBytes: number | null;
  items: number | null;
  consumedWrite: number | null;
  provisionedWrite: number | null;
  dataPoints: MostExpensiveData_last30Days_mostWritesTables_dataPoints[] | null;
}

export interface MostExpensiveData_last30Days_mostThrottledTables_dataPoints {
  __typename: "MostThrottledTableDataPoint";
  throttledRequests: number | null;
  throttledWrites: number | null;
  throttledReads: number | null;
  dateTime: string | null;
}

export interface MostExpensiveData_last30Days_mostThrottledTables {
  __typename: "MostThrottledTableData";
  name: string | null;
  billingMode: string | null;
  sizeBytes: number | null;
  items: number | null;
  throttledRequests: number | null;
  throttledWrites: number | null;
  throttledReads: number | null;
  dataPoints: MostExpensiveData_last30Days_mostThrottledTables_dataPoints[] | null;
}

export interface MostExpensiveData_last30Days_mostExpensiveTables_dataPoints {
  __typename: "MostExpensiveTableDataPoint";
  totalPrice: number | null;
  readPrice: number | null;
  writePrice: number | null;
  storagePrice: number | null;
  dateTime: string | null;
}

export interface MostExpensiveData_last30Days_mostExpensiveTables {
  __typename: "MostExpensiveTableData";
  name: string;
  billingMode: string;
  totalPrice: number;
  readPrice: number;
  writePrice: number;
  storagePrice: number;
  dataPoints: MostExpensiveData_last30Days_mostExpensiveTables_dataPoints[] | null;
}

export interface MostExpensiveData_last30Days {
  __typename: "DashboardDynamoDataForPeriod";
  mostReadTables: MostExpensiveData_last30Days_mostReadTables[];
  mostWritesTables: MostExpensiveData_last30Days_mostWritesTables[];
  mostThrottledTables: MostExpensiveData_last30Days_mostThrottledTables[];
  mostExpensiveTables: MostExpensiveData_last30Days_mostExpensiveTables[];
}

export interface MostExpensiveData {
  __typename: "DashboardDynamoData";
  processing: boolean;
  last24Hours: MostExpensiveData_last24Hours | null;
  last30Days: MostExpensiveData_last30Days | null;
}
