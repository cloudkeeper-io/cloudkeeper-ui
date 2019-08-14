/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateTenant
// ====================================================

export interface CreateTenant_createTenant_owner {
  __typename: "OwnerData";
  id: string;
}

export interface CreateTenant_createTenant {
  __typename: "Tenant";
  id: string;
  name: string;
  createdAt: string;
  owner: CreateTenant_createTenant_owner;
  isSetupCompleted: boolean;
}

export interface CreateTenant {
  createTenant: CreateTenant_createTenant | null;
}

export interface CreateTenantVariables {
  name: string;
}
