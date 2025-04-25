import { ServiceFetcher } from './ServiceFetcher';
import { CommissionResponse } from '../types/commissions';

export class CommissionService {
  static async getCommissions(accountId: number, page: number = 1): Promise<CommissionResponse> {
    return ServiceFetcher.get(`/commissions/${accountId}?page=${page}`);
  }
}
