/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Cost
// ====================================================

export interface Cost_costsPerService_serviceCosts {
  __typename: "ServiceCostItem";
  date: string | null;
  serviceName: string | null;
  unblendedCost: number | null;
}

export interface Cost_costsPerService {
  __typename: "CostsPerServiceDataPoint";
  date: string | null;
  total: number | null;
  serviceCosts: Cost_costsPerService_serviceCosts[] | null;
}

export interface Cost_costsPerStack_stackCosts {
  __typename: "StackCostItem";
  date: string | null;
  stackName: string | null;
  unblendedCost: number | null;
}

export interface Cost_costsPerStack {
  __typename: "CostsPerStackDataPoint";
  date: string | null;
  total: number | null;
  stackCosts: Cost_costsPerStack_stackCosts[];
}

export interface Cost {
  __typename: "CostsData";
  costsPerService: Cost_costsPerService[] | null;
  costsPerStack: Cost_costsPerStack[] | null;
}
