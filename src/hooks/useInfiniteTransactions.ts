import { useState, useEffect, useCallback } from 'react';
import { Transaction } from '@/types/transactions';
import { TransactionService } from '@/services/TransactionService';
import { useAccountsStore } from '@/stores/accounts';

export function useInfiniteTransactions(page: number = 1) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Cambiado a true inicialmente
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const selectedAccount = useAccountsStore((state) => state.selectedAccount);

  const fetchTransactions = useCallback(
    async (pageNum: number = 1) => {
      if (!selectedAccount) {
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        const response = await TransactionService.getTransactionHistory(
          selectedAccount.id,
          pageNum,
        );
        setTransactions((prev) => {
          // Si es la primera página, reemplazar todo
          if (pageNum === 1) {
            return response.transactions;
          }
          // Si no, agregar al estado existente
          return [...prev, ...response.transactions];
        });

        setHasMore(response.totalPages > pageNum);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Error al cargar las transacciones'));
      } finally {
        setIsLoading(false);
      }
    },
    [selectedAccount],
  );

  // Efecto para la carga inicial y cambios de cuenta
  useEffect(() => {
    if (selectedAccount) {
      setTransactions([]); // Limpiar las transacciones al cambiar de cuenta
      fetchTransactions(1);
    }
  }, [selectedAccount, fetchTransactions]);

  // Efecto para la paginación
  useEffect(() => {
    if (page > 1 && selectedAccount) {
      fetchTransactions(page);
    }
  }, [page, selectedAccount, fetchTransactions]);

  return {
    transactions,
    isLoading,
    error,
    hasMore,
  };
}
