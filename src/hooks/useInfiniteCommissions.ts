import { useState, useEffect, useCallback } from 'react';
import { Commission } from '@/types/commissions';
import { CommissionService } from '@/services/CommissionService';
import { useAccountsStore } from '@/stores/accounts';

export function useInfiniteCommissions(page: number = 1) {
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [totalCommissions, setTotalCommissions] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Cambiado a true inicialmente
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const selectedAccount = useAccountsStore((state) => state.selectedAccount);

  const fetchCommissions = useCallback(
    async (pageNum: number = 1) => {
      if (!selectedAccount) {
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        const response = await CommissionService.getCommissions(selectedAccount.id, pageNum);

        setCommissions((prev) => {
          // Si es la primera página, reemplazar todo
          if (pageNum === 1) {
            return response.commissions;
          }
          // Si no, agregar al estado existente
          return [...prev, ...response.commissions];
        });

        setTotalCommissions(response.totalCommissions);
        setHasMore(response.totalPages > pageNum);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Error al cargar las comisiones'));
      } finally {
        setIsLoading(false);
      }
    },
    [selectedAccount],
  );

  // Efecto para la carga inicial y cambios de cuenta
  useEffect(() => {
    if (selectedAccount) {
      setCommissions([]); // Limpiar las comisiones al cambiar de cuenta
      fetchCommissions(1);
    }
  }, [selectedAccount, fetchCommissions]);

  // Efecto para la paginación
  useEffect(() => {
    if (page > 1 && selectedAccount) {
      fetchCommissions(page);
    }
  }, [page, selectedAccount, fetchCommissions]);

  return {
    commissions,
    totalCommissions,
    isLoading,
    error,
    hasMore,
  };
}
