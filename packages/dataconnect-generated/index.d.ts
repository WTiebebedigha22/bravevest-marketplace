import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AuditLog_Key {
  id: UUIDString;
  __typename?: 'AuditLog_Key';
}

export interface InvestmentSubscription_Key {
  investorId: UUIDString;
  opportunityId: UUIDString;
  __typename?: 'InvestmentSubscription_Key';
}

export interface KycDocument_Key {
  id: UUIDString;
  __typename?: 'KycDocument_Key';
}

export interface ListProductsData {
  opportunities: ({
    id: UUIDString;
    title: string;
    description: string;
    targetRaise: number;
    fundedAmount: number;
    unitPrice: number;
    totalUnits: number;
    minInvestment: number;
    maxInvestment?: number | null;
    tenureMonths: number;
    interestRate: number;
    projectedReturnPct: number;
    riskRating: string;
    status: string;
    fundingDeadline: TimestampString;
    maturityDate: TimestampString;
    createdAt: TimestampString;
    sponsor: {
      firebaseUid: string;
      firstName?: string | null;
      lastName?: string | null;
      businessName?: string | null;
    };
  } & Opportunity_Key)[];
}

export interface LoanApplication_Key {
  id: UUIDString;
  __typename?: 'LoanApplication_Key';
}

export interface OpportunityDocument_Key {
  id: UUIDString;
  __typename?: 'OpportunityDocument_Key';
}

export interface Opportunity_Key {
  id: UUIDString;
  __typename?: 'Opportunity_Key';
}

export interface Payout_Key {
  id: UUIDString;
  __typename?: 'Payout_Key';
}

export interface Repayment_Key {
  id: UUIDString;
  __typename?: 'Repayment_Key';
}

export interface Transaction_Key {
  id: UUIDString;
  __typename?: 'Transaction_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

export interface Wallet_Key {
  id: UUIDString;
  __typename?: 'Wallet_Key';
}

interface ListProductsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListProductsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListProductsData, undefined>;
  operationName: string;
}
export const listProductsRef: ListProductsRef;

export function listProducts(options?: ExecuteQueryOptions): QueryPromise<ListProductsData, undefined>;
export function listProducts(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListProductsData, undefined>;

