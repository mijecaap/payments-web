import { create } from 'zustand';
import type { Account } from '@/types/accounts';

interface AccountsState {
  accounts: Account[];
  selectedAccount: Account | null;
  isLoading: boolean;
  setAccounts: (accounts: Account[]) => void;
  setSelectedAccount: (account: Account | null) => void;
  setLoading: (isLoading: boolean) => void;
}

export const useAccountsStore = create<AccountsState>((set) => ({
  accounts: [],
  selectedAccount: null,
  isLoading: true,
  setAccounts: (accounts) => set({ accounts }),
  setSelectedAccount: (account) => set({ selectedAccount: account }),
  setLoading: (isLoading) => set({ isLoading }),
}));
