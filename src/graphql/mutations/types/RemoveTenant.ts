/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemoveTenant
// ====================================================

export interface RemoveTenant_deleteTenant {
  __typename: "Tenant";
  id: string | null;
  name: string | null;
  isSetupCompleted: boolean | null;
}

export interface RemoveTenant {
  deleteTenant: RemoveTenant_deleteTenant | null;
}

export interface RemoveTenantVariables {
  id: string;
}
