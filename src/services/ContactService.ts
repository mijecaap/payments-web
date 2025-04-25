import { ServiceFetcher } from './ServiceFetcher';
import { ReferredContact, FrequentContact } from '../types/users';

export class ContactService {
  static async getFrequentContacts(): Promise<FrequentContact[]> {
    return ServiceFetcher.get('/contacts/frequent');
  }

  static async getReferredContacts(): Promise<ReferredContact[]> {
    return ServiceFetcher.get('/contacts/referred');
  }
}
