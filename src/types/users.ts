export interface UserDetails {
  id: number;
  name: string;
  accountNumbers: string[];
  isReferrer: boolean;
  isReferred: boolean;
  totalTransactionsToUser: number;
  totalCommissionsGenerated: number;
}

export interface ReferredContact {
  id: number;
  name: string;
  email: string;
  accountId: number;
  isReferrer: boolean;
  isReferred: boolean;
}

export interface FrequentContact {
  id: number;
  name: string;
  email: string;
  accountId: number;
  transactionCount: number;
}
