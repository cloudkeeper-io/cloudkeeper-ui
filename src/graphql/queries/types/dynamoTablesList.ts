/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: dynamoTablesList
// ====================================================

export interface dynamoTablesList_dynamoTablesList {
  __typename: "DynamoTableListItem";
  name: string | null;
  items: number | null;
  sizeBytes: number | null;
  region: string | null;
  billingMode: string | null;
  consumedRead: number | null;
  consumedWrite: number | null;
  avgProvisionedRead: number | null;
  avgProvisionedWrite: number | null;
  throttledReads: number | null;
  throttledWrites: number | null;
  cost: number | null;
}

export interface dynamoTablesList {
  dynamoTablesList: (dynamoTablesList_dynamoTablesList | null)[] | null;
}

export interface dynamoTablesListVariables {
  tenantId: string;
  startDate?: string | null;
  endDate?: string | null;
}
