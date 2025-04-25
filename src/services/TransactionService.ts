import { ServiceFetcher } from './ServiceFetcher';
import { TransactionResponse, TransferRequest, TransferResponse } from '../types/transactions';

export class TransactionService {
  static async getTransactionHistory(
    accountId: number,
    page: number = 1,
  ): Promise<TransactionResponse> {
    return ServiceFetcher.get(`/transactions/history/${accountId}?page=${page}`);
  }

  static async transfer(data: TransferRequest): Promise<TransferResponse> {
    return ServiceFetcher.post('/transactions', data);
  }
}
