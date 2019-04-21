/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Tenants
// ====================================================

export interface Tenants_tenants {
  __typename: "Tenant";
  id: string;
  name: string;
  createdAt: string;
  isSetupCompleted: boolean;
}

export interface Tenants {
  tenants: Tenants_tenants[] | null;
}
