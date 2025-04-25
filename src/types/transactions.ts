export interface Transaction {
  amount: number;
  commission: number;
  date: string;
  contactName: string;
}

export interface TransactionResponse {
  transactions: Transaction[];
  total: number;
  page: number;
  totalPages: number;
}

export interface TransferRequest {
  originAccountId: number;
  destinationAccountNumber: string;
  amount: number;
}

export interface TransferResponse {
  amount: number;
  commission: number;
  date: string;
  destinationName: string;
  destinationAccountNumber: string;
}
