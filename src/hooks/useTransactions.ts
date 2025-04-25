import { useState, useEffect, useCallback } from 'react';
import { Transaction } from '@/types/transactions';
import { useAccountsStore } from '@/stores/accounts';
import { TransactionService } from '@/services/TransactionService';

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const selectedAccount = useAccountsStore((state) => state.selectedAccount);

  const fetchTransactions = useCallback(async () => {
    if (!selectedAccount) return;

    try {
      setIsLoading(true);
      const response = await TransactionService.getTransactionHistory(selectedAccount.id, 1);
      setTransactions(response.transactions);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error al cargar las transacciones'));
    } finally {
      setIsLoading(false);
    }
  }, [selectedAccount]);

  useEffect(() => {
    if (selectedAccount) {
      fetchTransactions();
    }
  }, [selectedAccount, fetchTransactions]);

  return {
    transactions,
    isLoading,
    error,
    refetch: fetchTransactions,
  };
}
