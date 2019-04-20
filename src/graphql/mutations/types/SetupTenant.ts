/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SetupTenant
// ====================================================

export interface SetupTenant_setupTenant {
  __typename: "IntegrationData";
  functions: number | null;
  status: string | null;
}

export interface SetupTenant {
  setupTenant: SetupTenant_setupTenant | null;
}

export interface SetupTenantVariables {
  tenantId: string;
  roleArn: string;
}
