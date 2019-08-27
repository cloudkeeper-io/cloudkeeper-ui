/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Tenants
// ====================================================

export interface Tenants_tenants_owner {
  __typename: "OwnerData";
  id: string;
}

export interface Tenants_tenants_initialProcessing {
  __typename: "InitialProcessingData";
  done: boolean;
}

export interface Tenants_tenants {
  __typename: "Tenant";
  id: string;
  name: string;
  createdAt: string;
  isSetupCompleted: boolean;
  owner: Tenants_tenants_owner;
  initialProcessing: Tenants_tenants_initialProcessing;
}

export interface Tenants {
  tenants: Tenants_tenants[] | null;
}
