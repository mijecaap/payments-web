export interface Commission {
  id: number;
  amount: number;
  date: string;
  originUserName: string;
  originAccountNumber: string;
  transactionAmount: number;
}

export interface CommissionResponse {
  commissions: Commission[];
  totalCommissions: number;
  total: number;
  page: number;
  totalPages: number;
}
