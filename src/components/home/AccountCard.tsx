'use client';
import { formatBalance } from '@/utils/format';
import { TransferForm } from './TransferForm';
import { AccountCardSkeleton } from './AccountCardSkeleton';
import { useAccountsStore } from '@/stores/accounts';

export function AccountCard({ refetch }: { refetch: () => void }) {
  const { selectedAccount, isLoading } = useAccountsStore();

  if (isLoading) {
    return <AccountCardSkeleton />;
  }

  if (!selectedAccount) {
    return (
      <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-md p-6">
        <p className="text-gray-500 dark:text-gray-400">Seleccione una cuenta...</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-md p-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 md:gap-0 mb-6">
        <div>
          <h3 className="text-base font-medium text-gray-600 dark:text-gray-400">
            Saldo Disponible
          </h3>
          <p className="mt-2 text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100">
            {formatBalance(selectedAccount.balance)}
          </p>
        </div>
        <div className="md:text-right">
          <h3 className="text-base font-medium text-gray-600 dark:text-gray-400">
            Número de cuenta
          </h3>
          <h2 className="mt-2 text-2xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
            {selectedAccount.accountNumber}
          </h2>
        </div>
      </div>

      {selectedAccount.referrerName && (
        <div className="mt-4 flex items-center gap-2 mb-6">
          <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Referencia:</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {selectedAccount.referrerName}
          </span>
        </div>
      )}

      <TransferForm refetchTransactions={refetch} />
    </div>
  );
}
