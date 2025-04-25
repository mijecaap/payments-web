import { useState, useEffect, useCallback } from 'react';
import { Commission } from '@/types/commissions';
import { CommissionService } from '@/services/CommissionService';
import { useAccountsStore } from '@/stores/accounts';

export function useCommissions() {
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [totalCommissions, setTotalCommissions] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const selectedAccount = useAccountsStore((state) => state.selectedAccount);

  const fetchCommissions = useCallback(async () => {
    if (!selectedAccount) return;
    try {
      setIsLoading(true);
      const response = await CommissionService.getCommissions(selectedAccount.id, 1);
      setCommissions(response.commissions);
      setTotalCommissions(response.totalCommissions);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error al cargar las comisiones'));
    } finally {
      setIsLoading(false);
    }
  }, [selectedAccount]);

  useEffect(() => {
    if (selectedAccount) {
      fetchCommissions();
    }
  }, [selectedAccount, fetchCommissions]);

  return {
    commissions,
    totalCommissions,
    isLoading,
    error,
    refetch: fetchCommissions,
  };
}
