import { ServiceFetcher } from './ServiceFetcher';
import { UserDetails } from '../types/users';

export class UserService {
  static async getUserDetails(userId: number): Promise<UserDetails> {
    return ServiceFetcher.get(`/users/${userId}`);
  }
}
