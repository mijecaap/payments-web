import { ServiceFetcher } from './ServiceFetcher';
import type { Account } from '@/types/accounts';

export class AccountService {
  static async getAccounts(): Promise<Account[]> {
    return ServiceFetcher.get<Account[]>('/accounts');
  }
}
