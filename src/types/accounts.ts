export interface Account {
  id: number;
  accountNumber: string;
  balance: string;
  referred_by: number;
  referrerName: string | null;
}
