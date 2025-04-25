'use client';
import { useAccounts } from '@/hooks/useAccounts';
import { formatBalance } from '@/utils/format';
import { MdSearch } from 'react-icons/md';

export function BalanceCard() {
  const { selectedAccount } = useAccounts();

  if (!selectedAccount) {
    return (
      <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-md p-6">
        <p className="text-gray-500 dark:text-gray-400">Seleccione una cuenta...</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-base font-medium text-gray-600 dark:text-gray-400">Saldo Disponible</h2>
        <p className="mt-2 text-4xl font-extrabold text-gray-900 dark:text-gray-100">
          {formatBalance(selectedAccount.balance)}
        </p>
        {selectedAccount.referrerName && (
          <div className="mt-4 flex items-center gap-2">
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Referencia:
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {selectedAccount.referrerName}
            </span>
          </div>
        )}
      </div>

      <div className="border-t dark:border-gray-700 pt-6">
        <h2 className="text-base font-medium text-gray-600 dark:text-gray-400 mb-4">
          Transferencia Rápida
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MdSearch className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Buscar destinatario"
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 focus:border-[#1E88E5]"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="S/ 0.00"
              className="block w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 focus:border-[#1E88E5]"
            />
          </div>
          <div>
            <button className="w-full bg-[#1E88E5] text-white h-10 rounded-lg text-sm font-medium hover:bg-[#1976D2] transition-colors focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900">
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
