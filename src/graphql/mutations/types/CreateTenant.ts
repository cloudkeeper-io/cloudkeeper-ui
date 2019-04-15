/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateTenant
// ====================================================

export interface CreateTenant_createTenant {
  __typename: "Tenant";
  id: string | null;
  name: string | null;
  createdAt: string | null;
  isSetupCompleted: boolean | null;
}

export interface CreateTenant {
  createTenant: CreateTenant_createTenant | null;
}

export interface CreateTenantVariables {
  name: string;
}
