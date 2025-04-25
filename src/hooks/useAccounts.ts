import { useEffect, useCallback } from 'react';
import { useAccountsStore } from '@/stores/accounts';
import { AccountService } from '@/services/AccountService';

export function useAccounts() {
  const { accounts, selectedAccount, isLoading, setAccounts, setSelectedAccount, setLoading } =
    useAccountsStore();

  const fetchAccounts = useCallback(
    async (forceUpdate: boolean = false) => {
      // Solo evitamos el fetch si ya tenemos cuentas y una cuenta seleccionada y no es una actualización forzada
      if (!forceUpdate && accounts.length > 0 && selectedAccount) return;

      try {
        setLoading(true);
        const fetchedAccounts = await AccountService.getAccounts();

        if (
          accounts.length === 0 ||
          forceUpdate ||
          JSON.stringify(accounts) !== JSON.stringify(fetchedAccounts)
        ) {
          setAccounts(fetchedAccounts);

          if (!selectedAccount && fetchedAccounts.length > 0) {
            setSelectedAccount(fetchedAccounts[0]);
          } else if (selectedAccount) {
            // Actualizar la cuenta seleccionada con los nuevos datos
            const updatedSelectedAccount = fetchedAccounts.find(
              (acc) => acc.id === selectedAccount.id,
            );
            if (updatedSelectedAccount) {
              setSelectedAccount(updatedSelectedAccount);
            }
          }
        }
      } catch (error) {
        console.error('Error al cargar las cuentas:', error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [accounts, selectedAccount, setAccounts, setSelectedAccount, setLoading],
  );

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  return {
    accounts,
    selectedAccount,
    isLoading,
    setSelectedAccount,
    refetch: () => fetchAccounts(true),
  };
}
